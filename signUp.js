class Model {
    constructor() {
        this.user = '';
        this.password = '';
        this.signUp = JSON.parse(localStorage.getItem("signUp")) || [];
       
    }

    saveToStorage(user) {
        localStorage.setItem('signUp', JSON.stringify(user));
    }

    addUser(email, password) {
        const user = {
            email: email,
            password: password
        }

        this.signUp.push(user);
        this.saveToStorage(this.signUp);
    }

}

class View {
    constructor() {
        this.form = this.getElement('.form-signup');
        this.firstName = this.getElement('.firstName');
        this.lastName = this.getElement('.lastName');
        this.email = this.getElement('.email');
        this.password = this.getElement('.password');
        this.passwordConfirm = this.getElement('.confirmPassword');
        this.eyeIcon = this.getElement('.eye');
        this.confirmEyeIcon = this.getElement('.confirm-eye');
        
        this.localListener();
        this.localListenerConfirm();
    }

    getElement(className) {
        const element = document.querySelector(className);
        return element;
    }

    get valueEmail() {
        return this.email.value;
    }
    get valuePassword() {
        return this.password.value;
    }

    localListener() {
        this.eyeIcon.addEventListener('click', (event) => {

            event.preventDefault();
            if (this.password.getAttribute('type') === 'password') {
                event.target.src = "./images/icon-eye-blocked.svg";
                this.password.setAttribute('type', 'text');
                return;
            }
            event.target.src = "./images/icon-eye.svg";
            this.password.setAttribute('type', 'password');
        })     
    }

    localListenerConfirm() {
        this.confirmEyeIcon.addEventListener('click', (event) => {

            event.preventDefault();
            if (this.passwordConfirm.getAttribute('type') === 'password') {
                event.target.src = "./images/icon-eye-blocked.svg";
                this.passwordConfirm.setAttribute('type', 'text');
                return;
            }
            event.target.src = "./images/icon-eye.svg";
            this.passwordConfirm.setAttribute('type', 'password');
        })
    }

    addNewUser(handler) {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (this.valueEmail && this.valuePassword) {
                handler(this.valueEmail, this.valuePassword);
                window.open('signIn/signIn.html', '_self');
                this.firstName.value = '';
                this.lastName.value = '';
                this.email.value = '';
                this.password.value = '';
                this.passwordConfirm.value = '';
            }
        })
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.addNewUser(this.handlerAddNewUser);
    }

    handlerAddNewUser = (email, password) => {
        this.model.addUser(email, password);
    }
}

const app = new Controller(new Model(), new View());
