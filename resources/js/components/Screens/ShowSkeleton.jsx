import React from 'react'
import Skeleton from 'react-loading-skeleton';

const ShowSkeleton = () => {
    return (
        <div className={"row"}>
            <div className={"col-lg-12"}>
                <h2><Skeleton/></h2>
                <hr/>
            </div>
            <div className={"col-lg-6"}>
                <div className={"carousel"}>
                    <div className={"carousel-main"}>
                        <div className={"carousel-main-img"}>
                            <Skeleton height={300}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"col-lg-6"}>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td><Skeleton className={"form-control"}/></td>
                            <td><Skeleton className={"form-control"}/></td>
                        </tr>
                        <tr>
                            <td><Skeleton className={"form-control"}/></td>
                            <td><Skeleton className={"form-control"}/></td>
                        </tr>
                        <tr>
                            <td><Skeleton className={"form-control"}/></td>
                            <td><Skeleton className={"form-control"}/></td>
                        </tr>
                        <tr>
                            <td><Skeleton className={"form-control"}/></td>
                            <td><Skeleton className={"form-control"}/></td>
                        </tr>
                        <tr>
                            <td><Skeleton className={"form-control"}/></td>
                            <td><Skeleton className={"form-control"}/></td>
                        </tr>
                        <tr>
                            <td><Skeleton className={"form-control"}/></td>
                            <td><Skeleton className={"form-control"}/></td>
                        </tr>
                        <tr>
                            <td><Skeleton className={"form-control"}/></td>
                            <td><Skeleton className={"form-control"}/></td>
                        </tr>
                        <tr>
                            <td><Skeleton className={"form-control"}/></td>
                            <td><Skeleton className={"form-control"}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowSkeleton;
