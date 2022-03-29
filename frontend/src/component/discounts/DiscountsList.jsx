import {Link, Redirect, useHistory} from "react-router-dom";
import Pagination from "../commom/Pagination";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Util from "../../service/Util";
import AuthorizationService from "../../service/AuthorizationService";

function DiscountsList() {

    const history = useHistory()
    let [discounts, setDiscounts] = useState([{}])
    let [totalPages, setTotalPages] = useState(0);
    let [page, setPage] = useState(Util.getPage());

    useEffect(() => {
        if(page !== 0) {
            toPage(page);
        }
        getDiscounts();
    }, [page])

    function toPage(el) {
        Util.setUrl(Util.setPageParam(el),history)
        setPage(el);
    }

    function getDiscounts() {
        axios.get("/discounts?" + Util.getPageParam())
            .then((response) => {
                setDiscounts(response.data['discounts']);
                setTotalPages(response.data['totalPages']);
            })
    }

    if(!AuthorizationService.currentUserHasRole("ROLE_ADMIN")) {
        return <Redirect to={"/"}/>
    }

    return (
        <div className={"wrapper"}>
            <Link to={"/discounts/new"}
                  className={"add_btn"}>
                Добавить
            </Link>
            {totalPages !== 0 && (
                <div>
                    <table className={"book_list_table"}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название скидки</th>
                                <th>День начала скидки</th>
                                <th>День окончания</th>
                                <th>Коэффициент</th>
                                <th>Количество книг</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map((discount, index) => (
                                <tr>
                                    <td>{discount.id}</td>
                                    <td>{discount.name}</td>
                                    <td>{new Date(discount.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(discount.endDate).toLocaleDateString()}</td>
                                    <td>{discount.discountFactor}</td>
                                    <td>f</td>
                                    <td>
                                        <Link to={{
                                            //todo change
                                            pathname : "/discounts/" + discount.id
                                        }}> Посмотреть</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        toPage={toPage}
                    />
                </div>
            )}
            {totalPages === 0 && (
                <div>Список скидок пуст</div>
            )}
        </div>
    )
}

export default DiscountsList;