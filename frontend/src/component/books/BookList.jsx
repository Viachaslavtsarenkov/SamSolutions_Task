import {Link, Redirect, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import BookListCustomerView from "./BookListCustomerView";
import AuthorizationService from "../../service/AuthorizationService";
import BookAdminList from "./BookAdminList";

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


    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);

    let [totalPages, setTotalPages] = useState(0);
    let [page, setPage] =useState(+params.get('page'));
    let [sort, setSort] = useState("&order=ASC");

    useEffect(() => {
        getBookList();
    }, [page, sort])


    function changeOrder(e) {
        setSort("&order=" + e.target.value);
        setPage(0);
    }

    function getBookList() {
        let url = "/books/" + "?page=" + (page === undefined ? 0 : page) + sort
        console.log(url)
        axios.get(url).then(
            (response) => {
               setBooks(response.data['books']);
               setTotalPages(response.data['totalPages'])
            }
        );
    }

    return (
        <div className={"wrapper"}>
            <div className={"books_container"}>
                {!AuthorizationService.currentUserHasRole("ADMIN") && books.length > 0 && (
                    <div className={"customer_book_panel"}>
                        <div className={"sorting_panel"}>
                            <select className={"sort_by"} onChange={changeOrder}>
                                <option value={"ASC"}>По возрастанию</option>
                                <option value={"DESC"}>По убыванию</option>
                            </select>
                        </div>
                        <div className={"book_list"}>
                            <BookListCustomerView value={books}/>
                        </div>

                    </div>

                )
            }
            {AuthorizationService.currentUserHasRole("ADMIN") && (
                <div className={"book_author_container"}>
                    <Link to={"/books/new"} className={"add_btn"}>Добавить</Link>
                    <BookAdminList value={books}/>
                </div>)}
            </div>
            <div className="pagination">
                {page !== 0 && (
                <button onClick={() => setPage(page - 1)} className="page">
                    &larr;
                </button>)}
                {[...Array(totalPages).keys()].map((el,index) => (

                   <div>
                       {(index !== page) && (
                           <button
                               onClick={() => setPage(el)}
                           >{el + 1} </button>
                       )}
                       {(index === page) && (
                           <button className={"active_page"}
                               onClick={() => setPage(el + 1)}
                           >{el + 1} </button>
                       )}
                   </div>

                ))}
                {page + 1 !== totalPages && (
                <button onClick={() => setPage(page + 1)} className="page">
                    &rarr;
                </button>)}
            </div>
        </div>
    )
}

export default BookList;