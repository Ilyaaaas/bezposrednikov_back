import {notify} from "./notify";

const MainUrl = '/api/';
const itemTokenName = 'token';
export const google_id = '527529150331-h8879uhgitv2c5siblenib79h9nm6ung.apps.googleusercontent.com';
export const facebook_id = '619196829232714';

export const searchUrlMap = async (country, city, address) => {
    let urlSearch = `https://nominatim.openstreetmap.org/search.php?street=${address}&city=${city}&country=${country}&polygon_geojson=1&format=jsonv2`;
    const res = await axios(urlSearch, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return res.data;
}

export const isLogined = () => {
    let token = getToken();
    return (token !== '');
}

export const setToken = (t) => {
    localStorage.setItem(itemTokenName, t);
    return true;
}

export const getToken = () => {
    let t = localStorage.getItem(itemTokenName);
    return (!t) ? '' : t;
}

export const unsetToken = () => {
    localStorage.removeItem(itemTokenName);
    return true;
}

export const setUser = (value) => {
    localStorage.setItem('user', JSON.stringify(value));
    return true;
}

export const getUser = () => {
    let user = localStorage.getItem('user');
    return JSON.parse(user);
}
/*
export const getUserValue = async (name) => {
    if(!isLogined())
        return null;

    let user = getUser();
    const objectArray = Object.entries(user);

    const res = objectArray.forEach(([key, value]) => {
        if(key === name) {
            console.log(key, value);
            return value;
        }
    });

    return res;
}
*/
export const unsetUser = () => {
    localStorage.removeItem('user');
    return true;
}

//--------------METHODS---------------------------
const _returned = (data) => {
    if(data.message !== ''){
        notify(data.message, data.success);
    }

    if(data.success === true){
        return ('result' in data) ? data.result : data;
    }
    return null;
}

const _getHeaders = () => {
    let h = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    if('' !== isLogined()){
        h = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    }

    return h;
}

export const _GET = async (url) => {
    const API_URL = MainUrl+url;

    const res = await axios(API_URL, {
        method: 'GET',
        headers: _getHeaders(),
    });

    return _returned(res.data);
}

export const _POST = async (url, arrays) => {
    const API_URL = MainUrl+url;

    const res = await axios(API_URL, {
        method: 'POST',
        data: arrays,
        headers: _getHeaders(),
    }).catch(e => {
        console.log(e);
    });

    return _returned(res.data);
}

export const _PUT = async (url, arrays) => {
    const API_URL = MainUrl+url;

    const res = await axios(API_URL, {
        method: 'PUT',
        data: arrays,
        headers: _getHeaders(),
    }).catch(e => {
        console.log(e);
    });

    return _returned(res.data);
}

export const _DELETE = async (url) => {
    const API_URL = MainUrl+url;

    const res = await axios(API_URL, {
        method: 'DELETE',
        headers: _getHeaders(),
    });

    return _returned(res.data);
}

//--------------END METHODS---------------------------

export const MoneyFormat = (value) => {
    let money = parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
    let m = money.split('.');
    return m[0] + ' тг.'
}

export const StringIsNull = (value) => {
    return (value === null) ? '' : value;
}
