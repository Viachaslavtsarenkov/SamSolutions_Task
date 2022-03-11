import {useEffect, useState} from "react";
import axios from "axios";
import '../../styles/common/cart.sass'

function Cart() {
    let [cart, setCart] = useState([]);
    let [cartLocal, setCartLocal] = useState(localStorage.getItem("books"));

    useEffect(() =>{
        getCart();
    },[cartLocal])

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

    return(
        <div className={"wrapper"}>
            {cart.length !== 0 && (
            <div className={"cart_container"}>
                {cart.map((book) => (
                    <div className={"cart_item"}>
                        <input type={"checkbox"}/>
                        <img src={book.imageName} width={80} />
                        <div className={"cart_item_description"}>
                            <h2>{book.name}</h2>
                            <div className={"cart_price"}>{book.price}р</div>
                            <button className={"action_btn"} onClick={deleteFromCart} value={book.id}>
                                Удалить из корзины
                            </button>
                        </div>
                    </div>
                ))}
                <button className={"action_btn cart_order_btn"} onClick={deleteFromCart}>
                    Оформить заказ
                </button>
            </div>
            )}

            {cart.length == 0 && (
                <div className={"empty_cart"}>
                    Нет товаров в корзине
                </div>
            )}
        </div>
    )
};
export default Cart;