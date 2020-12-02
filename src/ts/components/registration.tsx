import * as React from "react";
// import 'css!/../css/main.css';
export class RegistrationComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            nick: "",
            password: "",
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
        console.log("registation", this.state);
        fetch("/?action=test", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ a: 1, b: 'Textual content' })
        })
            .then((data) => data.json())
            .then((result) => {
                console.log("result from server", result)
            });
    }
    onEnter = (event) => {
        event.preventDefault();
        console.log("enter", this.state);
        fetch("/?action=test", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ a: 1, b: 'Textual content' })
        })
            .then((data) => data.json())
            .then((result) => {
                console.log("result from server", result)
            });
    }
    changeLogin = (event) => {
        this.setState({ login: event.target.value });
    }
    changePassword = (event) => {
        this.setState({ password: event.target.value });
    }
    changeNickName = (event) => {
        this.setState({ nick: event.target.value });
    }
    render() {
        return <div className="reg">

            <div className="reg__mode">
                <a className={this.state.register ? "reg__showEnter " : "reg__showEnter reg__activeMode"} onClick={this.showEnter}  >Вход</a>
                <a className={this.state.register ? "reg__showReg reg__activeMode" : "reg__showReg "} onClick={this.showReg}  >Регистрация</a>
            </div>

            {this.state.register ? <div className="reg__inf">
                <div className="inputs">
                    <label>Никнейм <input onChange={this.changeNickName} type="text" /></label>
                    <label>Логин <input onChange={this.changeLogin} type="text" /></label>
                    <label>Пароль <input onChange={this.changePassword} type="password" /></label>
                    <label>Повторите пароль <input type="password" /></label>
                    <input type="button" className="inputs__btn" onClick={this.onReg} value="Зарегистрироваться" />
                </div>

            </div> : <div className="reg__inf">
                    <div className="inputs">
                        <label>Логин <input onChange={this.changeLogin} type="text" /></label>
                        <label>Пароль <input onChange={this.changePassword} type="password" /></label>
                        <input type="button" className="inputs__btn" onClick={this.onEnter} value="Войти" />
                    </div>


                </div>}

        </div>
    }
}