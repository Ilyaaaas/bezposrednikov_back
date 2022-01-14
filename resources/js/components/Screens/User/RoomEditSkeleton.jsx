import React from 'react';
import Skeleton from 'react-loading-skeleton';
import {Select} from "@vechaiui/react";
import {FaTrash} from "react-icons/fa";
import {AdvRight} from "../Adv";

const RoomEditSkeleton = () => {
    return (
        <div className="row">
            <div className="col-lg-10">
                <div className="card">
                    <div className="card-header">
                        <h4><Skeleton /></h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>

                            <div className="col-lg-3">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>

                            <div className="col-lg-3">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>

                            <div className="col-lg-3">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="row">
                            <div className="col-lg-3">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>

                            <div className="col-lg-3">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>

                            <div className="col-lg-6">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="row">
                            <div className="col-lg-4">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>

                            <div className="col-lg-4">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>

                            <div className="col-lg-4">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="row">
                            <div className="col-lg-4">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>

                            <div className="col-lg-4">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>

                            <div className="col-lg-4">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="row">
                            <div className="col-lg-4">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>

                            <div className="col-lg-8">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="row">
                            <div className="col-lg-4">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>

                            <div className="col-lg-4">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>

                            <div className="col-lg-4">
                                <label></label>
                                <Skeleton className={"form-control"}/>
                            </div>
                        </div>

                    </div>
                    <div className="card-footer">
                        <Skeleton className={"form-control"}/>
                    </div>
                </div>
            </div>
            <div className="col-lg-2">
                <Skeleton className={"form-control"} height={"70vh"}/>
            </div>
        </div>
    )
}

export default RoomEditSkeleton;
