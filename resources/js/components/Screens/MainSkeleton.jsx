import React from 'react'
import Skeleton from 'react-loading-skeleton';

const MainSkeleton = (props) => {
    return (
        <div className={"row"}>
            {/*<div className={"col-lg-12 mb-3"}>*/}
            {/*    <Skeleton height={50} className="form-control" />*/}
            {/*</div>*/}
            <div className={"col-lg-2"}>
                <div className="form-group">
                    <Skeleton className="form-control" />
                </div>
                <div className="form-group">
                    <Skeleton className="form-control" />
                </div>
                <div className="form-group">
                    <Skeleton className="form-control" />
                </div>
                <div className="form-group">
                    <Skeleton className="form-control" />
                </div>

                <div className="form-group">
                    <Skeleton className="form-control" />
                </div>
                <div className="form-group">
                    <Skeleton className="form-control" />
                </div>

                <div className="form-group">
                    <Skeleton className="form-control" />
                </div>
            </div>
            <div className={'col-lg-8'}>
                {props.onGrid ? (
                    <div className={"row"}>
                        <div className={"col-lg-4"}>
                            <div className={"card href"}>
                                <Skeleton height={150}/>
                                <div className={"card-body"}>
                                    <label><Skeleton width={150}/></label>
                                    <h5 className={"card-title"}><Skeleton/></h5>
                                    <h6 className={"card-subtitle text-muted"}><Skeleton/>
                                        <Skeleton width={30}/> - <Skeleton width={40}/>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className={"col-lg-4"}>
                            <div className={"card href"}>
                                <Skeleton height={150}/>
                                <div className={"card-body"}>
                                    <label><Skeleton width={150}/></label>
                                    <h5 className={"card-title"}><Skeleton/></h5>
                                    <h6 className={"card-subtitle text-muted"}><Skeleton/>
                                        <Skeleton width={30}/> - <Skeleton width={40}/>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className={"col-lg-4"}>
                            <div className={"card href"}>
                                <Skeleton height={150}/>
                                <div className={"card-body"}>
                                    <label><Skeleton width={150}/></label>
                                    <h5 className={"card-title"}><Skeleton/></h5>
                                    <h6 className={"card-subtitle text-muted"}><Skeleton/>
                                        <Skeleton width={30}/> - <Skeleton width={40}/>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                ): (
                    <div className={"row"}>
                        <div className={"col-lg-12"}>
                            <div className={"card href"}>
                                <Skeleton height={150}/>
                                <div className={"card-body"}>
                                    <label><Skeleton width={150}/></label>
                                    <h5 className={"card-title"}><Skeleton/></h5>
                                    <h6 className={"card-subtitle text-muted"}><Skeleton/>
                                        <Skeleton width={30}/> - <Skeleton width={40}/>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className={"col-lg-12"}>
                            <div className={"card href"}>
                                <Skeleton height={150}/>
                                <div className={"card-body"}>
                                    <label><Skeleton width={150}/></label>
                                    <h5 className={"card-title"}><Skeleton/></h5>
                                    <h6 className={"card-subtitle text-muted"}><Skeleton/>
                                        <Skeleton width={30}/> - <Skeleton width={40}/>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <div className={"col-lg-2"}>
                <Skeleton style={{height: "60vh"}} />
            </div>
        </div>
    )
}

export default MainSkeleton;
