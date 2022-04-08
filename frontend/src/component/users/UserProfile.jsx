import {Link, Redirect, useParams} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import '../../styles/user/user.sass';
import AuthorizationService from "../../service/AuthorizationService";

function UserProfile() {

    let {id} = useParams();
    let [user, setUser] = useState();
    let [isRedirect, setIsRedirect] = useState(false);

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
                <h2>Информация о пользователе</h2>
                <div className={"user_info"}>
                    <p><span>Имя:</span> {user['name']}</p>
                    <p><span>Фамилия:</span> {user['surname']}</p>
                    <p><span>Отчество:</span> {user['patronymic']}</p>
                    <p><span>Email:</span> {user['email']}</p>
                    <p><span>Номер телефона:</span> {user['phoneNumber']}</p>
                </div>
                {user['orders'].length !== 0 && (
                <div className={"user_orders"}>
                    <h2>Заказы</h2>
                    <table className={"book_list_table"}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Дата</th>
                                <th>Статус заказа</th>
                                <th>Сумма</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                        { user['orders'].map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td>
                                        {order['paymentStatus'] === "NO_PAID" && (
                                            <a href={order['paymentUrl']}>
                                                Оплатить
                                            </a>
                                        )}
                                        {order['paymentStatus'] !== "NO_PAID" && (
                                            <p>Оплачено</p>
                                        )}
                                    </td>
                                    <td>{order.amount}</td>
                                    <td>
                                        <Link to={{
                                            pathname : "/orders/" + order.id
                                        }}> Посмотреть</Link>
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