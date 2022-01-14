import React from 'react'
import Skeleton from 'react-loading-skeleton';

export function Tile() {
    return (
        <div className={"row"}>
            <div className={"col-lg-4"}>
                <div className={"card href"}>
                    <Skeleton height={150}/>
                    <div className={"card-body"}>
                        <label><Skeleton width={150}/></label>
                        <h5 className={"card-title"}><Skeleton /></h5>
                        <h6 className={"card-subtitle text-muted"}><Skeleton />
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
                        <h5 className={"card-title"}><Skeleton /></h5>
                        <h6 className={"card-subtitle text-muted"}><Skeleton />
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
                        <h5 className={"card-title"}><Skeleton /></h5>
                        <h6 className={"card-subtitle text-muted"}><Skeleton />
                            <Skeleton width={30}/> - <Skeleton width={40}/>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
