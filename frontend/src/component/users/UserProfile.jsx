import {Link, Redirect, useParams} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import '../../styles/user/user.sass';
import AuthorizationService from "../../service/AuthorizationService";
import userLocalization from "../localization/RegistrationLocalization";
import OrderLocalization from "../localization/OrderLocalization";
import LangUtil from "../../service/LangUtil";

function UserProfile() {

    let {id} = useParams();
    let [user, setUser] = useState();
    let [isRedirect, setIsRedirect] = useState(false);
    let [lang] = useState(LangUtil.getLang());

    useEffect(() => {
        getProfile();
    }, [])

    function getProfile() {
        let url = "/users/" + id;
        if(AuthorizationService.currentUserHasRole("ROLE_CUSTOMER")) {
            url = "/profile";
        }
        axios.get(url)
            .then((response) => {
                 setUser(response.data)
            }).catch(() => {
                setIsRedirect(true);
        })
    }

    if(isRedirect) {
        return <Redirect to={"/404"}/>
    }

    if(AuthorizationService.getCurrentUser() === undefined) {
        return <Redirect to={"/"}/>
    }

    return (
        <div>
            {user !== undefined && (
            <div className={"user_container"}>
                <h2>
                    {userLocalization.locale[lang].userInformation}
                </h2>
                <div className={"user_info"}>
                    <p>
                        <span>
                        {userLocalization.locale[lang].surname}: </span>
                         {user['surname']}
                    </p>
                    <p>
                        <span>
                        {userLocalization.locale[lang].name}:
                        </span> {user['name']}
                    </p>
                    <p><span>
                        {userLocalization.locale[lang].patronymic}: </span> {user['patronymic']}</p>
                    <p>
                        <span>
                        {userLocalization.locale[lang].email}: </span>
                        {user['email']}
                    </p>
                    <p>
                        <span>
                        {userLocalization.locale[lang].phone}: </span>
                        {user['phoneNumber']}</p>
                </div>
                {user['orders'].length !== 0 && (
                <div className={"user_orders"}>
                    <h2>Заказы</h2>
                    <table className={"book_list_table table_width"} >
                        <thead>
                            <tr>
                                <th>
                                    {OrderLocalization.locale[lang].id}
                                </th>
                                <th>{OrderLocalization.locale[lang].date}</th>
                                <th>{OrderLocalization.locale[lang].paymentStatus}</th>
                                <th>{OrderLocalization.locale[lang].amount}</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                        { user['orders'].map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td>
                                        {order['paymentStatus'] === "NO_PAID"
                                        && AuthorizationService.currentUserHasRole("ROLE_CUSTOMER") && (
                                            <a href={order['paymentUrl']}>
                                                {OrderLocalization.locale[lang].payBtn}
                                            </a>
                                        )}
                                        {order['paymentStatus'] === "NO_PAID"
                                        && !AuthorizationService.currentUserHasRole("ROLE_CUSTOMER") && (
                                            <a href={order['paymentUrl']}>
                                                {OrderLocalization.locale[lang].NO_PAID}
                                            </a>
                                        )}
                                        {order['paymentStatus'] !== "NO_PAID" && (
                                            <p>
                                                {OrderLocalization.locale[lang].PAID}
                                            </p>
                                        )}
                                    </td>
                                    <td>{order.amount}</td>
                                    <td>
                                        <Link to={{
                                            pathname : "/orders/" + order.id
                                        }}>
                                            {OrderLocalization.locale[lang].see}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>)}
            </div>
            )}
        </div>
    )
}
export default UserProfile;