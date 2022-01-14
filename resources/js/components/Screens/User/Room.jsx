import React, {useState, useEffect} from 'react';
import Breadcramps from "../../Blocks/Breadcramps";
import {Link} from 'react-router-dom';
import {_GET} from "../../../constants";
import {Pagination, WidgetGridHome} from "../../Blocks/AdWidget";
import {AdvRight} from "../Adv";
import RoomSkeleton from "./RoomSkeleton";

const Room = () => {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);
    const [links, setLinks] = useState([]);

    const _start = async () => {
        await setLoad(true);
        await _GET('home').then(res => {
            setData(res.data);
            setLinks(res.links);
        })
        await setLoad(false);
    }

    useEffect(() => {
        _start();
    }, [])

    return (
        (load) ? <RoomSkeleton/> :
            (<>
                    <div className={"row"}>
                        {/*<div className={"col-lg-12"}>*/}
                        {/*    <Breadcramps list={[*/}
                        {/*        {*/}
                        {/*            name: "Личный кабинет",*/}
                        {/*            url: ""*/}
                        {/*        },*/}
                        {/*        {*/}
                        {/*            name: "Список объявлений",*/}
                        {/*            url: ""*/}
                        {/*        }*/}
                        {/*    ]}/>*/}
                        {/*</div>*/}
                    </div>
                    <div className={"row"}>
                        <div className={"col-lg-2"}>
                            <Link to={"room_edit/0"} className={"btn btn-info btn-block"}>Добавить объявление</Link>
                        </div>
                        <div className={"col-lg-8"}>
                            <div className={"row"}>
                                {data.map((e, i) => {
                                    let img = '/images/noimage.jpg';
                                    e.home_pics.map((imgs) => {
                                        if (imgs.general === 1) {
                                            img = imgs.pic
                                        }
                                    })
                                    return (
                                        <WidgetGridHome id={e.id}
                                                        key={i}
                                                        image={img}
                                                        count_image={e.home_pics.length}
                                                        type_sale={e.dic_type_sale.name}
                                                        city_name={e.dic_city.name}
                                                        cnt_rooms={e.cnt_rooms}
                                                        type_home_name={e.dic_type_home.name}
                                                        total_area={e.total_area}
                                                        floor={e.floor}
                                                        date_set={e.date_set}
                                                        price={e.price}
                                        />
                                    )
                                })}
                                <Pagination links={links}/>

                                {data.length <= 0 && (
                                    <div>
                                        <img src={"/images/backlogo.png"} style={{
                                            width: '100%',
                                            opacity: '0.1'
                                        }}/>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={"col-lg-2"}>
                            <AdvRight/>
                        </div>
                    </div>
                </>
            )
    )
}

export default Room;
