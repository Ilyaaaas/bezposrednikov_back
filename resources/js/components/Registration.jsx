import React, {useState, useEffect} from 'react';
import {_POST} from "../constants";
import RegistrationSkeleton from "./RegistrationSkeleton";
import SocialAuth from './Screens/Others/SoacialAuth';

const Registration = () => {

    const [load, setLoad] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conf_password, setConf_password] = useState('');


    const [name_null, setName_null] = useState(false);
    const [email_null, setEmail_null] = useState(false);
    const [password_null, setPassword_null] = useState(false);
    const [conf_password_null, setConf_password_null] = useState(false);


    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            await _registry();
        }
    }

    const _registry = async () => {
        setLoad(true);
        await setName_null((name.trim() === ''));
        await setEmail_null((email.trim() === ''));
        await setPassword_null((password.trim() === ''));
        await setConf_password_null((conf_password.trim() === ''));

        if (!password_null)
            await setPassword_null((password.length < 8));

        if (!conf_password_null)
            await setConf_password_null((conf_password.length < 8));

        let res = (name_null || email_null || password_null || conf_password_null);
        if (res) return false;

        await _POST('users/register', {
            name: name,
            email: email,
            password: password,
            password_confirmation: conf_password
        }).then(res => {
            if (res !== null)
                window.location.href = '/login';
        })
        await setLoad(false);
    }

    return (
        (load) ? (
            <RegistrationSkeleton/>
        ) : (
            <div className={"row justify-content-center"}>
                <div className={"col-md-8"}>
                    <div className="card">
                        <div className="card-header">Регистрация</div>

                        <div className="card-body">
                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Ваше Имя</label>

                                <div className="col-md-6">
                                    <input type="text"
                                           className={(name_null) ? "form-control is-invalid" : "form-control"}
                                           onChange={(event) => {
                                               setName(event.target.value);
                                           }}
                                           value={name}
                                           onKeyPress={handleKeyPress}
                                           required
                                    />
                                    {name_null &&
                                    <div className="invalid-feedback">Данное поле обязательно для заполнения!</div>
                                    }
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Email или номер телефона
                                </label>

                                <div className="col-md-6">
                                    <input type="text"
                                           className={(email_null) ? "form-control is-invalid" : "form-control"}
                                           onChange={(event) => {
                                               setEmail(event.target.value);
                                           }}
                                           onKeyPress={handleKeyPress}
                                           value={email}
                                           required
                                    />
                                    {email_null &&
                                    <div className="invalid-feedback">Данное поле обязательно для заполнения!</div>
                                    }
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Пароль</label>

                                <div className="col-md-6">
                                    <input type="password"
                                           className={(password_null) ? "form-control is-invalid" : "form-control"}
                                           required
                                           onChange={(event) => {
                                               setPassword(event.target.value);
                                           }}
                                           onKeyPress={handleKeyPress}
                                           value={password}
                                           autoComplete="current-password"
                                    />
                                    {password_null &&
                                    <div className="invalid-feedback">Данное поле обязательно для заполнения! Длина
                                        пароля
                                        не менее 8 символов!</div>
                                    }
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Еще раз пароль</label>

                                <div className="col-md-6">
                                    <input type="password"
                                           className={(conf_password_null) ? "form-control is-invalid" : "form-control"}
                                           required
                                           onChange={(event) => {
                                               setConf_password(event.target.value);
                                           }}
                                           onKeyPress={handleKeyPress}
                                           value={conf_password}
                                           autoComplete="current-password"
                                    />
                                    {conf_password_null &&
                                    <div className="invalid-feedback">Данное поле обязательно для заполнения! Длина
                                        пароля
                                        не менее 8 символов!</div>
                                    }
                                </div>
                            </div>

                            <div className="form-group row mb-0">
                                <div className="col-md-6 offset-md-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                        onClick={_registry}
                                    >
                                        Войти
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )

    )
}

export default Registration;
