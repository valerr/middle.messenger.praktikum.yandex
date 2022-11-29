const METHODS = {
    get: 'GET',
    put: 'PUT',
    post: 'POST',
    delete: 'DELETE',
};

function queryStringify(data: any) {
    const str = Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&')
    return `?${str}`
}

interface Options {
    method: string,
    headers: Record<string, string>,
    data: any,
    timeout: number,
}

export default class HTTPTransport {
    get = (url: string, options: Options): Promise<XMLHttpRequest | Response> => {
        return this.request(url, {...options, method: METHODS.get}, options.timeout);
    };
    put = (url: string, options: Options): Promise<XMLHttpRequest | Response> => {
        return this.request(url, {...options, method: METHODS.put}, options.timeout);
    };
    post = (url: string, options: Options): Promise<XMLHttpRequest | Response> => {
        return this.request(url, {...options, method: METHODS.post}, options.timeout);
    };
    delete = (url: string, options: Options): Promise<XMLHttpRequest | Response> => {
        return this.request(url, {...options, method: METHODS.delete}, options.timeout);
    };

    request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
        const {headers = {}, method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, method === METHODS.get && !!data ? `${url}${queryStringify(data)}` : url);
            xhr.timeout = timeout;
            Object.keys(headers).forEach(header => xhr.setRequestHeader(header, headers[header]))

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.get || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
