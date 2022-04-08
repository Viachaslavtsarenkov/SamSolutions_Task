import React, {useEffect, useState} from "react";
import axios from "axios";
import {Redirect, useParams} from "react-router-dom";
import BookItemView from "./BookItemView";


function BookView(props) {

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

    let [isRedirect, setIsRedirect] = useState(false);
    let {id} = useParams();

    useEffect(() => {
        const url = "/books/"
        axios.get(url + id).then((response) => {
            setBook(response.data)
        }).catch(() => {
            setIsRedirect(true);
        })
    }, []);

    if(isRedirect) {
        return (<Redirect to={"/404"} />)
    }

    return (
        <div className={"wrapper"}>
            {book.id !== '' && (<BookItemView value={book} cart={props.cart}/>)}
        </div>
    );
};

export default BookView;