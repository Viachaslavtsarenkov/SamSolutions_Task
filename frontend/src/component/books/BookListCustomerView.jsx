import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import AuthorizationService from "../../service/AuthorizationService";


function BookListCustomerView(props) {

    const books = props.value;

    return (
        <>
            {books.map((book, index) => (
                <div className={"book_user_item"}>
                    <img src={book.imageName} width={120} height={120} />
                    <h2 className={"book_item_name"}>{book.name}</h2>
                    <p className={"book_item_price"}>{book.price}</p>
                    <Link className = "show_book_item_btn" to={{
                        pathname: "/books/" + book.id
                    }}> Посмотреть</Link>
                </div>
            ))}
        </>
    )
};
export default BookListCustomerView;