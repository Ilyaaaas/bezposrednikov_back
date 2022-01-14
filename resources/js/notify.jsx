import {toast} from "react-toastify";

export const notify = (text, onsuccess = true) => {
    if(onsuccess){
        success(text)
    }else{
        warning(text)
    }
}

export const warning = (text) => {
    toast.error(text, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const success = (text) => {
    toast.success(text, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
