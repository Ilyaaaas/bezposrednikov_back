import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {_GET, _POST, isLogined} from '../../../constants';
import {Textarea} from "@vechaiui/react";
import {notify} from "../../../notify";

// const CommentsLeft = () => {
//     return (
//         <div>
//
//         </div>
//     );
// }
//
// const CommentsRight = () => {
//     return (
//         <div>
//
//         </div>
//     );
// }

const NotAuth = () => {
    return (
        <>
            <h5>Чтобы оставлять комментарии необходимо
                <Link to={"/login"} className={"btn btn-link"}>
                    <h5>авторизоваться</h5>
                </Link> или <Link to={"/registration"} className={"btn btn-link h2"}>
                    <h5>зарегистрироваться</h5>
                </Link> в системе
            </h5>

        </>
    )
}

function Comments({id_home}) {
    const [onLogined, setOnLogined] = useState(false);
    const [listComments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    const _start = async () => {
        if (isLogined()) {
            await _GET('home/comments/' + id_home).then(res => {
                if (res !== null) {
                    setComments(res);
                }
            })
        }
    }

    const sendText = () => {
        if (commentText.trim() === '') {
            notify('Пустое поле комментария', false);
            return false;
        }

        _POST('home/comments', {"id_home": id_home, "comment": commentText}).then(res => {
            if (res !== null) {
                setComments(res);
                setCommentText('');
            }
        })
    }

    const setLike = (id_comment, id_type) => {
        _POST('home/comment_like', {
            "id_comment" : id_comment,
            "id_type" : id_type
        }).then(res => {
            if(res !== null){
                setComments(res);
            }
        })
    }

    useEffect(async () => {
        await setOnLogined(isLogined());
        await _start();
    }, []);

    if (!onLogined) {
        return <NotAuth/>
    } else {
        return (
            <>
                <div className={"div-commet"}>
                    {listComments.map((event, key) => {
                        let dts = event.date_set.split(' ');
                        return (
                            <div className="card" key={key}>
                                <div className="card-body">
                                    <small className="float-right text-muted" style={{textAlign: "right"}}>
                                        <i className={"fa fa-calendar"}></i> {dts[0]} <br/> {dts[1]}
                                    </small>
                                    <h6 className="card-title">
                                        {(event.avatar !== null) && (
                                            <img src={event.avatar} style={{width: "50px", height: "50px", marginRight: "10px"}}/>
                                        )}
                                        {event.name}
                                    </h6>
                                    <p className="card-text">{event.comment_text}</p>
                                    <p className="card-text">
                                        <span
                                            className={"btn btn-secondary btn-sm"}
                                            onClick={() => {
                                                setLike(event.id, 'likes')
                                            }}
                                        >
                                            <i className={"fa fa-thumbs-up"}></i> {event.likes}
                                        </span>
                                        &nbsp;
                                        <span
                                            className={"btn btn-secondary btn-sm"}
                                            onClick={() => {
                                                setLike(event.id, 'dislike')
                                            }}
                                        >
                                            <i className={"fa fa-thumbs-down"}></i> {event.dislikes}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">
                            <Textarea
                                className={"form-control"}
                                placeholder={"Введите текст ..."}
                                value={commentText}
                                onChange={(e) => {
                                    setCommentText(e.target.value)
                                }}
                            />
                            <span className={"btn btn-dark btn-sm"} onClick={sendText}>Отправить</span>
                        </p>
                    </div>
                </div>

            </>
        )
    }
}

export default Comments;
