import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {_GET, getUser, google_id, isLogined, unsetToken, unsetUser} from "../../constants";
import { useGoogleLogout } from "react-google-login";
import 'jquery';
import '../../custom';

const Header = () => {
    const logined = isLogined();
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(0);
    const [onSocial, setOnSocial] = useState(false);

    const { signOut } = useGoogleLogout({
        google_id
    });

    const _exitUser = async () => {
        if(!logined)
            return false;

        if(onSocial) signOut();
        unsetToken();
        unsetUser();
        _GET('user/logout').then(res => {
            window.location.href = '/';
        })
    }

    const _start = async () => {
        if(logined){
            let user = await getUser();
            setUsername(user.name);
            setUserId(user.id);
            setOnSocial((parseInt(user.onsocial) === 1));
        }
    }

    useEffect(() => {
        _start();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <Link to={'/'} className="navbar-brand">
                    <img src={"/images/logo.png"} width={"45px"}/>
                    Без посредников
                </Link>
                <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={"navbar-collapse collapse"} id="navbarResponsive">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Главная</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/news">Новости</Link>
                        </li>
                        {(logined) && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/favorites">Избранные</Link>
                            </li>
                        )}
                    </ul>
                    <ul className={"navbar-nav ms-md-auto"}>
                        {(logined) ? (
                            <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {username}
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to={"/room"}>Личный кабинет</Link>
                                        <div className="dropdown-divider"></div>
                                        <span className="dropdown-item" onClick={_exitUser}>Выход</span>
                                    </div>
                                </li>
                            </>
                        ): (
                            <>
                                <li className={"nav-item"}>
                                    <Link to={"/login"} className={"nav-link"}>Авторизация</Link>
                                </li>
                                <li className={"nav-item"}>
                                    <Link to={"/registration"} className={"nav-link"}>Регистрация</Link>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    )
}


export default Header;
