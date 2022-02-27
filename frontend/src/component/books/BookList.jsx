import {Link, Redirect} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import BookItemCustomerView from "./BookItemCustomerView";
import AuthorizationService from "../../service/AuthorizationService";
import BookListItemAdminView from "./BookListItemAdminView";

function BookList() {

    let [books, setBooks] = useState([{
        id : '',
        name : '',
        description : '',
        publishedYear : '',
        weight : '',
        materialCover : '',
        amountPages : '',
        imageName : '',
        price : '',
        inStock : false,
        cart: [],
        sales: [],
        payments: [],
        authors : [],
        genres : [],
    }])

    useEffect(() => {
        getBookList();
    }, [])

    function getBookList() {
        axios.get('/books').then(
            (response) => {
                setBooks(response.data)
            }
        );
    }

    return (
        <div className={"wrapper"}>
            <div className={"books_container"}>
                {!AuthorizationService.currentUserHasRole("ADMIN") && (
                books.map((book, index) => (
                    <BookItemCustomerView value={book}/>
                )))
            }
            {AuthorizationService.currentUserHasRole("ADMIN") && (
                <div className={"book_author_container"}>
                    <Link to={"/books/new"}>Добавить</Link>
                    <table className={"book_list_table"}>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Количество страниц</th>
                            <th>Цена</th>
                            <th>В наличии</th>
                            <th>Действие</th>
                        </tr>
                        {books.map((book, index) => (
                            <BookListItemAdminView value={book}/>
                            ))}
                    </table>
                </div>
            )}

            </div>
        </div>
    )
}

export default BookList;