import React, {useEffect, useState} from 'react';
import '../../styles/common/common.sass'
import '../../styles/author/authors.sass'
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
function AuthorView() {

    let {id} = useParams();
    const[author, setAuthor] = useState(
        {
            id:'',
            pseudonym: '',
            description: '',
            imageName : '',
        }
    )

    useEffect(() => {
        const url = "/authors/"
        axios.get(url + id).then((response)=>{
            setAuthor(response.data)
        }).catch((error) => {

        })
    }, []);

    function deleteAuthor(id) {
        const url = "/authors/";
        axios.delete((url, id) =>{
        }).then((response)=>{
            setAuthor(response.data)
        }).catch((error) => {

        })
    }

    return (
        <div className={"wrapper"} >
            <div className={"author_view_container"}>
                <img src={author.imageName} className={"author_picture"}/>
                <div className={"author_description"}>
                    <h2>{author.pseudonym}</h2>
                    Об авторе<br></br>
                    {author.description}
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
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AuthorView;