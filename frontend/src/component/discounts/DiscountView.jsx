import {Link, Redirect, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../styles/discounts/discount.sass'
import AuthorizationService from "../../service/AuthorizationService";

function DiscountView() {

    let {id} = useParams();
    let [discount, setDiscount] = useState({books : []});
    let [isRedirect, setIsRedirect] = useState(false);
    let [url, setUrl] = useState('/discounts');

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
                alert("Удалено");
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
                    <p className={"code"}>код скидки {discount.id}</p>
                    <div className={"discount_description"}>
                        <div>
                            Дата начала скидки
                            <span>
                                {new Date(discount.startDate).toLocaleDateString()}
                            </span>
                        </div>
                        <div>
                            Дата окончания скидки
                            <span>
                                {new Date(discount.endDate).toLocaleDateString()}
                            </span>
                        </div>
                        <div>
                            Коэффициент скидки
                            <span>
                            {discount.discountFactor}
                            </span>
                        </div>
                    </div>
                    <div>
                        <button
                            className={"action_delete_btn"}
                            onClick={deleteDiscount}
                        >
                            Удалить
                        </button>
                        <Link className={"action_edit_btn"}
                              to={{
                                  pathname : "/discounts/" + discount.id + "/edit"
                              }}
                        >
                            Редактировать
                        </Link>
                    </div>
                </div>
                {discount.books.length !== 0 && (
                    <div className={"discount_books_container"}>
                        <h3>Книги</h3>
                        {discount.books.length !== 0 && discount.books.map((book) => (
                            <div className={"discount_book_item"}>
                                <div className={"code"}>Код книги <span>{book.id}</span></div>
                                <div>Название <span>{book.name}</span></div>
                            </div>
                        ))}
                    </div>)}
            </div>)};
        </div>
    )
}
export default DiscountView;