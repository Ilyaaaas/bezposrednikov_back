import React from 'react';
import {_POST, facebook_id, google_id, isLogined, setToken, setUser} from "../../../constants";
import {GoogleLogin} from "react-google-login";
import FacebookLogin from 'react-facebook-login';

class SoacialAuth extends React.Component {
    _onSuccessGoogleLogined = (res) => {
        _POST('users/auth_social', {
            "social_name": "google",
            "params" : res.profileObj
        }).then(data => {
            if (data !== null) {
                setToken(data.token_type + ' ' + data.token);
                setUser(data.user);
            }
            if (isLogined()) {
                window.location.href = '/';
            }
        })
    }
    _onFailedGoogleLogined = (res) => {
        console.log(res);
    }

    _onSuccessFacebookLogined = (res) => {
        console.log(res);
    }

    render() {
        return (
            <>
                <GoogleLogin
                    clientId={google_id}
                    buttonText={'Войти через Google'}
                    onSuccess={this._onSuccessGoogleLogined}
                    onFailure={this._onFailedGoogleLogined}
                    isSignedIn={false}
                    className={"btn btn-outline-primary btn-block"}
                />

                <FacebookLogin
                    appId={facebook_id}
                    autoLoad={false}
                    fields="name,email,picture"
                    scope="public_profile,user_friends"
                    callback={this._onSuccessFacebookLogined}
                    cssClass={"btn btn-primary btn-block mt-3"}
                    textButton={" Войти через Facebook"}
                    icon="fa-facebook"
                />
            </>
        )
    }
}

export default SoacialAuth;
