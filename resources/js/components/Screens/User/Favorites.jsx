import React, {useEffect, useState} from 'react';
import {_GET} from "../../../constants";
import {Pagination, WidgetGrid, WidgetGridHome} from "../../Blocks/AdWidget";
import {AdvRight} from "../Adv";


function Favorites()
{
    const [load, setLoad] = useState(false);
    const [list, setList] = useState([]);

    const _start = async () => {
        await setLoad(true);
        await _GET('home/get_favorite').then(res => {
            if(res !== null)
                setList(res);
        })
        await setLoad(false);
    }

    useEffect(() => {
        _start()
    }, [])

    return (
        <>
            <div className={"row"}>
                <div className={"col-lg-9"}>
                    <div className={"row"}>
                        {list.map((e, i) => {
                            let img = '/images/noimage.jpg';
                            e.home_pics.map((imgs) => {
                                if (imgs.general === 1) {
                                    img = imgs.pic
                                }
                            })
                            return (
                                <WidgetGrid id={e.id}
                                            key={i}
                                            image={img}
                                            count_image={e.home_pics.length}
                                            type_sale={e.dic_type_sale.name}
                                            city_name={e.address}
                                            cnt_rooms={e.cnt_rooms}
                                            type_home_name={e.dic_type_home.name}
                                            total_area={e.total_area}
                                            floor={e.floor}
                                            date_set={e.date_set}
                                            price={e.price}
                                            count_view={e.cnt_view}
                                />
                            )
                        })}
                        {list.length <= 0 && (
                            <div>
                                <img src={"/images/backlogo.png"} style={{
                                    width: '100%',
                                    opacity: '0.1'
                                }}/>
                            </div>
                        )}
                    </div>
                </div>
                <div className={"col-lg-3"}>
                    <AdvRight/>
                </div>
            </div>
        </>
    )
}

export default Favorites;
