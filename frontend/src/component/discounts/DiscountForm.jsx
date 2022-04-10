import React, {useEffect, useState} from "react";
import AuthorizationService from "../../service/AuthorizationService";
import axios from "axios";
import '../../styles/book/book.sass'
import '../../styles/common/search.sass'
import {Redirect, useParams} from "react-router-dom";
import validationLocalization from "../localization/ValidationLocalization";
import DiscountLocalization from "../localization/DiscountLocalization";
import LangUtil from "../../service/LangUtil";

function DiscountForm() {

    let [discount, setDiscount] = useState({
        id : '',
        name :'',
        startDate : '',
        endDate : '',
        discountFactor: '',
        books : []
    })

    let {id} = useParams();
    let [lang] = useState(LangUtil.getLang())
    let [books, setBooks] = useState([]);
    let [searchString, setSearchString] = useState('');
    let [isRedirect, setIsRedirect] = useState(false);
    let [url, setUrl] = useState('/discounts/');
    let [takenBooks, setTakenBooks] = useState([]);
    let countTakenBooks = 0;
    let [error,setError] = useState({
        errorDate : false
    });

    useEffect(() => {
        if(id !== undefined && discount.id === '') {
            getDiscount(id);
        }
    }, [takenBooks]);


    function isValid() {
        let isValid = true;
        let date1 = new Date(discount.startDate);
        let date2 = new Date(discount.endDate);
        if(!(date2 > date1)) {
            isValid = false;
            setError({...error, errorDate: true});
        }
        if(discount.books.length === 0) {
            isValid = false;
            alert(DiscountLocalization.locale[lang].chooseBookMessage);
        }
        return isValid;
    }

    function getDiscount(id) {
        const url = "/discounts/";
        axios.get(url + id).then((response)=> {
            let startDate = new Date(response.data['startDate']);
            let endDate = new Date(response.data['endDate']);
            let offset = startDate.getTimezoneOffset();
           setDiscount({
               id : response.data['id'],
               name : response.data['name'],
               books : response.data['books'],
               discountFactor: response.data['discountFactor'],
               startDate: new Date(startDate.getTime() - (offset * 60 * 1000))
                   .toISOString()
                   .split('T')[0],
               endDate: new Date(endDate.getTime() - (offset * 60 * 1000))
                   .toISOString()
                   .split('T')[0],
           })
        }).catch(() => {
            setUrl("/404");
            setIsRedirect(true)
        })
    }

    function updateSearch(e) {
        setSearchString(e.target.value);
        findBooks()
    }

    function findBooks() {
        axios.get('/books/search?searchString=' + searchString)
            .then((response) => {
                setBooks(response.data)
            });
    }

    function saveDiscount(e) {
        e.preventDefault();
        if(isValid()) {
            let check = checkBooksOnDiscount();
            check.then(() => {
                if(countTakenBooks === 0) {
                    console.log(discount)
                    axios.post("/discounts", discount)
                        .then((response) => {
                            setUrl("/discounts/" + response.data);
                            setIsRedirect(true);
                        })
                } else {
                    turnBookPanel();
                }
            })
        }
    }

    function changeSale(e) {
        e.preventDefault();
        if (isValid()) {
            e.preventDefault();
            let check = checkBooksOnDiscount();
            check.then(() => {
                if(countTakenBooks === 0) {
                    let url = "/discounts/"
                    axios.patch(url + id, discount)
                        .then(() => {
                            setUrl("/discounts/" + id)
                            setIsRedirect(true);
                        })
                } else {
                    turnBookPanel();
                }
            })
        }
    }

    function changeDate(e) {
        let field = e.target.name;
        setDiscount({
            ...discount,
           [field] : e.target.value
        })
    }

    function turnBookPanel() {
        const overlay= document.querySelector(".overlay")
        const panel= document.querySelector(".search_panel")
        panel.classList.toggle("panel_hidden")
        overlay.classList.toggle("panel_hidden")
    }

    function addBookToDiscount() {
        const list = document.getElementById('search_result_datalist');
        const searcher = document.querySelector('.input_search_connection');
        let index = list.options.namedItem(searcher.value).getAttribute('data-index');
        let check = false;
        discount.books.filter((book)=> {
            if(book.id === books[index].id) {
                check = true;
            }
        })
        if(!check) {
            setDiscount({
                ...discount,
                books : [...discount.books, books[index]]
            })
        } else {
            alert(DiscountLocalization.locale[lang].alreadyTaken);
        }
    }

    function deleteBookFromSale(e) {
        let indexBook = +e.target.dataset.index;
        setDiscount({
            ...discount,
            'books': discount.books.filter(function(f, index) {
                return index !== indexBook
            })
        })
    }

    async function checkBooksOnDiscount() {
        let onDiscountBooks = [];
        for(const book of discount.books){
            await axios.get("/discounts/check?".concat("id=", book.id,
                "&startDate=", discount.startDate,
                "&endDate=", discount.endDate, id === undefined ? '' : "&idDiscount=" + id))
                .then((response) => {
                    let isOnDiscount = response.data;
                    if(isOnDiscount) {
                        onDiscountBooks.push(book.id);
                    }
                });
        }
        countTakenBooks = onDiscountBooks.length;
        setTakenBooks(onDiscountBooks);
    }

    if(isRedirect) {
        return <Redirect to={url}/>
    }

    if(!AuthorizationService.currentUserHasRole("ROLE_ADMIN")) {
        return <Redirect to={"/"}/>
    }

    return(
        <div>
            <form className={"book_form"}
                  onSubmit={id === undefined ? saveDiscount : changeSale}>
                <label>
                    {DiscountLocalization.locale[lang].name}
                </label>
                <input
                    value={discount.name}
                    onChange={changeDate}
                    name={"name"}
                    pattern={"[a-zA-ZА-ЯЁа-яё]{2,}"}
                    title={validationLocalization.locale[lang].discountNameValidation}
                required
                />
                <label>
                    {DiscountLocalization.locale[lang].startDate}
                </label>
                <input
                    onChange={changeDate}
                    name={"startDate"}
                    required
                    value={discount.startDate}
                    type={"date"}/>
                <label>
                    {DiscountLocalization.locale[lang].endDate}
                </label>
                <input
                    onChange={changeDate}
                    name={"endDate"}
                    required
                    value={discount.endDate}
                    type={"date"}/>
                {error.errorDate && (
                    <div className={"error_validation"}>
                        {DiscountLocalization.locale[lang].warnDateMessage}
                    </div>
                )}
                <label>
                    {DiscountLocalization.locale[lang].discountFactor}
                </label>
                <input
                    onChange={changeDate}
                    value={discount.discountFactor}
                    pattern={"\\d+(\\.\\d{1,2})?"}
                    title={validationLocalization.locale[lang].discountNameValidation}
                    name={"discountFactor"}
                    required
                />
                <div className={"overlay panel_hidden"} onClick={turnBookPanel}> </div>
                <label>
                    {DiscountLocalization.locale[lang].books}
                </label>
                <div className={"overlay panel_hidden"}
                     onClick={turnBookPanel}>
                </div>
                <div className={"search_panel panel_hidden"}>
                    <div className={"search_container"}>
                        <input className={"input_search_connection"}
                               list={"search_result_datalist"}
                               onChange={updateSearch}
                        />
                        <datalist id="search_result_datalist">
                            {books.map((book, index) => (
                                <option data-index={index}
                                        key={index}
                                        name={book.id + " " + book.name}
                                        value={book.id + " " + book.name}/>
                            ))}
                        </datalist>
                        <input type={"button"}
                               value={DiscountLocalization.locale[lang].addBtn}
                               onClick={addBookToDiscount}
                              />
                    </div>
                    <div className={"search_list"}>
                        {discount.books.map((book, index) => (
                            <div className={"search_item"} key={book.id}>
                                <p>{book.id} {book.name}</p>
                                <input type="button"
                                       value={DiscountLocalization.locale[lang].deleteBtn}
                                       className={"action_btn"}
                                       onClick={deleteBookFromSale} data-index={index}/>
                                <p id={"book_" + book.id}> </p>
                                {takenBooks.includes(book.id) && (
                                    <p>
                                        value={DiscountLocalization.locale[lang].alreadyOnDiscountBook}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <input type={"button"}
                       className={"action_btn"}
                       value={DiscountLocalization.locale[lang].chooseBookBtn}
                       onClick={turnBookPanel}/>
                    <input
                        type={"submit"} className={"action_btn"}
                        value={DiscountLocalization.locale[lang].saveBtn}/>
            </form>
        </div>
    )
}

export default DiscountForm