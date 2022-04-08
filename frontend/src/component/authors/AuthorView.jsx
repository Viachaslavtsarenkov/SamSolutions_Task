import React, {useEffect, useState} from 'react';
import '../../styles/common/common.sass'
import '../../styles/author/authors.sass'
import {Link, Redirect, useParams} from 'react-router-dom';
import axios from "axios";
import localization from "../localization/AuthorLocalization";
import AuthorizationService from "../../service/AuthorizationService";
import noPic from "../../icon/nopic.png";
function AuthorView() {

    let {id} = useParams();
    let lang = "ru";
    const[url, setUrl] = useState("/authors");
    let[isRedirect, setIsRedirect] = useState(false);

    const[author, setAuthor] = useState(
        {
            id:'',
            pseudonym: '',
            description: '',
            image: {imageContent : ''},
            books : []
        }
    )


    useEffect(() => {
        getAuthor();
    }, []);

    function deleteAuthor() {
        if(author.books.length === 0) {
            axios.delete("/authors/" + author.id)
                .then(() => {
                    alert(localization.locale[lang].removeMessage);
                    setIsRedirect(true);
                })
        } else {
            alert(localization.locale[lang].deleteAuthorMessage);
        }

    }

    if(isRedirect) {
        return <Redirect to={url}/>
    }

    function getAuthor(){
        axios.get("/authors/" + id)
            .then((response)=>{
            setAuthor(response.data);
        }).catch(() => {
            setUrl("/404");
            setIsRedirect(true);
        })
    }


    return (
        <div className={"wrapper"} >
            <div className={"author_view_container"}>
                <img src={author.image.imageContent === null ? noPic : "data:image/jpg;base64," + (author.image === null ? '' : author.image.imageContent)}
                     className={"author_picture"} width={500} height={500} alt={author.pseudonym}/>
                <div className={"author_description"}>
                    <h2>
                        {author.pseudonym}
                    </h2>
                    <h3>
                        {localization.locale[lang].about}
                    </h3>
                    <div className={"author_about"}>
                        {author.description}
                    </div>
                    {AuthorizationService.currentUserHasRole("ROLE_ADMIN") && (
                        <div className={"action_btn_container"}>
                            <Link className={"action_link"}
                                  to={{
                                      pathname : "/authors/" + author.id + "/edit"
                                  }}
                            >
                                {localization.locale[lang].edit}
                            </Link>
                            <button className={"action_link delete_btn"}
                                    onClick={deleteAuthor}
                            >
                                {localization.locale[lang].delete}
                            </button>
                        </div>)}
                </div>
            </div>
            <div className={"author_book_container"}>
                {author.books.map((book) => (
                    <div className={"author_item_books"} key={book.id}>
                        <Link to={{
                            pathname: "/books/" + book.id
                        }}>
                            {book.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default AuthorView;