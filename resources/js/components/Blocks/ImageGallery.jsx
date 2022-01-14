import React, {useState, useEffect, useCallback} from 'react';
import {FaAngleLeft, FaAngleRight, FaTimes} from 'react-icons/fa';

export function Carousel(props) {

    const [show, setShow] = useState(false);
    const [mainImage, setMainImage] = useState('');
    const [listImages, setListImages] = useState([]);
    const [activeKey, setActiveKey] = useState(0);

    const [activeKeyBg, setActiveKeyBg] = useState(0);
    const [bgImage, setBgImage] = useState('');

    const loadMainImage = useCallback(async () => {
        await setListImages(props.images);
        await setMainImage(props.images[0].pic);
    })

    const clickLeft = () => {
        let k = activeKey - 1;
        if (k < 0)
            k = listImages.length - 1;
        setMainImage(listImages[k].pic)
        setActiveKey(k);
    }

    const clickRight = () => {
        let k = activeKey + 1;
        if (k > listImages.length - 1)
            k = 0;
        setMainImage(listImages[k].pic)
        setActiveKey(k);
    }

    const clickLeftBg = () => {
        let k = activeKeyBg - 1;
        if (k < 0)
            k = listImages.length - 1;
        setBgImage(listImages[k].pic)
        setActiveKeyBg(k);
    }

    const clickRightBg = () => {
        let k = activeKeyBg + 1;
        if (k > listImages.length - 1)
            k = 0;
        setBgImage(listImages[k].pic)
        setActiveKeyBg(k);
    }

    useEffect(() => {
        loadMainImage();
    }, [])

    return (
        <div>
            <div className={"carousel"}>
                <div className={"carousel-main"}>
                    <div className={"carousel-main-img"}
                         style={{backgroundImage: `url("${mainImage}")`}}
                         onClick={() => {
                             setBgImage(mainImage);
                             setActiveKeyBg(activeKey);
                             setShow(true);
                         }}
                    ></div>
                    {listImages.length > 1 &&
                    <div>
                        <span className={"btn btn-outline-dark btn-sm carousel-btn carousel-btn-left"}
                              onClick={clickLeft}
                        ><FaAngleLeft/></span>
                        <span className={"btn btn-outline-dark btn-sm carousel-btn carousel-btn-right"}
                              onClick={clickRight}
                        ><FaAngleRight/></span>
                    </div>
                    }
                </div>
                <div className={"carouse-thumb"}>
                    {listImages.map((img, i) => (
                        <label className={(activeKey == i) ? "thumb-image active" : "thumb-image"}
                               key={i}
                               onClick={() => {
                                   setMainImage(img.pic);
                                   setActiveKey(i);
                               }}
                               style={{
                                   backgroundImage: `url("${img.pic}")`
                               }}
                        >
                        </label>
                    ))}
                </div>
            </div>

            <div className={(show) ? "carousel-big-image active" : "carousel-big-image"}>
                <div className={"carousel-big-image-center"}
                     style={{ backgroundImage: `url("${bgImage}")`}}
                     onClick={() => {
                         setShow(false);
                     }}
                >
                    <span className={"bgImage-btn-close"}>
                        <FaTimes />
                    </span>
                </div>
                {listImages.length > 1 &&
                <div>
                        <span className={"btn btn-light carousel-btn carousel-btn-left"}
                              onClick={clickLeftBg}
                        ><FaAngleLeft/></span>
                    <span className={"btn btn-light carousel-btn carousel-btn-right"}
                          onClick={clickRightBg}
                    ><FaAngleRight/></span>
                </div>
                }
            </div>
        </div>
    )
}

export function NoImageImage(){
    return (
        <div className={"carousel"}>
            <div className={"carousel-main"}>
                <div className={"carousel-main-img"}
                     style={{backgroundImage: `url("/images/noimage.jpg")`}}
                ></div>
            </div>
        </div>
    )
}
