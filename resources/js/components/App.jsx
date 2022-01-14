import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import '../../css/app.css';

import Main from "./Screens/Main";
import Login from './Login';
import Header from "./Blocks/Header";
import Footer from "./Blocks/Footer";
import Page404 from "./Page404";
import Show from "./Screens/Show";
import Room from "./Screens/User/Room";
import Registration from "./Registration";
import {isLogined} from "../constants";
import RoomEdit from "./Screens/User/RoomEdit";
import Favorites from "./Screens/User/Favorites";
import Page from "./Screens/Page";


ReactDOM.render((
    <BrowserRouter>
        <Header />
        <div className={"container"} style={{ marginTop: '6em'}}>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route
                    path='/page/:id'
                    render={({ match }) => {
                        return (
                            <Page id={match.params.id} />
                        )
                    }}
                />
                <Route path='/show/:id' component={Show} />
                {isLogined() ? (
                    <>
                    <Route path='/room' component={Room} />
                    <Route path='/room_edit/:id' component={RoomEdit} />
                    <Route path='/favorites' component={Favorites} />
                    </>
                ): (
                    <>
                    <Route path='/login' component={Login} />
                    <Route path='/registration' component={Registration} />
                    </>
                )}
                <Route component={Page404} />
            </Switch>
        </div>
        <ToastContainer />
        <Footer />
    </BrowserRouter>
), document.getElementById('app'))
