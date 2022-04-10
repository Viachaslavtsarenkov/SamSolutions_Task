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
        cart: [],
        sales: [],
        payments: [],
        authors: [],
        genres: [],
    })

    let [isRedirect, setIsRedirect] = useState(false);
    let {id} = useParams();

    useEffect(() => {
        if(book.id === '') {
            findBook();
        }
    }, [book]);

    function findBook() {
        const url = "/books/"
        axios.get(url + id).then((response) => {
            setBook(response.data)
        }).catch(() => {
            setIsRedirect(true);
        })
    }

    function deleteBook() {
        let currentBook = {...book, inStock : !book.inStock}
        const formData = new FormData();
        formData.append("book",
            new Blob([JSON.stringify(currentBook)], {
                type: "application/json"
            }));
        axios.post("/books/" + book.id, formData)
            .then(() => {
                setBook({
                    ...book,
                    id : ''
                })
            })
    }

    if(isRedirect) {
        return (<Redirect to={"/404"} />)
    }

    return (
        <div className={"wrapper"}>
            {book.id !== '' && (
                <BookItemView
                    change = {deleteBook}
                    value={book}
                    inStock={book.inStock}
                    cart={props.cart}/>
            )}
        </div>
    );
}

export default BookView;