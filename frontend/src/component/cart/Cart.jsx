import {useEffect, useState} from "react";
import axios from "axios";

function Cart() {
    let [cart, setCart] = useState({books : [21,22]});
    let [cartLocal, setCartLocal] = useState(localStorage.getItem("books"));
    let [c, setC] = useState([]);

    useEffect(() =>{
        getCart();
    },[cartLocal])

    function getCart() {
        let url = "/cart?books=";
        console.log(url + cartLocal)
        axios.get(url + cartLocal)
            .then((response) =>{
            console.log(response.data)
        }).catch((error) => {
            console.log(error.response)
        })
    }

    return(
        <div>g

        </div>
    )
}

export default Cart;