import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../styles/order/order.sass'
import {Link, Redirect} from "react-router-dom";
import AuthorizationService from "../../service/AuthorizationService";

function OrderForm(props) {

    let[order, setOrder] = useState({})
    let[isSaved] = useState(false);
    let[url] = useState('');
    let[books] = useState(props.location.search);

    useEffect(() => {
       getOrderBooks();
    }, [])

    function getOrderBooks() {
        axios.get('/orders/books' + books)
            .then((response) => {
                setOrder(response.data)
                console.log(response.data)
        }).catch(() => {
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
                <h3>Оформление заказа</h3>
                <form onSubmit={saveOrder}>
                    <textarea name={"address"}
                              required
                              className={"address"}
                              minLength={10}
                              onChange={setAddress}
                              value={order['address']}/>
                    <p>Товары</p>
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
                    <div><span>Итого</span>&nbsp;&nbsp;{order['amount']}</div>
                    <Link to={"/cart"} className={"change_order_btn"}>
                        Изменить заказ
                    </Link><br/>
                    <input
                        className={"action_btn"}
                        type={"submit"}
                        onClick={saveOrder} value={"Оформить заказ"}/>
                </form>

            </div>
        </div>
    )
}

export default OrderForm;