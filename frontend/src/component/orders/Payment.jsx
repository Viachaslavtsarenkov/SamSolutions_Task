import {useEffect, useState} from "react";
import {Link, Redirect, useHistory, useParams} from "react-router-dom";
import axios from "axios";

function  Payment() {

    const queryParams = new URLSearchParams(window.location.search)
    const paymentId = queryParams.get("paymentId")
    const payerId = queryParams.get("PayerID")

    useEffect(() => {
        orderPayment();
    }, [])

    function orderPayment() {
        axios.get("/orders/payment?paymentId=" + paymentId+ "&payerId=" + payerId)
            .then((response) => {
        })
    }
    return (
        <div className={"wrapper"}>
            <div>
                <p>Оплата пошла успешно</p>
                <Link to={"/profile"}>
                    Перейти в личный кабинет
                </Link>
            </div>
        </div>
    )
};

export default Payment;