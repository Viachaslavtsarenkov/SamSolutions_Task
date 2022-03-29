import {useHistory} from "react-router-dom";

class UtilCart {
    addToCart(id) {
        let cartBooks = localStorage.getItem("books");
        if(cartBooks === null) {
            cartBooks = "*" + id + "*";
        } else {
            cartBooks = cartBooks + id + "*";
        }
        localStorage.setItem("books", cartBooks)
    }

    getFromCart() {
        return localStorage.getItem("books");
    }

    removeFromCart(id) {
        let cartBooks = localStorage.getItem("books");
        localStorage.setItem("books", cartBooks
            .replace("*" + id + "*", "*"));
    }

    checkInCart(id) {
        let cartBooks = localStorage.getItem("books");
        return cartBooks.includes("*" + id + "*")
    }

    getCountFromCart() {
        let cartBooks = localStorage.getItem("books");
        let count = 0;
        if(cartBooks !== null) {
            cartBooks.split("*").forEach((el) => {
                if(el !== "") {
                    ++count;
                }
            })
        }

        return count;
    }
}

export default new UtilCart();