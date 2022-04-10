import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../styles/common/cart.sass'
import {Redirect} from "react-router-dom";
import AuthorizationService from "../../service/AuthorizationService";
import UtilCart from "../../service/UtilCart";
import noPic from "../../icon/nopic.png";
import BookLocalization from "../localization/BookLocalization";
import LangUtil from "../../service/LangUtil";

function Cart(props) {

    let [cart, setCart] = useState([]);
    let [cartLocal, setCartLocal] = useState(UtilCart.getFromCart);
    let [order, setOrder] = useState([]);
    let [isRedirect, setIsRedirect] = useState(false);
    let [url, setUrl] = useState("/");
    let [lang] = useState(LangUtil.getLang())

    useEffect(() => {
        getCart();
    },[cartLocal, order])


    function getCart() {
        let url = "/cart?books=";
        axios.get(url + cartLocal)
            .then((response) =>{
            setCart(response.data);
        })
    }

    function chooseBook(e) {
        if(e.target.checked) {
            setOrder([...order, +e.target.value])
        } else {
            setOrder(order.filter((el) =>  +el !== +e.target.value))
        }
    }

    function createOrder() {
        setUrl('/orders/new?'.concat('books=',order.join(",")));
        setIsRedirect(true);
    }

    if(isRedirect) {
        return  <Redirect to={url}/>
    }
    if(AuthorizationService.currentUserHasRole("ROLE_ADMIN")) {
        return  <Redirect to={"/"}/>
    }
    return(
        <div className={"wrapper"}>
            {cart.length !== 0 && (
            <div className={"cart_container"}>
                {cart.map((book) => (
                    <div className={"cart_item"} key={book.id}>
                        {book.inStock && (
                            <input type={"checkbox"} onClick={chooseBook} value={book.id}/>
                        )}

                        <img src={book.image.imageContent === null ?
                            noPic : "data:image/jpg;base64," + book.image.imageContent} height={100} alt={"book"}/>
                        <div className={"cart_item_description"}>
                            <h2>{book.name}</h2>
                            {book['discounts'].length === 0 && (
                                <div className={"cart_price"}>
                                    {book.price}
                                </div>
                            )}
                            {book['discounts'].length !== 0 && (
                                <div className={"sale_price_container"}>
                                    <div className={"cart_price_sale"}>
                                        {book.price}
                                    </div>
                                    <div className={"cart_price"}>
                                        {book['discountPrice']}
                                    </div>
                                </div>
                            )}
                            {!book.inStock && (
                                <div className={"code"} align={"center"}>
                                    {BookLocalization.locale[lang].notInStock}
                                </div>
                            )}
                            <button className={"action_btn"}
                                    onClick={() => {
                                        UtilCart.removeFromCart(book.id);
                                        setCartLocal(UtilCart.getFromCart());
                                        props.cart();
                                    }}
                                    value={book.id}>
                                {BookLocalization.locale[lang].removeFromCart}
                            </button>
                        </div>
                    </div>
                ))}
                {order.length !== 0 && (
                    <button className={"action_btn"} onClick={createOrder}>
                        {BookLocalization.locale[lang].placeOrderBtn}
                    </button>)}
            </div>
            )}

            {UtilCart.getCountFromCart() === 0 && (
                <div className={"empty_list"}>
                    {BookLocalization.locale[lang].emptyCart}
                </div>
            )}
        </div>
    )
}

export default Cart;