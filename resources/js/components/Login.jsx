import React from "react";
import {Link} from 'react-router-dom';
import {_POST, isLogined, setToken, setUser, google_id} from "../constants";
import LoginSkeleton from "./LoginSkeleton";
import SocialAuth from './Screens/Others/SoacialAuth';

class Login extends React.Component {
    state = {
        login: "",
        password: "",
        login_null: false,
        password_null: false,
        load: false,
    }

    constructor(props) {
        super(props);
    }

    _logined = async () => {
        await this.setState({
            login_null: false,
            password_null: false,
            load: true
        })
        let onexit = false;
        if (this.state.login.trim() === '') {
            this.setState({login_null: true})
            onexit = true;
        }

        if (this.state.password.trim() === '') {
            this.setState({password_null: true})
            onexit = true;
        }

        if (onexit) return false;

        await _POST('users/login', {
            email: this.state.login,
            password: this.state.password
        }).then(res => {
            if (res !== null) {
                setToken(res.token_type + ' ' + res.token);
                setUser(res.user);
            }
            if (isLogined()) {
                window.location.href = '/';
            }
        })
        await this.setState({load: false});
    }



    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this._logined();
        }
    }

    render() {
        return (
            (this.state.load) ? (
                <LoginSkeleton/>
            ) : (
                <div className={"row justify-content-center"}>
                    <div className={"col-md-8"}>
                        <div className="card">
                            <div className="card-header">Авторизация</div>

                            <div className="card-body">
                                <div className="form-group row">
                                    <label htmlFor="email"
                                           className="col-md-4 col-form-label text-md-right">Email или номер телефона</label>

                                    <div className="col-md-6">
                                        <input type="text"
                                               className={(this.state.login_null) ? "form-control is-invalid" : "form-control"}
                                               name="email"
                                               onChange={(event) => {
                                                   this.setState({login: event.target.value});
                                               }}
                                               value={this.state.login}
                                               onKeyPress={this.handleKeyPress}
                                               required
                                        />
                                        {this.state.login_null &&
                                        <div className="invalid-feedback">Данное поле обязательно для заполнения!</div>
                                        }
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password"
                                           className="col-md-4 col-form-label text-md-right">Пароль</label>

                                    <div className="col-md-6">
                                        <input type="password"
                                               className={(this.state.password_null) ? "form-control is-invalid" : "form-control"}
                                               name="password"
                                               required
                                               onChange={(event) => {
                                                   this.setState({password: event.target.value});
                                               }}
                                               value={this.state.password}
                                               autoComplete="current-password"
                                               onKeyPress={this.handleKeyPress}
                                        />
                                        {this.state.password_null &&
                                        <div className="invalid-feedback">Данное поле обязательно для заполнения!</div>
                                        }
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            onClick={this._logined}
                                        >
                                            Войти
                                        </button>
                                        <Link className="btn btn-link" to={"/password_reset"}>
                                            Забыли пароль?
                                        </Link>
                                        <hr />
                                        <Link className="btn btn-info btn-block" to={"/registration"}>
                                            Регистрация
                                        </Link>
                                    </div>
                                </div>

                            </div>

                            <div className={"card-footer"}>
                                <div className="form-group row">
                                    <label className="col-md-4 col-form-label text-md-right"></label>

                                    <div className="col-md-6">
                                        <SocialAuth />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    }
}

export default Login;
