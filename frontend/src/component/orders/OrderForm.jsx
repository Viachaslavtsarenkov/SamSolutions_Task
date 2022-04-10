import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../styles/order/order.sass'
import {Link, Redirect} from "react-router-dom";
import AuthorizationService from "../../service/AuthorizationService";
import OrderLocalization from "../localization/OrderLocalization";

function OrderForm(props) {

    let[order, setOrder] = useState({})
    let[isSaved] = useState(false);
    let[url] = useState('');
    let[books] = useState(props.location.search);
    let[lang] = useState("ru");

    useEffect(() => {
       getOrderBooks();
    }, [])

    function getOrderBooks() {
        axios.get('/orders/books' + books)
            .then((response) => {
                setOrder(response.data)
        })
    }

    function saveOrder(e) {
        e.preventDefault();
        axios.post("/orders", order)
            .then((response) => {
                window.location.assign(response.data['paymentUrl'])
            })
    }

    function setAddress(e) {
        setOrder({
            ...order,
            address : e.target.value
        })
    }

    if(isSaved) {
        return <Redirect to={url}/>
    }

    if(!AuthorizationService.currentUserHasRole("ROLE_CUSTOMER")) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={"wrapper"}>
            <div className={"order_container"}>
                <h3>
                    {OrderLocalization.locale[lang].placeOrderTitle}
                </h3>
                <form onSubmit={saveOrder}>
                    <textarea name={"address"}
                              placeholder={"Введите адрес"}
                              maxLength={200}
                              className={"address"}
                              onChange={setAddress}
                              required
                    />
                    <p>
                        {OrderLocalization.locale[lang].books}
                    </p>
                    <div className={"order_books_list"}>
                        {order['orderBooks'] !== undefined
                        && order['orderBooks'].map((book) => (
                            <div>
                                <Link to={{
                                    pathname : "/books/" + book.id
                                }}>
                                    {book.name}
                                </Link>
                                <span>&nbsp;&nbsp;&nbsp;
                                {book['discounts'].length === 0 ?
                                    book.price : book['discountPrice']}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3>
                            <span>
                                {OrderLocalization.locale[lang].amount}
                            </span>
                            &nbsp;&nbsp;
                            {order['amount']}
                        </h3>
                    </div>
                    <Link to={"/cart"} className={"change_order_btn"}>
                        {OrderLocalization.locale[lang].changeOrderBtn}
                    </Link><br/>
                    <input
                        className={"action_btn"}
                        type={"submit"}
                        onClick={saveOrder}
                        value={OrderLocalization.locale[lang].placeOrderBtn}/>
                </form>

            </div>
        </div>
    )
}

export default OrderForm;