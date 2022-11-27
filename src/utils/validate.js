export const validate = (type, value) => {
   const regex = {
       first_name: /^[A-ZА-Я][A-ZА-Яa-zа-я-]+$/,
       second_name: /^[A-ZА-Я][A-ZА-Яa-zа-я-]+$/,
       login: /^[a-zA-Z0-9_-]{3,20}$/,
       email: /^\S+@\S+\.\S+$/,
       password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
       phone: /^\+?[0-9]{10,15}/,
       message: {
           test: (value) => value.trim().length > 0
       }
   }

    return value.match(regex[type])
}