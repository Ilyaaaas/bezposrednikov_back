import React from 'react';
import {Link} from 'react-router-dom';
import {FaAngleLeft, FaAngleRight, FaEdit, FaEye, FaTrash} from 'react-icons/fa';
import {MoneyFormat} from "../../constants";

export function WidgetGrid(props) {
    return (
        <div className={"col-lg-4 mb-4"}>
            <Link className="card href" to={'/show/' + props.id}>
                <div className={"card-image"} style={{
                    backgroundImage: 'url(' + props.image + ')'
                }}></div>
                <div className="count-photo">{props.count_image} фото</div>
                <div className="card-body">
                    <label className={"widget_money"}>{MoneyFormat(props.price)}</label>
                    <span className="badge badge-secondary float-right">{props.type_sale}</span>
                    <label>{props.city_name}</label>
                    <h5 className="card-title">{props.cnt_rooms} комн. {props.type_home_name}</h5>
                    <h6 className="card-subtitle text-muted">
                        {props.total_area}<sup><small>2</small></sup> - {props.floor} этаж
                    </h6>
                    <label className={"text-muted label_muted_widget mt-2 row"}>
                        <span className={"col-lg-6"}>
                            <i className={"fa fa-eye"}></i> {props.count_view}
                        </span>
                        <span className={"col-lg-6 label_date_set"}>
                            {props.date_set}
                        </span>
                    </label>
                </div>
            </Link>
        </div>
    )
}

export function WidgetGridHome(props) {
    return (
        <div className={"col-lg-4 mb-4"}>
            <div className={"card-image"} style={{
                backgroundImage: 'url(' + props.image + ')'
            }}></div>
            <div className="count-photo">{props.count_image} фото</div>
            <div className="card-body">
                <label className={"widget_money"}>{MoneyFormat(props.price)}</label>
                <span className="badge badge-secondary float-right">{props.type_sale}</span>
                <label>{props.city_name}</label>
                <h5 className="card-title">{props.cnt_rooms} комн. {props.type_home_name}</h5>
                <h6 className="card-subtitle text-muted">{props.total_area}<sup><small>2</small></sup> - {props.floor} этаж
                </h6>
                <label className={"text-muted label_date_set"}>{props.date_set}</label>
            </div>
            <div className={"card-footer"} style={{textAlign: "center"}}>
                <Link to={"/room_edit/"+props.id} className={"btn btn-info btn-sm mr-3"}><FaEdit /></Link>
                <Link to={"/show/"+props.id} className={"btn btn-primary btn-sm mr-3"}><FaEye /></Link>
                <Link to={"/"} className={"btn btn-danger btn-sm"}><FaTrash /></Link>
            </div>
        </div>
    )
}

export function WidgetList(props) {
    return (
        <div className={"col-lg-12 mb-4"}>
            <Link to={'/show/' + props.id} className={"row href"}>
                <div className={"col-lg-4"}>
                    <div className={"card-image"} style={{
                        backgroundImage: 'url(' + props.image + ')'
                    }}></div>
                    <div className="count-photo">{props.count_image} фото</div>
                </div>
                <div className="col-lg-8">

                    <div>
                        <span className="badge badge-secondary float-right">{props.type_sale}</span>
                        <label className="h5">{props.cnt_rooms} комн. {props.type_home_name}</label>
                    </div>
                    <label>{props.city_name}</label><br/>
                    <label className={'widget_money'}>{MoneyFormat(props.price)}</label>
                    <p>
                        <label
                            className="h6 text-muted">{props.total_area}<sup><small>2</small></sup> - {props.floor} этаж</label>
                    </p>
                    <label className={"row text-muted label_muted_widget"}>
                        <span className={"col-lg-6"}>
                            {props.date_set}
                        </span>
                        <span className={"col-lg-6 label_date_set"}>
                            <i className={"fa fa-eye"}></i> {props.count_view}
                        </span>
                    </label>
                </div>
            </Link>
        </div>
    )
}

export function Pagination(props) {
    return (
        (props.links.length <= 3) ? (<div></div>) : (
            <div className={"col-lg-12 mt-6 d-flex justify-content-center"}>
                <div className="btn-toolbar" role="toolbar">
                    <ul className="pagination me-2">
                        {props.links.map((e, i) => {
                            let link = e.url;
                            if(link !== null){
                                let sp = link.split('?');
                                link = '/page/'+sp[1].replace('page=', '');
                            }

                            return (
                            <li key={i}
                                className={"page-item" + ((e.active === true) ? ' active' : '') + ((link === null) ? ' disabled' : '')}
                            >
                                <Link className="page-link" to={link}>{
                                    (e.label === '&laquo; Previous') ? <FaAngleLeft/> :
                                        (e.label === 'Next &raquo;') ? <FaAngleRight/> : e.label
                                }</Link>
                            </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    )
}
