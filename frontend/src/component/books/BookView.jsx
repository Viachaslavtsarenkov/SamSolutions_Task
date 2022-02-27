import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import AuthorizationService from "../../service/AuthorizationService";


function BookView() {

    let [book, setBook] = useState({
        id : 0,
        name : '',
        description : '',
        publishedYear : '',
        weight : 0,
        materialCover : '',
        amountPages : 0,
        imageName : '',
        price : 0,
        inStock : false,
        cart: [],
        sales: [],
        payments: [],
        authors : [],
        genres : [],
    })
    let {id} = useParams();

    useEffect(() => {
        const url = "/books/"
        axios.get(url + id).then((response)=>{
            setBook(response.data)
            console.log(book)
        }).catch((error) => {

        })
    }, []);

    return (
        <div className={"wrapper"} >
            <div className={"author_view_container"}>
                <img src={book.imageName} className={"author_picture"} width={500} height={500}/>
                <div className={"author_description"}>
                    <h2>{book.name}</h2>
                    <p>{book.price}</p>
                    <input type={"button"} value={"добавить в козину"}/>
                    {AuthorizationService.currentUserHasRole("ADMIN") && (
                        <div className={"action_btn_container"}>

                            <Link className={"action_link"}
                                  to={{
                                      pathname : "/books/" + book.id + "/edit"
                                  }}
                            >
                                Редактировать
                            </Link>
                            <Link className={"action_link delete_btn"}
                                  to={{
                                      pathname : "/books/" + book.id + "/delete"
                                  }}
                            >
                                Удалить
                            </Link>
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
}

export default BookView;