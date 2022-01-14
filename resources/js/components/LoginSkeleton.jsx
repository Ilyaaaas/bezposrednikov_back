import React from 'react';
import Skeleton from 'react-loading-skeleton';


const LoginSkeleton = () => {
    return (
        <div className={"row justify-content-center"}>
            <div className={"col-md-8"}>
                <div className="card">
                    <div className="card-header"><Skeleton /></div>

                    <div className="card-body">
                        <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right"></label>
                            <div className="col-md-6">
                                <Skeleton className={"form-control"} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right"></label>

                            <div className="col-md-6">
                                <Skeleton className={"form-control"} />
                            </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-4">
                                <Skeleton className={"form-control"} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginSkeleton;
