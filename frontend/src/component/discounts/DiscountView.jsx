import {Link, Redirect, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../styles/discounts/discount.sass'
import AuthorizationService from "../../service/AuthorizationService";
import DiscountLocalization from "../localization/DiscountLocalization";
import LangUtil from "../../service/LangUtil";
function DiscountView() {

    let {id} = useParams();
    let [discount, setDiscount] = useState({books : []});
    let [isRedirect, setIsRedirect] = useState(false);
    let [url, setUrl] = useState('/discounts');
    let [lang] = useState(LangUtil.getLang())

    useEffect(() => {
        findDiscount()
    }, [])


    function findDiscount() {
        axios.get("/discounts/" + id)
            .then((response) => {
            setDiscount(response.data);
        }).catch(() => {
            setUrl("/404")
            setIsRedirect(true);
        })
    }

    function deleteDiscount() {
        axios.delete("/discounts/" + id)
            .then(() => {
                alert(DiscountLocalization.locale[lang].deleteMsg);
               setUrl("/discounts");
               setIsRedirect(true);
            })
    }

    if(!AuthorizationService.currentUserHasRole("ROLE_ADMIN")) {
        return <Redirect to={"/"}/>
    }

    if(isRedirect) {
        return <Redirect to={url}/>
    }

    return(
        <div>
            {discount.id !== undefined && (
            <div>
                <div className={"discount_container"}>
                    <h2>{discount.name}</h2>
                    <p className={"code"}>
                        {DiscountLocalization.locale[lang].discountCode}
                        {discount.id}</p>
                    <div className={"discount_description"}>
                        <div>
                            {DiscountLocalization.locale[lang].startDate}
                            <span>
                                {new Date(discount.startDate).toLocaleDateString()}
                            </span>
                        </div>
                        <div>
                            {DiscountLocalization.locale[lang].endDate}
                            <span>
                                {new Date(discount.endDate).toLocaleDateString()}
                            </span>
                        </div>
                        <div>
                            {DiscountLocalization.locale[lang].discountFactor}
                            <span>
                            {discount.discountFactor}
                            </span>
                        </div>
                    </div>
                    <div>
                        <a
                            className={"action_delete_btn"}
                            onClick={deleteDiscount}
                        >
                            {DiscountLocalization.locale[lang].deleteBtn}
                        </a>
                        <Link className={"action_edit_btn"}
                              to={{
                                  pathname : "/discounts/" + discount.id + "/edit"
                              }}
                        >
                            {DiscountLocalization.locale[lang].editBtn}
                        </Link>
                    </div>
                </div>
                {discount.books.length !== 0 && (
                    <div className={"discount_books_container"}>
                        <h3>
                            {DiscountLocalization.locale[lang].books}
                        </h3>
                        {discount.books.length !== 0 && discount.books.map((book) => (
                            <div className={"discount_book_item"}>
                                <div className={"code"}>
                                    {DiscountLocalization.locale[lang].codeBook}
                                    <span> {book.id}</span></div>
                                <div>
                                    <Link to={{
                                        pathname : "/books/" + book.id
                                    }}>
                                        {book.name}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>)}
            </div>)};
        </div>
    )
}
export default DiscountView;