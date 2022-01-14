import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcramps(props){
    return (
        <ol className="breadcrumb">
            <li className="breadcrumb-item">Главная</li>
            {props.list.map((res, i) => (
                <li className={"breadcrumb-item"} key={i}>
                    {(res.url !== '') ? (
                        <Link to={res.url}>{res.name}</Link>
                    ) : (res.name)}
                </li>
            ))}
        </ol>
    )
}
