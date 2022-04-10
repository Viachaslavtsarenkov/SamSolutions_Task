import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, Redirect, useHistory} from "react-router-dom";
import Pagination from "../commom/Pagination";
import Util from "../../service/Util";
import AuthorizationService from "../../service/AuthorizationService";
import loading from "../../icon/loading.gif";
import UserLocalization from "../localization/RegistrationLocalization";
import User from "./User";
import LangUtil from "../../service/LangUtil";
function UserList() {

    const history = useHistory();
    let [users, setUsers] = useState([{}]);
    let [totalPages, setTotalPages] = useState(-1);
    let [page, setPage] = useState(Util.getPage());
    let [lang] = useState(LangUtil.getLang())

    useEffect(() => {
        if(page !== 0) {
            toPage(page);
        }
        getUsers();
    }, [page]);

    function getUsers() {
        axios.get("/users?" + Util.getPageParam())
            .then((response) => {
            setUsers(response.data['users']);
            setTotalPages(response.data['totalPages']);
        })
    }

    function toPage(el) {
        Util.setUrl(Util.setPageParam(el),history)
        setPage(el);
    }

    if(!AuthorizationService.currentUserHasRole("ROLE_ADMIN")) {
        return <Redirect to={"/"}/>
    }

    return (
        <div>
            {totalPages > 0 && (
            <table className={"book_list_table"}>
                <tr>
                    <th>
                        {UserLocalization.locale[lang].id}
                    </th>
                    <th>
                        {UserLocalization.locale[lang].user}
                    </th>
                    <th>
                        {UserLocalization.locale[lang].email}
                    </th>
                    <th>
                        {UserLocalization.locale[lang].status}
                    </th>
                    <th>
                        {UserLocalization.locale[lang].status}
                    </th>
                </tr>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name} {user.surname} {user.patronymic}</td>
                        <td>{user.email}</td>
                        <td>{UserLocalization.locale[lang][user.status]}</td>
                        <td>
                            <Link to={{
                                pathname : "/users/" + user.id
                            }}>
                                {UserLocalization.locale[lang].see}
                            </Link>
                        </td>
                    </tr>
                ))}
            </table>)}
            {totalPages === -1 && (
                <div className={"loading_container"}>
                    <img src={loading} width={50} alt={"loading"}/>
                </div>
            )}
            {totalPages > 0 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    toPage={toPage}
                />
            )}
        </div>
    )
}
export default UserList;