import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';

function OSMap() {
    return (
        <div className={"osmap"}>
            <MapContainer
                center={[51.128207, 71.430411]}
                zoom={13}
                scrollWheelZoom={true}
                style={{height: "50vh"}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>

    )

}

export default OSMap;
