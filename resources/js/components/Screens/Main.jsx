import React, {useState, useEffect} from 'react';
import {Pagination, WidgetGrid, WidgetList} from "../Blocks/AdWidget";
import {_GET} from "../../constants";
import {Select} from "@vechaiui/react"
import MainSkeleton from "./MainSkeleton";
import {FaThList, FaTh} from 'react-icons/fa';
import {AdvRight} from "./Adv";
import {useHistory, useParams} from "react-router-dom";

const Main = () => {
    const { id } = useParams();

    const [screenGrid, setScreenGrid] = useState(true);
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);
    const [links, setLinks] = useState([]);

    const [dic_type_sale, setDic_type_sale] = useState([]);
    const [dic_type_home, setDic_type_home] = useState([]);
    const [dic_type_room, setDic_type_room] = useState([]);

    const [dic_city, setDic_city] = useState([]);

    const [sel_type_sale, setSel_type_sale] = useState(1);
    const [sel_type_home, setSel_type_home] = useState(1);
    const [sel_type_room, setSel_type_room] = useState(0);

    const [sel_city_name, setSel_city_name] = useState('');
    const [sel_city_id, setSel_city_id] = useState(0);

    const [sale_start, setSale_start] = useState('');
    const [sale_end, setSale_end] = useState('');
    const [filter, setFilter] = useState(false);
    const [sortId, setSortId] = useState(0);
    const [showFiltered, setShowFiltered] = useState(false);
    const [activeID, setActiveID] = useState(0);

    const setGrid = (value = false) => {
        localStorage.setItem('grid', value);
        setScreenGrid(value);
    }

    const sort = () => {
        let link = '';
        if(id !== undefined){
            link = '&page='+id;
        }
        switch (sortId) {
            case 1:
                return '?sortCol=date_set&sortDirect=desc'+link;
            case 2:
                return '?sortCol=price&sortDirect=asc'+link;
            case 3:
                return '?sortCol=price&sortDirect=desc'+link;
            default:
                return '?sortCol=id&sortDirect=desc'+link;
        }
    }

    const _start = async () => {
        let grid = localStorage.getItem('grid');
        setScreenGrid(grid);
        setFilter(false);
        setLoad(true);

        await _GET(sort()).then(res => {
            setData(res.list.data);
            setLinks(res.list.links);
            setDic_type_sale(res.dictionary.dic_type_sale);
            setDic_type_home(res.dictionary.dic_type_home);
            setDic_type_room(res.dictionary.dic_type_room);

            console.log(res.dictionary);

            let ct = [];
            res.dictionary.dic_city.map((reg) => {
                ct.push({
                    id: reg.id,
                    name: reg.name,
                    disabled: true
                });
                reg.child.map((city) => {
                    ct.push({
                        id: city.id,
                        name: city.name,
                        disabled: false
                    });
                })
            })
            setDic_city(ct);
        })
        setLoad(false);
    }

    const _sort = async (index) => {
        setSortId(index);
        if (filter) {
            await _filter()
        } else {
            await _start()
        }
    }

    const _filter = async () => {
        setLoad(true);
        let s = sort();
        let url = `${s}&type_sale=${sel_type_sale}&type_home=${sel_type_home}`;

        if (sel_type_room > 0)
            url = url + '&type_room=' + sel_type_room;
        if (sel_city_id > 0)
            url = url + '&city=' + sel_city_id;
        if (sale_start !== '')
            url = url + '&price_start=' + sale_start;
        if (sale_end !== '')
            url = url + '&price_end=' + sale_end;

        await _GET(url).then(res => {
            setData(res.list.data);
        })
        setFilter(true);
        setLoad(false);
    }

    const test = () => {
        if(id !== activeID) {
            setActiveID(id);
            _start();
        }
    }

    useEffect(() => {
        test();
    }, [id]);


    return (
        load ? (
            <MainSkeleton onGrid={screenGrid}/>
        ) : (
            <div className={"row"}>

                {/*<div className={"col-lg-12"}>*/}
                {/*    <Breadcramps list={[*/}
                {/*        {*/}
                {/*            name: "Фильтрация",*/}
                {/*            url: ""*/}
                {/*        }*/}
                {/*    ]}/>*/}
                {/*</div>*/}
                <div className={"col-lg-2"}>
                    <div className={"form-group btn_filter"}>
                        <span
                            className={"btn btn-primary btn-block"}
                            onClick={() => {
                                setShowFiltered(!showFiltered)
                            }}
                        >Фильтрация</span>
                    </div>
                    <div className={(showFiltered) ? "" : "filtered"}>
                        <div className="form-group">
                            <div className="dropdown">
                                <button className="btn  btn-outline-light btn-block dropdown-toggle"
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {(sel_city_name === '') ? "Весь Казахстан" : sel_city_name}
                                </button>
                                <div className="dropdown-menu dr_show" aria-labelledby="dropdownMenuButton">
                                    <a className={'dropdown-item'}
                                       onClick={() => {
                                           setSel_city_name('Весь Казахстан');
                                           setSel_city_id(0)
                                       }}
                                    >
                                        Весь Казахстан
                                    </a>
                                    {dic_city.map((value, i) => (
                                        <a className={(value.disabled) ? 'dropdown-item disabled' :
                                            (value.id === sel_city_id) ? 'dropdown-item active' : 'dropdown-item'
                                        }
                                           key={i}
                                           onClick={() => {
                                               setSel_city_name(value.name);
                                               setSel_city_id(value.id)
                                           }}
                                        >
                                            {value.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <Select className={"form-control"}
                                    name={"type_sale"}
                                    value={sel_type_sale}
                                    onChange={(event) => {
                                        setSel_type_sale(event.target.value)
                                    }}
                            >
                                {dic_type_sale.map((e, i) => (
                                    <option value={e.id} key={i}>{e.name}</option>
                                ))}
                            </Select>
                        </div>
                        <div className="form-group">
                            <Select className={"form-control"}
                                    name={"type_home"}
                                    value={sel_type_home}
                                    onChange={(event) => {
                                        setSel_type_home(event.target.value)
                                    }}
                            >
                                {dic_type_home.map((e, i) => (
                                    <option value={e.id} key={i}>{e.name}</option>
                                ))}
                            </Select>
                        </div>
                        <div className="form-group">
                            <Select className="form-control"
                                    name="type_room"
                                    value={sel_type_room}
                                    onChange={(event) => {
                                        setSel_type_room(event.target.value)
                                    }}
                            >
                                <option value={0}>Все</option>
                                {dic_type_room.map((e, i) => (
                                    <option value={e.id} key={i}>{e.name}</option>
                                ))}
                            </Select>
                        </div>

                        <div className="form-group">
                            <input type="number"
                                   className="form-control"
                                   value={sale_start}
                                   onChange={(event) => {
                                       setSale_start(event.target.value)
                                   }}
                                   placeholder="Стоимость от"/>
                        </div>
                        <div className="form-group">
                            <input type="number"
                                   className="form-control"
                                   value={sale_end}
                                   onChange={(event) => {
                                       setSale_end(event.target.value)
                                   }}
                                   placeholder="Стоимость до"/>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block" onClick={_filter}>
                                <i className={"fa fa-filter"}></i> Фильтр
                            </button>
                            {filter && (
                                <button className="btn btn-danger btn-block" onClick={_start}>Сбросить
                                    фильтрацию</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className={'col-lg-8'}>
                    <div className={"row"}>
                        <div className={"col-lg-12"}>
                            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                <div className="btn-group me-2 btn_type_list" role="group">
                                    <button type="button"
                                            className={(screenGrid) ? "btn btn-outline-dark btn-sm active" : "btn btn-outline-dark btn-sm"}
                                            onClick={() => {
                                                setGrid(true)
                                            }}
                                    ><FaTh/></button>
                                    <button type="button"
                                            className={(screenGrid) ? "btn btn-outline-dark btn-sm" : "btn btn-outline-dark btn-sm active"}
                                            onClick={() => {
                                                setGrid(false)
                                            }}
                                    ><FaThList/></button>
                                </div>

                                <div className="btn-group me-2" role="group">
                                    <Select className={"form-control"}
                                            onChange={(e) => {
                                                _sort(e.target.value)
                                            }}
                                            value={sortId}
                                    >
                                        <option value={0}>По умолчанию</option>
                                        <option value={1}>По дате</option>
                                        <option value={2}>Сначала дешевле</option>
                                        <option value={3}>Сначала дороже</option>
                                    </Select>
                                </div>
                            </div>
                            <hr/>
                        </div>
                        {data.map((e, i) => {
                            let img = '/images/noimage.jpg';
                            e.home_pics.map((imgs) => {
                                if (imgs.general === 1) {
                                    img = imgs.pic
                                }
                            })
                            return (
                                screenGrid ? (
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
                                ) : (
                                    <WidgetList id={e.id}
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
                            )
                        })}

                        <Pagination links={links}/>
                    </div>
                </div>
                <div className={"col-lg-2"}>
                    <AdvRight/>
                </div>
            </div>
        )
    )
}

export default Main;
