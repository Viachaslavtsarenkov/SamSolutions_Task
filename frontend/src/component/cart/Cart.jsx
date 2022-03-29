import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../styles/common/cart.sass'
import {Link, Redirect} from "react-router-dom";
import AuthorizationService from "../../service/AuthorizationService";
import UtilCart from "../../service/UtilCart";

function Cart() {
    let [cart, setCart] = useState([]);
    let [cartLocal, setCartLocal] = useState(UtilCart.getFromCart);
    let [order, setOrder] = useState([]);
    let [isRedirect, setIsRedirect] = useState(false);
    let [url, setUrl] = useState("/");

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

    function deleteFromCart(e) {
        localStorage.setItem("books", cartLocal
            .replace("*" + e.target.value + "*", "*"));
        setCartLocal(localStorage.getItem("books"));
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
                    <div className={"cart_item"}>
                        {book.inStock && (
                            <input type={"checkbox"} onClick={chooseBook} value={book.id}/>
                        )}

                        <img src={"data:image/jpg;base64," + book.image.imageContent} width={80} />
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
                                <div className={"code"}>
                                    Нет в наличии
                                </div>
                            )}
                            <button className={"action_btn"}
                                    onClick={() => {
                                        UtilCart.removeFromCart(book.id);
                                        setCartLocal(UtilCart.getFromCart())
                                    }}
                                    value={book.id}>
                                Удалить из корзины
                            </button>
                        </div>
                    </div>
                ))}
                {order.length !== 0 && (
                    <button className={"action_btn"} onClick={createOrder}>
                        Оформить заказ
                    </button>)}
            </div>
            )}

            {cart.length === 0 && (
                <div className={"empty_cart"}>
                    Нет товаров в корзине
                </div>
            )}
        </div>
    )
}

export default Cart;