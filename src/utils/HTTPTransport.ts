import queryStringify from "./queryStringify";

const METHODS = {
    get: 'GET',
    put: 'PUT',
    post: 'POST',
    delete: 'DELETE',
};

interface Options {
    method?: string,
    headers?: Record<string, string>,
    data?: any,
    timeout?: number,
    mode?: string,
    credentials?: string
}

type HTTPMethod = (url: string, options?: Options, timeout?: number) => Promise<XMLHttpRequest | Response>

export default class HTTPTransport {
    BASE_URL = "https://ya-praktikum.tech/api/v2";

    get: HTTPMethod = (url, options = {}) => {
        return this.request(this.BASE_URL + url, {...options, method: METHODS.get}, options.timeout);
    };
    put: HTTPMethod = (url, options = {}) => {
        return this.request(this.BASE_URL + url, {...options, method: METHODS.put}, options.timeout);
    };
    post: HTTPMethod = (url, options = {}): Promise<XMLHttpRequest | Response> => {
        return this.request(this.BASE_URL + url, {...options, method: METHODS.post}, options.timeout);
    };
    delete: HTTPMethod = (url, options = {}): Promise<XMLHttpRequest | Response> => {
        return this.request(this.BASE_URL + url, {...options, method: METHODS.delete}, options.timeout);
    };

    request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
        const {headers = {}, method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            if (method != null) {
                xhr.open(method, method === METHODS.get && !!data ? `${url}${queryStringify(data)}` : url);
            }

            xhr.timeout = timeout;
            Object.keys(headers).forEach(header => xhr.setRequestHeader(header, headers[header]))

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status <= 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.get || !data) {
                xhr.send();
            } else if (data instanceof FormData)  {
                xhr.send(data)
            } else {
                xhr.send(JSON.stringify(data));
            }

        });
    };
}
