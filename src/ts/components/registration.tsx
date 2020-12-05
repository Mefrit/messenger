import * as React from "react";
// import 'css!/../css/main.css';
export class RegistrationComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            nick: "",
            password: "",
            register: false,
        };
    }
    showEnter = (event) => {
        event.preventDefault();
        this.setState({ register: false });
    };
    showReg = (event) => {
        event.preventDefault();
        this.setState({ register: true });
    };
    onReg = (event) => {
        event.preventDefault();
        console.log("registation", this.state);
        fetch("/?module=registration&action=Reg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                login: this.state.login,
                nick: this.state.nick,
                password: this.state.password,
            }),
        })
            .then((data) => data.json())
            .then((result) => {
                console.log("result from server", result);
                if (result.status == "ok") {
                    this.props.setEnter();
                } else {
                    alert(result.message);
                }
            });
    };
    onEnter = (event) => {
        event.preventDefault();
        console.log("enter", this.state);
        fetch("/?module=registration&action=Enter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ login: this.state.login, password: this.state.password }),
        })
            .then((data) => data.json())
            .then((result) => {
                console.log("result from server", result);
                if (result.status == "ok") {
                    this.props.setEnter();
                } else {
                    alert(result.message);
                }
            });
    };
    changeLogin = (event) => {
        this.setState({ login: event.target.value });
    };
    changePassword = (event) => {
        this.setState({ password: event.target.value });
    };
    changeNickName = (event) => {
        this.setState({ nick: event.target.value });
    };
    render() {
        return (
            <div className="reg">
                <div className="reg__mode">
                    <a
                        className={this.state.register ? "reg__showEnter " : "reg__showEnter reg__activeMode"}
                        onClick={this.showEnter}
                    >
                        Вход
                    </a>
                    <a
                        className={this.state.register ? "reg__showReg reg__activeMode" : "reg__showReg "}
                        onClick={this.showReg}
                    >
                        Регистрация
                    </a>
                </div>

                {this.state.register ? (
                    <div className="reg__inf">
                        <form className="inputs">
                            <label>
                                Никнейм <input onChange={this.changeNickName} type="text" />
                            </label>
                            <label>
                                Логин <input onChange={this.changeLogin} type="text" />
                            </label>
                            <label>
                                Пароль <input onChange={this.changePassword} type="password" />
                            </label>
                            <label>
                                Повторите пароль <input type="password" />
                            </label>
                            <input
                                type="button"
                                className="inputs__btn"
                                onClick={this.onReg}
                                value="Зарегистрироваться"
                            />
                        </form>
                    </div>
                ) : (
                    <div className="reg__inf">
                        <form className="inputs">
                            <label>
                                Логин <input onChange={this.changeLogin} type="text" />
                            </label>
                            <label>
                                Пароль <input onChange={this.changePassword} type="password" />
                            </label>
                            <input type="button" className="inputs__btn" onClick={this.onEnter} value="Войти" />
                        </form>
                    </div>
                )}
            </div>
        );
    }
}
