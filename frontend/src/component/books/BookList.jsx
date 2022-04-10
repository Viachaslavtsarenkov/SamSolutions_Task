import {Link,useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import BookListCustomerView from "./BookListCustomerView";
import AuthorizationService from "../../service/AuthorizationService";
import BookAdminList from "./BookAdminList";
import Pagination from "../commom/Pagination";
import Util from "../../service/Util";
import loading from "../../icon/loading.gif";
import BookLocalization from "../localization/BookLocalization";
import LangUtil from "../../service/LangUtil";
import bookLocalization from "../localization/BookLocalization";

function BookList() {

    const history = useHistory();
    let [lang] = useState(LangUtil.getLang())
    let [books, setBooks] = useState([]);
    let [page, setPage] = useState(Util.getPage());
    let [sort, setSort] = useState(Util.getSort());
    let [totalPages, setTotalPages] = useState(-1);
    let [search, setSearch] = useState({
        minPrice : '0',
        maxPrice : '9999',
        inStock: '',
    });

    useEffect(() => {
        if(page !== 0) {
            toPage(page);
        }
        getBookList();
    }, [page, sort])

    function toPage(el) {
        Util.setUrl(Util.setPageParam(el) +
            Util.getSortParam() + Util.getSearchParam(), history)
        setPage(el);
    }

    function changeOrder(e) {
        Util.setUrl(Util.setPageParam(0)
            + Util.setSortParam(e.target.value)
            + Util.getSearchParam(), history)
        setSort(e.target.value);
        setPage(0);
    }

    function getBookList() {
        axios.get("/books?".concat(Util.getPageParam(),
            Util.getSortParam(), Util.getSearchParam())).then(
            (response) => {
               setBooks(response.data['books']);
               setTotalPages(response.data['totalPages'])
            }
        );
    }

    function searchByCriteria(e) {
        let option = e.target.name;
        let value;
        if(option === 'minPrice') {
            value = 0;
        } else {
            value = 9999;
        }
        setSearch({
            ...search,
            [option] : e.target.value === '' ? value : e.target.value
        })
    }

    function setInStock(e) {
        if(e.target.checked) {
            setSearch({
                ...search,
                inStock: "inStock" + "~true"
            })
        } else {
            setSearch({
                ...search,
                inStock : ""
            })
        }
    }

    function findByCriteria() {
        let searchString = "&search=".concat(search.inStock)
        let price;
        price = ",".concat("price","<>",search.minPrice,"_",search.maxPrice);
        Util.setUrl(Util.setPageParam(0) + Util.getSortParam() + searchString + price, history)
        setPage(0);
        getBookList()
    }

    return (
        <div className={"wrapper"}>
            <div className={"books_container"}>
                {!AuthorizationService.currentUserHasRole("ROLE_ADMIN") && (
                    <div className={"customer_book_panel"}>
                        <div className={"sorting_panel"}>
                            <p>{BookLocalization.locale[lang].price}</p>
                            <select className={"sort_by"} onChange={changeOrder}>
                                <option value={"ASC"}>{BookLocalization.locale[lang].ascending}</option>
                                <option value={"DESC"}>{BookLocalization.locale[lang].descending}</option>
                            </select>
                            <div className={"all_books_check_container"}>
                                <p>{BookLocalization.locale[lang].onlyInStock}</p>
                                <input
                                    onClick={setInStock}
                                    className={"in_stock"}
                                    type={"checkbox"}/>
                            </div>
                            <div className={"price_criteria_container"}>
                                <p>{BookLocalization.locale[lang].from}</p>
                                <input
                                    maxLength={4}
                                    name={"minPrice"}
                                    min={1}
                                    onChange={searchByCriteria}
                                    type={"number"}/>
                                <p>{BookLocalization.locale[lang].to}</p>
                                <input
                                       onChange={searchByCriteria}
                                       maxLength={4}
                                       min = {1}
                                       max = {9999}
                                       name={"maxPrice"}
                                       type={"number"}/>
                                <input
                                        onClick={findByCriteria}
                                       type={"button"}
                                       className={"book_search_btn"}
                                       value= {bookLocalization.locale[lang].find}
                                />
                                <p className={"reset_filter"}
                                    onClick={
                                    () => {window.location.href = "/books"}}>
                                    Сбосить фильтр
                                </p>
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
                    <Link to={"/books/new"} className={"add_btn"}>
                        {bookLocalization.locale[lang].add}
                    </Link>
                    {totalPages !== 0 && (<BookAdminList value={books}/>)}
                </div>)}

            </div>
            {totalPages === -1 && (
                <div className={"loading_container"}>
                    <img src={loading} width={50} alt={"loading"}/>
                </div>
            )}
            {totalPages > 0 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    toPage={toPage}
                />
            )}
            {totalPages === 0 && (
                <div className={"empty_list"}>
                    {bookLocalization.locale[lang].listEmpty}
                </div>)}
        </div>
    )
}
export default BookList;