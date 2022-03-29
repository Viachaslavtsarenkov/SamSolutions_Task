import {useEffect, useState} from "react";
import {Redirect, useHistory, useParams} from "react-router-dom";
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
        <>
            <Redirect to={"/profile"} />
        </>
    )
};

export default Payment;