import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import Pagination from "../commom/Pagination";
import Util from "../../service/Util";

function UserList() {

    const history = useHistory();
    let [users, setUsers] = useState([{}]);
    let [totalPages, setTotalPages] = useState(0);
    let [page, setPage] = useState(Util.getPage());

    useEffect(() => {
        if(page !== 0) {
            toPage(page);
        }
        getUsers();
    }, [page]);

    function getUsers() {
        axios.get("/users?" + Util.getPageParam())
            .then((response) => {
                console.log(response.data['users'])
            setUsers(response.data['users']);
            setTotalPages(response.data['totalPages']);
        })
    }

    function toPage(el) {
        Util.setUrl(Util.setPageParam(el),history)
        setPage(el);
    }

    return (
        <div>
            <table className={"book_list_table"}>
                <tr>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Email</th>
                    <th>Номер телефона</th>
                    <th>Статус</th>
                    <th>Действие</th>
                </tr>
                {users.map((user, index) => (
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.name} {user.surname} {user.patronymic}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.status}</td>
                        <td>
                            <Link to={{
                                pathname : "/users/" + user.id
                            }}> Посмотреть</Link>
                        </td>
                    </tr>
                ))}
            </table>
            <Pagination
                page={page}
                totalPages={totalPages}
                toPage={toPage}
            />
        </div>
    )
}
export default UserList;