class Model {
    constructor() {
        this.signUp = JSON.parse(localStorage.getItem("signUp")) || [];
      
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
        this.email = this.getElement('.email');
        this.password = this.getElement('.password');
        this.eyeIcon = this.getElement('.eye');
        
        this.localListener();
    }

    localListener() {
        this.eyeIcon.addEventListener('click', (event) => {

            event.preventDefault();
            if (this.password.getAttribute('type') === 'password') {
                event.target.src = "../images/icon-eye-blocked.svg";
                this.password.setAttribute('type', 'text');
                return;
            }
            event.target.src = "../images/icon-eye.svg";
            this.password.setAttribute('type', 'password');
        })     
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

    checkUser(user) {
        
        let name = '';
        let password = '';
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (this.valueEmail && this.valuePassword ) {
                
                outer: for (let i = 0; i < user.length; i++) {                    
                    name = user[i].email === this.valueEmail ? this.valueEmail : '';
                    password = user[i].password === this.valuePassword ? this.valuePassword : '';
                    if(name && password) {
                        break outer;
                    }
                }
                if (name && password) {
                    window.open('../dashboard/dashboard.html', '_self');
                } else {
                    alert('Incorrect email or password');
                    this.email.value = '';
                    this.password.value = '';
                }
                
            }
        })
    }


}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.handlerDisplayUser(this.model.signUp);        
    }

    handlerAddNewUser = (email, password) => {
        this.model.addUser(email, password);
    }

    handlerDisplayUser = (user) => { 
        this.view.checkUser(user);
    }
}

const app = new Controller(new Model(), new View());

