import React, {useState, useEffect, useCallback} from 'react';
import {Select} from "@vechaiui/react";
import {AdvRight} from "../Adv";
import {FaTrash} from 'react-icons/fa';
import {useParams} from "react-router-dom";
import {_GET, _POST, _PUT, getUser, searchUrlMap, StringIsNull} from "../../../constants";
import RoomEditSkeleton from "./RoomEditSkeleton";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const RoomEdit = () => {
    const {id} = useParams();
    const fileRef = React.createRef()

    const [load, setLoad] = useState(false);
    const [typeSale, setTypeSale] = useState(1);
    const [typeHome, setTypeHome] = useState(1);
    const [cntRooms, setCntRooms] = useState(1);
    const [price, setPrice] = useState(0);
    const [city, setCity] = useState(1);
    const [cityName, setCityName] = useState('');
    const [rc, setRc] = useState(1);
    const [nameRc, setNameRc] = useState('');
    const [district, setDistrict] = useState(0);
    const [address, setAddress] = useState('');
    const [cntLoggia, setCntLoggia] = useState(0);
    const [cntBalkon, setCntBalkon] = useState(0);
    const [cntToilet, setCntToilet] = useState(0);
    const [toiletFromBathroom, setToiletFromBathroom] = useState(false);
    const [totalArea, setTotalArea] = useState(0);
    const [livingArea, setLivingArea] = useState(0);
    const [kitchenArea, setKitchenArea] = useState(0);
    const [yearConstruction, setYearConstruction] = useState(1980);
    const [floor, setFloor] = useState(1);
    const [floorAll, setFloorAll] = useState(1);
    const [condit, setCondit] = useState(1);
    const [comment, setComment] = useState('');
    const [phone, setPhone] = useState('');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');
    const [images, setImages] = useState([]);

    const [dicTypeSale, setDicTypeSale] = useState([]);
    const [dicTypeHome, setDicTypeHome] = useState([]);
    const [dicCity, setDicCity] = useState([]);
    const [dicCondit, setDicCondit] = useState([]);
    const [dicRc, setDicRc] = useState([]);
    const [mainDicRc, setMainDicRc] = useState([]);
    const [dicDistrict, setDicDistrict] = useState([]);
    const [showHideMap, setShowHideMap] = useState(true);
    const [position, setPosition] = useState([51.128207, 71.430411])
    const [listSearch, setListSearch] = useState([]);
    const [map, setMap] = useState(null)

    const triggerClick = () => {
        fileRef.current.click()
    }

    const loadImage = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        let onmain = (images.length === 0);
        axios.post('/api/home/upload_image', formData).then(async (res) => {
            if (res.data.success === true) {
                setImages([...images, {
                    pic: res.data.result.image,
                    general: onmain,
                }])
            }
        })
    }

    const removeImage = async (index) => {
        let list = [];
        await images.map((e, i) => {
            if (i !== index) {
                list.push(e);
            }
        })
        await setImages(list);
    }

    const setMain = async (index) => {
        let list = []
        await images.map(async (e, i) => {
            list.push({
                pic: e.pic,
                general: (index === i)
            })
        })
        await setImages(list);
    }

    const _start = async () => {
        setLoad(true)
        let url = 'home/create';
        if (id > 0) {
            url = 'home/' + id + '/edit';
        }

        await _GET(url).then(data => {
            let res = data.dictionary;
            setDicTypeSale(res.dic_type_sale);
            setDicTypeHome(res.dic_type_home);
            setDicCondit(res.dic_condit);

            let ct = [];

            res.dic_city.map((reg) => {
                ct.push({
                    id: reg.id,
                    name: reg.name,
                    disabled: true
                });
                reg.child.map((city_map) => {
                    ct.push({
                        id: city_map.id,
                        name: city_map.name,
                        disabled: false
                    });
                    if (city_map.id === city) {
                        setCityName(city_map.name);
                    }
                })
            })
            setDicCity(ct);

            if (parseInt(id) > 0) {
                let home = data.home;
                setAddress(StringIsNull(home.address));
                setCntBalkon(home.cnt_balkony);
                setCntLoggia(home.cnt_loggia);
                setCntRooms(home.cnt_rooms);
                setCntToilet(home.cnt_toilet);
                setFloor(home.floor);
                setFloorAll(home.floor_all);
                setCity(home.id_city);
                setCondit(home.id_condit);
                setTypeHome(home.id_type_home);
                setTypeSale(home.id_type_sale);
                setKitchenArea(home.kitchen_area)
                setLivingArea(home.living_area);
                setComment(StringIsNull(home.other_comment));
                setPhone(StringIsNull(home.phone));
                setPhone2(StringIsNull(home.phone2));
                setPhone3(StringIsNull(home.phone3));
                setPrice(home.price);
                setToiletFromBathroom(home.toilet_from_bathroom === 1)
                setTotalArea(home.total_area);
                setYearConstruction(home.year_construction);

                setCityName(home.dic_city.name);
                setImages(home.home_pics);
                // home.home_pics.map((e) => {
                //     setImages([...images, {
                //         url: e.pic,
                //         main: (parseInt(e.general) === 1)
                //     }]);
                // })

            } else {
                let user = getUser();
                setPhone(user.phone)
            }
        })

        await _getRc();
        await _getDistrict();
        setLoad(false)
    }

    const _city = async (id, name) => {
        if (id !== city) {
            await setCityName(name);
            await setCity(id);
            await _getRc();
            await _getDistrict();
        }
    }

    const _getRc = async () => {
        await _GET('dic/rc/' + city).then(res => {
            if (res !== null) {
                setDicRc(res);
                setMainDicRc(res);
            }
        })
    }

    const _getDistrict = async () => {
        await _GET('dic/district/' + city).then(res => {
            if (res !== null) {
                setDicDistrict(res);
            }
        })
    }

    const _searchRc = (value) => {
        let rcName = value.toLowerCase();
        let res = mainDicRc.filter(v => {
            return v.name.toLowerCase().match(new RegExp(rcName, 'g'))
        })
        setDicRc(res);
    }

    const _save = async () => {
        let body = {
            "id_type_sale": typeSale,
            "id_type_home": typeHome,
            "id_city": city,
            "address": address,
            "cnt_rooms": cntRooms,
            "cnt_loggia": cntLoggia,
            "cnt_balkony": cntBalkon,
            "cnt_toilet": cntToilet,
            "toilet_from_bathroom": (toiletFromBathroom) ? 1 : 0,
            "total_area": totalArea,
            "living_area": livingArea,
            "kitchen_area": kitchenArea,
            "year_construction": yearConstruction,
            "floor": floor,
            "floor_all": floorAll,
            "id_condit": condit,
            "other_comment": comment,
            "phone": phone,
            "phone2": phone2,
            "phone3": phone3,
            "price": price,
            "images": images,
            "id_rc": rc,
            "district": district
        };

        if (parseInt(id) === 0) {
            await _POST('home', body).then(res => {
                if (res !== null) {
                    window.location.href = '/room';
                }
            })
        } else {
            await _PUT('home/' + id, body).then(res => {
                if (res !== null) {
                    window.location.href = '/room';
                }
            })
        }

    }

    const showModal = () => {
        setShowHideMap(!showHideMap);
    }

    const onCenter = useCallback(() => {
        map.setView(position, 13)
    }, [map])

    const findGPS = () => {
        if(address === '') {
            navigator.geolocation.getCurrentPosition(function(position) {
                let ps = [position.coords.latitude, position.coords.longitude];
                setPosition(ps);

                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
            });

        }else {
            searchUrlMap('Казахстан', cityName, address).then(res => {
                const newArray = res.filter(item => item.category === "building")
                if(res.length > 0) {
                    let data = res[0];
                    let ps = [data.lat, data.lon];
                    setPosition(ps);
                }
                setListSearch(newArray);
            })
        }
        onCenter();
    }

    const _setAddressGPS = (_address, _lat, _lon) => {
        //10, проспект Абылай Хана, район "Алматы", Нур-Султан, 010000, Казахстан
        let new_addr = _address.replaceAll('Казахстан', null);
        setAddress(new_addr)
        let ps = [_lat, _lon];
        setPosition(ps);
    }

    const refreshMap = () => {
        //https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png
        if(mapUrl === 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png') {
            setMapUrl('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png');
        }else{
            setMapUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        }
    }

    useEffect(() => {
        _start();
    }, [])


    return (
        (load) ? (
            <RoomEditSkeleton/>
        ) : (
            <>
                <div className="row">
                    <div className="col-lg-10">
                        <div className="card">
                            <div className="card-header">
                                <h4>{(parseInt(id) === 0) ? "Новое объявление" : "Редактирование объявления"}</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <label>Объявление</label>

                                        <Select className={"form-control"}
                                                name={"type_sale"}
                                                value={typeSale}
                                                onChange={(event) => {
                                                    setTypeSale(event.target.value)
                                                }}
                                        >
                                            {dicTypeSale.map((e, i) => (
                                                <option value={e.id} key={i}>{e.name}</option>
                                            ))}
                                        </Select>
                                    </div>

                                    <div className="col-lg-3">
                                        <label>Недвижимость</label>
                                        <Select className={"form-control"}
                                                name={"type_home"}
                                                value={typeHome}
                                                onChange={(event) => {
                                                    setTypeHome(event.target.value)
                                                }}
                                        >
                                            {dicTypeHome.map((e, i) => (
                                                <option value={e.id} key={i}>{e.name}</option>
                                            ))}
                                        </Select>
                                    </div>

                                    <div className="col-lg-3">
                                        <label>Кол-во комнат</label>
                                        <input type="number"
                                               name="cnt_rooms"
                                               className="form-control"
                                               required
                                               onChange={(event) => {
                                                   setCntRooms(parseInt(event.target.value))
                                               }}
                                               value={cntRooms}
                                        />
                                    </div>

                                    <div className="col-lg-3">
                                        <label>Сумма/Цена</label>

                                        <div className="input-group mb-3">
                                            <input type="number"
                                                   name="price"
                                                   className="form-control"
                                                   placeholder="0"
                                                   onChange={(event) => {
                                                       setPrice(parseFloat(event.target.value))
                                                   }}
                                                   value={price}
                                                   required/>
                                            <div className="input-group-append">
                                                <span className="input-group-text">тг</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr/>

                                <div className="row">
                                    <div className="col-lg-3">
                                        <label>Город</label>
                                        <div className="dropdown">
                                            <button className="btn  btn-outline-light btn-block dropdown-toggle"
                                                    id="dropdownMenuButton"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {(cityName === '') ? "Выберите город" : cityName}
                                            </button>
                                            <div className="dropdown-menu dr_show" aria-labelledby="dropdownMenuButton">
                                                {dicCity.map((value, i) => (
                                                    <a className={(value.disabled) ? 'dropdown-item disabled' :
                                                        (value.id === city) ? 'dropdown-item active' : 'dropdown-item'
                                                    }
                                                       key={i}
                                                       onClick={async () => {
                                                           await _city(value.id, value.name)
                                                       }}
                                                    >
                                                        {value.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3">
                                        <label>Жилой комплекс</label>
                                        <div className="dropdown">
                                            <button className="btn  btn-outline-light btn-block dropdown-toggle"
                                                    id="dropdownMenuButton"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {(nameRc === '') ? "Жилой комплекс" : nameRc}
                                            </button>
                                            <div className="dropdown-menu dr_show" aria-labelledby="dropdownMenuButton">
                                                <div className={"dropdown-item"}>
                                                    <input type={"text"}
                                                           className={"form-control"}
                                                           placeholder={"Поиск..."}
                                                           onChange={(e) => {
                                                               _searchRc(e.target.value)
                                                           }}
                                                    />
                                                </div>
                                                {dicRc.map((value, i) => (
                                                    <a className={
                                                        (value.id === rc) ? 'dropdown-item active' : 'dropdown-item'
                                                    }
                                                       key={i}
                                                       onClick={() => {
                                                           setRc(value.id)
                                                           setNameRc(value.name)
                                                       }}
                                                    >
                                                        {value.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2">
                                        <label>Район</label>
                                        <Select className={"form-control"}
                                                name={"district"}
                                                value={district}
                                                onChange={(event) => {
                                                    setDistrict(event.target.value)
                                                }}
                                        >
                                            <option value={0}>Все районы</option>
                                            {dicDistrict.map((e, i) => (
                                                <option value={e.id} key={i}>{e.name}</option>
                                            ))}
                                        </Select>
                                    </div>

                                    <div className="col-lg-4">
                                        <label>Адрес (улица, проспект) № дома</label>
                                        <div className="input-group mb-3">
                                            <input type="text"
                                                   name="address"
                                                   list={"gps_search"}
                                                   className="form-control"
                                                   placeholder={"Пример: пр.Республики 200"}
                                                   onChange={(event) => {
                                                       setAddress(event.target.value)
                                                   }}
                                                   value={address}
                                                   onKeyPress={(event) => {
                                                       if(event.key === 'Enter'){
                                                           findGPS()
                                                       }
                                                   }}
                                            />
                                            <datalist id={"gps_search"}>
                                                {listSearch.map((val, i) => (
                                                    <option
                                                        key={i}
                                                        value={val.display_name}
                                                        onChange={() => {
                                                            _setAddressGPS(val.display_name, val.lat, val.lon)
                                                        }}
                                                    >{val.display_name}</option>
                                                )) }
                                            </datalist>
                                            <div className="input-group-append">
                                                <span
                                                    className="input-group-text btn btn-sm btn-dark"
                                                    onClick={findGPS}
                                                >
                                                    <i className={"far fa-map"}></i>
                                                </span>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                <div className={"col-lg-12"}>

                                    <div className={"accordion"} id={"accordionExample"}>
                                        <div className={"accordion-item"}>
                                            <h2 className={"accordion-header"} id={"headingOne"}>
                                                <button className={"accordion-button"} type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                        aria-expanded="true" aria-controls="collapseOne"
                                                        onClick={showModal}
                                                >
                                                    Карта
                                                </button>
                                            </h2>
                                            <div id={"collapseOne"}
                                                 className={(showHideMap) ? "accordion-collapse collapse show" : "accordion-collapse collapse"}
                                                 aria-labelledby={"headingOne"}
                                                 data-bs-parent={"#accordionExample"}
                                            >
                                                <div className={"accordion-body"}>
                                                    <MapContainer
                                                        center={position}
                                                        zoom={13}
                                                        scrollWheelZoom={true}
                                                        style={{height: "50vh"}}
                                                        whenCreated={setMap}>
                                                    >
                                                        <TileLayer
                                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                            url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                                                        />

                                                            <Marker position={position} draggable={true}>
                                                                <Popup>
                                                                    Вы здесь?
                                                                </Popup>
                                                            </Marker>
                                                    </MapContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <hr/>

                                <div className="row">
                                    <div className="col-lg-4">
                                        <label>Общая площадь м2</label>
                                        <input type="number"
                                               name="total_area"
                                               className="form-control"
                                               placeholder="0"
                                               onChange={(event) => {
                                                   setTotalArea(parseFloat(event.target.value))
                                               }}
                                               value={totalArea}
                                               required
                                        />
                                    </div>

                                    <div className="col-lg-4">
                                        <label>Жилая площадь м2</label>
                                        <input type="number"
                                               name="living_area"
                                               className="form-control"
                                               onChange={(event) => {
                                                   setLivingArea(parseFloat(event.target.value))
                                               }}
                                               value={livingArea}
                                        />
                                    </div>

                                    <div className="col-lg-4">
                                        <label>Кухня м2</label>
                                        <input type="number"
                                               name="kitchen_area"
                                               className="form-control"
                                               onChange={(event) => {
                                                   setKitchenArea(parseFloat(event.target.value))
                                               }}
                                               value={kitchenArea}
                                        />
                                    </div>
                                </div>

                                <hr/>

                                <div className="row">
                                    <div className="col-lg-4">
                                        <label>Год постройки</label>
                                        <input type="number"
                                               name="year_construction"
                                               className="form-control"
                                               onChange={(event) => {
                                                   setYearConstruction(parseInt(event.target.value))
                                               }}
                                               value={yearConstruction}
                                        />
                                    </div>

                                    <div className="col-lg-4">
                                        <label>Этаж</label>
                                        <input type="number"
                                               name="floor"
                                               className="form-control"
                                               onChange={(event) => {
                                                   setFloor(parseInt(event.target.value))
                                               }}
                                               value={floor}
                                               required
                                        />
                                    </div>

                                    <div className="col-lg-4">
                                        <label>Кол-во этажей в доме</label>
                                        <input type="number"
                                               name="floor_all"
                                               className="form-control"
                                               onChange={(event) => {
                                                   setFloorAll(parseInt(event.target.value))
                                               }}
                                               value={floorAll}
                                        />
                                    </div>
                                </div>

                                <hr/>

                                <div className="row">
                                    <div className="col-lg-4">
                                        <label>Состояние недвижимости</label>
                                        <Select className={"form-control"}
                                                name={"id_condit"}
                                                value={condit}
                                                onChange={(event) => {
                                                    setCondit(event.target.value)
                                                }}
                                        >
                                            {dicCondit.map((e, i) => (
                                                <option value={e.id} key={i}>{e.name}</option>
                                            ))}
                                        </Select>

                                    </div>

                                    <div className="col-lg-8">
                                        <label>Добавить описание</label>
                                        <textarea
                                            name="other_comment"
                                            className="form-control"
                                            onChange={(event) => {
                                                setComment(event.target.value)
                                            }}
                                            value={comment}
                                        />
                                    </div>
                                </div>

                                <hr/>

                                <div className="row">
                                    <div className="col-lg-4">
                                        <label>Номера телефонов</label>
                                        <input type="tel"
                                               name="phone"
                                               className="form-control"
                                               onChange={(event) => {
                                                   setPhone(event.target.value)
                                               }}
                                               value={phone}
                                               required/>
                                    </div>

                                    <div className="col-lg-4">
                                        <label>&nbsp;</label>
                                        <input type="tel"
                                               name="phone2"
                                               className="form-control"
                                               onChange={(event) => {
                                                   setPhone2(event.target.value)
                                               }}
                                               value={phone2}
                                        />
                                    </div>

                                    <div className="col-lg-4">
                                        <label>&nbsp;</label>
                                        <input type="text"
                                               name="phone3"
                                               className="form-control"
                                               onChange={(event) => {
                                                   setPhone3(event.target.value)
                                               }}
                                               value={phone3}
                                        />
                                    </div>
                                </div>

                                <hr/>

                                <div className="row">
                                    {images.map((e, i) => {
                                        return (
                                            <div className={"col-lg-3"} key={i}>
                                                <div className={"card"}>
                                                    <div className={"card-body"}>
                                                        <img src={e.pic} width={"100%"}/>
                                                    </div>
                                                    <div className={"card-footer"}>
                                                        <label>
                                                            <input type={"radio"}
                                                                   key={i}
                                                                   checked={(e.general === 1)}
                                                                   onChange={async () => {
                                                                       await setMain(i)
                                                                   }}
                                                            />
                                                            Основное фото
                                                        </label>
                                                        <button className={"btn btn-default"}
                                                                key={i}
                                                                onClick={async () => {
                                                                    await removeImage(i)
                                                                }}
                                                        >
                                                            <FaTrash/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="card-footer">
                        <span className="btn btn-info"
                              onClick={triggerClick}>
                                    Загрузить картинки
                                </span>
                                <input type="file"
                                       id={"file"}
                                       accept="image/x-png,image/jpeg"
                                       onChange={async (e) => {
                                           await loadImage(e);
                                       }}
                                       hidden
                                       ref={fileRef}
                                />

                                <button type="submit"
                                        className="btn btn-success float-right"
                                        onClick={_save}
                                >
                                    <i className="fa fa-save"></i> Сохранить
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <AdvRight/>
                    </div>
                </div>
            </>
        )
    )
}

export default RoomEdit;
