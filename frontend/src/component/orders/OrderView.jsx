import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import AuthorizationService from "../../service/AuthorizationService";

function OrderView() {

    let {id} = useParams();
    const [order, setOrder] = useState()
    let [status, setStatus] = useState('');
    let [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        findOrder(id)
    }, [isSaved])

    function findOrder(id) {
        axios.get("/orders/" + id)
            .then((response) => {
            setOrder(response.data);
            setIsSaved(false);
        }).catch((error) => {

        })
    }

    function changeStatus() {
        const newStatus = document.getElementById("order_status");
        setOrder({
            ...order,
            status : newStatus.value
        })
    }

    function saveStatus(e) {
        setOrder({
            ...order,
            status : status
        })
        axios.patch('/orders/' + order['id'], order)
            .then((response) => {
            setIsSaved(true);
        })
    }

    return (
        <div>
            {order !== undefined && (
            <div className={"order_container_view"}>
                <h2>Информация о заказе</h2>
                <p className={"code"}>
                    <span>
                        код заказа:
                    </span>
                    {order['id']}
                </p>
                <p>
                    <span>
                        Дата заказа:
                    </span>
                    {new Date(order['date']).toLocaleDateString()}
                </p>
                <p>
                    <span>Статус заказа:</span>
                    {order['status']}
                </p>
                <p>
                    <span>Статус оплаты:</span>
                    {order['paymentStatus']}
                </p>
                <p>
                    <span>Покупатель:</span>
                    {order['user'] !== undefined && (
                    <Link to={{
                        pathname : '/users/' + order['user']['id']
                    }}>
                        {order['user']['surname']} {order['user']['name']} {order['user']['patronymic']}
                    </Link>)
                    }
                    <div className={"order_book_list"}>
                        <h4>Список товаров</h4>
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
                            Итого:
                        </span>
                        {order['amount']}
                    </p>
                </p>
                {AuthorizationService.currentUserHasRole("ROLE_ADMIN") && (
                    <div>
                        <select id={"order_status"} onChange={changeStatus}>
                            <option value={"IN_PROCESSING"}>В обработке</option>
                            <option value={"SENT"}>Отправлен</option>
                            <option value={"RECEIVED"}>Получен</option>
                        </select>
                        <button onClick={saveStatus}>Сохранить</button>
                    </div>
                )}
            </div>
            )}
        </div>
    )
};
export default OrderView;