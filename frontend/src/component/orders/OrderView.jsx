import {Link, useParams, Redirect} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import AuthorizationService from "../../service/AuthorizationService";
import OrderLocalization from "../localization/OrderLocalization";

function OrderView() {

    let {id} = useParams();
    const [order, setOrder] = useState()
    let [status] = useState('');
    let [isSaved, setIsSaved] = useState(false);
    let [isRedirect, setIsRedirect] = useState(false);
    let [url, setUrl] = useState("");
    let searchUrl = "";
    let lang = useState("ru");

    useEffect(() => {
        if(AuthorizationService.currentUserHasRole("ROLE_CUSTOMER")) {
            searchUrl = "/profile/order/" + id;
        } else {
            searchUrl = "/orders/" + id;
        }
        findOrder()
    }, [isSaved])

    function findOrder() {
        axios.get(searchUrl)
            .then((response) => {
            setOrder(response.data);
            setIsSaved(false);
        }).catch(() => {
            setUrl("/404")
            setIsRedirect(true);
        })

    }

    function changeStatus() {
        const newStatus = document.getElementById("order_status");
        setOrder({
            ...order,
            status : newStatus.value
        })
    }

    function saveStatus() {
        setOrder({
            ...order,
            status : status
        })
        axios.patch('/orders/' + order['id'], order)
            .then(() => {
            setIsSaved(true);
        })
    }

    if(isRedirect) {
        return <Redirect to={url}/>
    }

    return (
        <div>
            {order !== undefined && (
            <div className={"order_container_view"}>
                <h2>
                    {OrderLocalization.locale[lang].orderInformation}
                </h2>
                <p className={"code"}>
                    <span>
                        {OrderLocalization.locale[lang].orderCode}
                    </span>
                    {order['id']}
                </p>
                <p>
                    <span>
                        {OrderLocalization.locale[lang].orderDate} :
                    </span>
                    {new Date(order['date']).toLocaleDateString()}
                </p>
                <p>
                    <span>{OrderLocalization.locale[lang].orderStatus} : </span>
                    {OrderLocalization.locale[lang][order['status']]}

                </p>
                <p>
                    <span>{OrderLocalization.locale[lang].paymentStatus}:</span>
                    {OrderLocalization.locale[lang][order['paymentStatus']]}
                </p>
                <p>
                    <span>{OrderLocalization.locale[lang].customer}:</span>
                    {order['user'] !== undefined && (
                    <Link to={{
                        pathname : '/users/' + order['user']['id']
                    }}>
                        {order['user']['surname']} {order['user']['name']} {order['user']['patronymic']}
                    </Link>)
                    }
                    <div className={"order_book_list"}>
                        <h4>
                            {OrderLocalization.locale[lang].bookList}
                        </h4>
                        {order['orderBooks'].map((book) => (
                            <div>
                                <Link to={{
                                    pathname: "/books/" + book.id
                                }}>
                                    {book.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <p>
                        <span>
                            {OrderLocalization.locale[lang].amount}
                        </span>
                        {order['amount']}
                    </p>
                </p>
                {AuthorizationService.currentUserHasRole("ROLE_ADMIN") && (
                    <div>
                        <select id={"order_status"} onChange={changeStatus}>
                            <option value={"IN_PROCESSING"}>
                                {OrderLocalization.locale[lang].IN_PROCESSING}
                            </option>
                            <option value={"SENT"}>
                                {OrderLocalization.locale[lang].SENT}
                            </option>
                            <option value={"RECEIVED"}>
                                {OrderLocalization.locale[lang].RECEIVED}
                            </option>
                        </select>
                        <button onClick={saveStatus}>
                            {OrderLocalization.locale[lang].save}
                        </button>
                    </div>
                )}
            </div>
            )}
        </div>
    )
}
export default OrderView;