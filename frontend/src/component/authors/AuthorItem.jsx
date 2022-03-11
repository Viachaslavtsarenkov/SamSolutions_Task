import {Link} from "react-router-dom";
import React from "react";
import AuthorizationService from "../../service/AuthorizationService";

function AuthorItem(props) {

    const author = props.value;

    return (
        <div className={"author_view_container"}>
            <img src={author.imageName} className={"author_picture"} width={500} height={500}/>
            <div className={"author_description"}>
                <h2>{author.pseudonym}</h2>
                <h3>Об авторе</h3>
                <div className={"author_about"}>{author.description}</div>
                {AuthorizationService.currentUserHasRole("ADMIN") && (
                <div className={"action_btn_container"}>
                    <Link className={"action_link"}
                          to={{
                              pathname : "/authors/" + author.id + "/edit"
                          }}
                    >
                        Редактировать
                    </Link>
                    <Link className={"action_link delete_btn"}
                          to={{
                              pathname : "/authors/" + author.id + "/edit"
                          }}
                    >
                        Удалить
                    </Link>
                </div>)}
            </div>
        </div>
    )
}

export default AuthorItem;