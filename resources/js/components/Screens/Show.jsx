import React, {useState, useEffect} from 'react';
import {Carousel, NoImageImage} from "../Blocks/ImageGallery";
import { Tabs, Tab } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import {_GET, _POST, getToken, isLogined, MoneyFormat} from "../../constants";
import ShowSkeleton from "./ShowSkeleton";
import Comments from "./Others/Comments";
import OSMap from "../Blocks/OSMap";

const Show = () => {
    const { id } = useParams();

    const [load, SetLoad] = useState(false);
    const [data, setData] = useState({});
    const [images, setImages] = useState([]);
    const [activeUser, setActiveUser] = useState(false);
    const [favorite, setFavorite] = useState(false);

    const _start = async () => {
        await SetLoad(true);
        await _GET(id).then( async (res) => {
            await setData(res);
            await setImages(res.images);
            await setFavorite(res.favorite);
        })

        setActiveUser(isLogined);
        await SetLoad(false);
    }

    useEffect(() => {
        _start();
    }, []);

    const lowerText = (text) => {
        return text?.toLowerCase();
    }

    const _clickFavorites = async () => {
        await _POST('home/set_favorite', {"id_home": id}).then(res => {
            if(res !== null){
                setFavorite(res.favorite);
            }
        })
    }

    return (
        load ? (
            <ShowSkeleton />
        ) : (
            <div className={"row"}>
                <div className={"col-lg-12 row"}>
                    <div className={"col-lg-6"}>
                        <h2>{data.type_sale_name} {data.cnt_rooms}-ком. {lowerText(data.type_home_name) } </h2>
                    </div>
                    <div className={"col-lg-6"} style={{textAlign: 'right'}}>
                        <h4>{ MoneyFormat(data.price) }</h4>
                        {(activeUser) &&
                            <div className={"text-right"}>
                                <span className={"btn btn-default"} onClick={_clickFavorites}>
                                    <i className={(favorite) ? 'fas fa-heart' : 'far fa-heart'}></i> Избранное
                                </span>
                            </div>
                        }
                    </div>
                    <hr />
                </div>
                <div className={"col-lg-6"}>
                    {images.length > 0 ? (
                        <Carousel images={images} />
                        ):(
                        <NoImageImage />
                    )}
                </div>
                <div className={"col-lg-6"}>
                    <table className="table table-borderless">
                        <tbody>
                        <tr>
                            <td><b>Город</b></td>
                            <td>{data.city_name}</td>
                        </tr>
                        <tr>
                            <td><b>Адрес, район</b></td>
                            <td>{data.address}</td>
                        </tr>
                        <tr>
                            <td><b>Состояние</b></td>
                            <td>{data.condit_name}</td>
                        </tr>

                        <tr>
                            <td><b>Кол-во комнат</b></td>
                            <td>{data.cnt_rooms}</td>
                        </tr>

                        <tr>
                            <td><b>Этаж</b></td>
                            <td>{data.floor} из {data.floor_all}</td>
                        </tr>

                        <tr>
                            <td><b>Год постройки</b></td>
                            <td>{data.year_construction}</td>
                        </tr>

                        <tr>
                            <td><b>Площадь</b></td>
                            <td>
                                Общая: {data.total_area}<sup>м<small>2</small></sup><br />
                                Жилая: {data.living_area}<sup>м<small>2</small></sup><br />
                                Кухня: {data.kitchen_area}<sup>м<small>2</small></sup><br />
                            </td>
                        </tr>

                        <tr>
                            <td><b>Санузел</b></td>
                            <td>
                                Кол-во: {data.cnt_toilet} <br />
                                Тип: {(data.toilet_from_bathroom == 1) ? "Совмещенный" : "Раздельный"}
                            </td>
                        </tr>
                        <tr>
                            <td><b>Телефон</b></td>
                            <td>
                                <a href={"tel:"+data.phone}>{data.phone}</a>
                                {data.phone2}
                                {data.phone3}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className={"col-lg-12"}>
                    <Tabs defaultActiveKey={(data.other_comment !== null) ? "descript" : "comments"}
                          id="uncontrolled-tab-example"
                          className="mb-3"
                    >
                        {(data.other_comment !== null) &&
                            <Tab eventKey="descript" title="Описание">
                                {data.other_comment}
                            </Tab>
                        }
                        <Tab eventKey="comments" title="Комментарии">
                            <Comments id_home={id} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    )
}

export default Show;
