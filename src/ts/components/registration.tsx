import * as React from "react";
// import 'css!/../css/main.css';
export class RegistrationComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            passwd: "",
            register: false
        };

    }
    showEnter = (event) => {
        event.preventDefault();
        this.setState({ register: false });
    }
    showReg = (event) => {
        event.preventDefault();
        this.setState({ register: true });
    }
    onReg = (event) => {
        event.preventDefault();
        console.log("registation");
    }
    onEnter = (event) => {
        event.preventDefault();
        console.log("enter");
    }
    render() {
        return <div className="reg">

            <div className="reg__mode">
                <a className={this.state.register ? "reg__showEnter " : "reg__showEnter reg__activeMode"} onClick={this.showEnter}  >Вход</a>
                <a className={this.state.register ? "reg__showReg reg__activeMode" : "reg__showReg "} onClick={this.showReg}  >Регистрация</a>
            </div>

            {this.state.register ? <div className="reg__inf">
                <div className="inputs">
                    <label>Никнейм <input type="text" /></label>
                    <label>Логин <input type="text" /></label>
                    <label>Пароль <input type="password" /></label>
                    <label>Повторите пароль <input type="password" /></label>
                    <input type="button" className="inputs__btn" onClick={this.onReg} value="Зарегистрироваться" />
                </div>

            </div> : <div className="reg__inf">
                    <div className="inputs">
                        <label>Логин <input type="text" /></label>
                        <label>Пароль <input type="password" /></label>
                        <input type="button" className="inputs__btn" onClick={this.onEnter} value="Войти" />
                    </div>


                </div>}

        </div>
    }
}