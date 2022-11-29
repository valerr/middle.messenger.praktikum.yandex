export const validate = (type: string, value: string) => {
   const regex: Record<string, any> = {
       first_name: /^[A-ZА-Я][A-ZА-Яa-zа-я-]+$/,
       second_name: /^[A-ZА-Я][A-ZА-Яa-zа-я-]+$/,
       login: /^[a-zA-Z0-9_-]{3,20}$/,
       email: /^\S+@\S+\.\S+$/,
       password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
       phone: /^\+?[0-9]{10,15}$/,
       message: {
           test: (value: string) => value.trim().length > 0
       }
   }

    return value.match(regex[type])
}

export const errorMessages: Record<string, string> = {
    'first_name': 'Please enter a valid name',
    'second_name': 'Please enter a last name',
    'login':'Must contain 3-40 characters: no special characters',
    'email':'Please enter a valid email',
    'phone':'Invalid format',
    'password':'Must be 8-40 characters, contain at least 1 uppercase letter, 1 digit character',
};

export const validateInputElement = (inputName: string, targetElement: HTMLInputElement) => {
    const check = validate(inputName, targetElement.value);
    if (!check) {
        targetElement.nextElementSibling!.classList.add('show')
        targetElement.nextElementSibling!.textContent = errorMessages[inputName]
    } else {
        targetElement.nextElementSibling!.classList.remove('show')
    }
}