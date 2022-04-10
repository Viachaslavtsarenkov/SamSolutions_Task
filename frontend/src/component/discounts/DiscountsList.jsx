import {Link, Redirect, useHistory} from "react-router-dom";
import Pagination from "../commom/Pagination";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Util from "../../service/Util";
import AuthorizationService from "../../service/AuthorizationService";
import loading from "../../icon/loading.gif";
import DiscountLocalization from "../localization/DiscountLocalization";
import LangUtil from "../../service/LangUtil";

function DiscountsList() {

    const history = useHistory()
    let [discounts, setDiscounts] = useState([{}])
    let [totalPages, setTotalPages] = useState(-1);
    let [page, setPage] = useState(Util.getPage());
    let [lang] = useState(LangUtil.getLang())

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
                {DiscountLocalization.locale[lang].addBtn}
            </Link>
            {totalPages > 0 && (
                <div>
                    <table className={"book_list_table"}>
                        <thead>
                            <tr>
                                <th>
                                    {DiscountLocalization.locale[lang].id}
                                </th>
                                <th>
                                    {DiscountLocalization.locale[lang].name}
                                </th>
                                <th>
                                    {DiscountLocalization.locale[lang].startDate}
                                </th>
                                <th>
                                    {DiscountLocalization.locale[lang].endDate}
                                </th>
                                <th>
                                    {DiscountLocalization.locale[lang].discountFactor}
                                </th>
                                <th>
                                    {DiscountLocalization.locale[lang].count}
                                </th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map((discount) => (
                                <tr key={discount.id}>
                                    <td>{discount.id}</td>
                                    <td>{discount.name}</td>
                                    <td>{new Date(discount.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(discount.endDate).toLocaleDateString()}</td>
                                    <td>{discount.discountFactor}</td>
                                    <td>{discount.books.length}</td>
                                    <td>
                                        <Link to={{
                                            pathname : "/discounts/" + discount.id
                                        }}>
                                            {DiscountLocalization.locale[lang].seeBtn}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            )}
            {totalPages === 0 && (
                <div className={"empty_list"}>Список скидок пуст</div>
            )}
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

export default DiscountsList;