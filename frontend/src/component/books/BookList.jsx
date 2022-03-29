import {Link, Redirect, useHistory, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import BookListCustomerView from "./BookListCustomerView";
import AuthorizationService from "../../service/AuthorizationService";
import BookAdminList from "./BookAdminList";
import Pagination from "../commom/Pagination";
import Util from "../../service/Util";

function BookList() {

    const history = useHistory()
    let [books, setBooks] = useState([])
    let [page, setPage] = useState(Util.getPage());
    let [sort, setSort] = useState(Util.getSort());
    let [totalPages, setTotalPages] = useState(1);
    let [search, setSearch] = useState({
        minPrice : '',
        maxPrice : ''
    });

    useEffect(() => {
        if(page !== 0) {
            toPage(page);
        }
        getBookList();
    }, [page, sort])

    function toPage(el) {
        Util.setUrl(Util.setPageParam(el) + Util.getSortParam(),history)
        setPage(el);
    }

    function changeOrder(e) {
        Util.setUrl(Util.setPageParam(0) + Util.setSortParam(e.target.value), history)
        setSort(e.target.value);
        setPage(0);
    }

    function getBookList() {
        console.log("/books?".concat(Util.getPageParam(),
            Util.getSortParam(), getSearchCriteria()))
        axios.get("/books?".concat(Util.getPageParam(),
            Util.getSortParam(), getSearchCriteria())).then(
            (response) => {
               setBooks(response.data['books']);
               setTotalPages(response.data['totalPages'])
                console.log(response.data);
            }
        );
    }

    function searchByCriteria(e) {
        let option = e.target.name;
        setSearch({
            ...search,
            [option] : e.target.value
        })
    }

    function getSearchCriteria() {
        return "&".concat("search=price>" + search.minPrice)
    }

    return (
        <div className={"wrapper"}>
            <div className={"books_container"}>
                {!AuthorizationService.currentUserHasRole("ROLE_ADMIN") && (
                    <div className={"customer_book_panel"}>
                        <div className={"sorting_panel"}>
                            <p>Цена</p>
                            <select className={"sort_by"} onChange={changeOrder}>
                                <option value={"ASC"}>По возрастанию</option>
                                <option value={"DESC"}>По убыванию</option>
                            </select>
                            <div className={"all_books_check_container"}>
                                <p>Только в наличии</p>
                                <input
                                    className={"in_stock"}
                                    type={"checkbox"}/>
                            </div>
                            <div className={"price_criteria_container"}>
                                <p>От</p>
                                <input
                                    maxLength={4}
                                    name={"minPrice"}
                                    onChange={searchByCriteria}
                                    type={"number"}/>
                                <p>До</p>
                                <input
                                       onChange={searchByCriteria}
                                       maxLength={4}
                                       min = {1}
                                       max = {9999}
                                       name={"maxPrice"}
                                       type={"number"}/>
                                <input
                                        onClick={getBookList}
                                       type={"button"}
                                       className={"book_search_btn"}
                                       value={"Найти"}/>
                            </div>
                        </div>
                        <div className={"book_list"}>
                            <BookListCustomerView value={books}/>
                        </div>
                    </div>
                )
            }
            {AuthorizationService.currentUserHasRole("ROLE_ADMIN") && (
                <div className={"book_author_container"}>
                    <Link to={"/books/new"} className={"add_btn"}>Добавить</Link>
                    {totalPages !== 0 && (<BookAdminList value={books}/>)}
                </div>)}
                {totalPages !== 0 && (<Pagination
                    page={page}
                    totalPages={totalPages}
                    toPage={toPage}
                />)}
            </div>
            {totalPages === 0 && (<p>Список книг пуст</p>)}
        </div>
    )
};
export default BookList;