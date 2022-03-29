import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import AuthorizationService from "../../service/AuthorizationService";
import BookItemView from "./BookItemView";


function BookView() {

    let [book, setBook] = useState({
        id: '',
        name: '',
        description: '',
        publishedYear: '',
        weight: '',
        materialCover: '',
        amountPages: '',
        image: {imageContent : ''},
        price: '',
        inStock: false,
        cart: [],
        sales: [],
        payments: [],
        authors: [],
        genres: [],
    })

    let {id} = useParams();

    useEffect(() => {
        const url = "/books/"
        axios.get(url + id).then((response) => {
            setBook(response.data)
        }).catch((error) => {

        })
    }, []);

    return (
        <div className={"wrapper"}>
            {book.id !== '' && (<BookItemView value={book}/>)}
        </div>
    );
};

export default BookView;