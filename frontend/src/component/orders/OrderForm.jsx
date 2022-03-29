import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../styles/order/order.sass'
import {Link, Redirect, useHistory, useParams} from "react-router-dom";
import AuthorizationService from "../../service/AuthorizationService";

function OrderForm(props) {

    const history = useHistory();
    let[order, setOrder] = useState({})
    let[isSaved, setIsSaved] = useState(false);
    let[url, setUrl] = useState('');
    let[books, setBooks] = useState(props.location.search);

    useEffect(() => {
       getOrderBooks();
    }, [])

    function getOrderBooks() {
        axios.get('/orders/books' + books)
            .then((response) => {
                setOrder(response.data)
                console.log(response.data)
        }).catch((error) => {
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
                        && order['orderBooks'].map((book, index) => (
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
                    </Link><br></br>
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