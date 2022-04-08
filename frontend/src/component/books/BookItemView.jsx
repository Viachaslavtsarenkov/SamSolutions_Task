import AuthorizationService from "../../service/AuthorizationService";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import noPic from '../../icon/nopic.png'
import bookLocalization from "../localization/BookLocalization";

function BookItemView(props) {

    const book = props.value;
    let [inCart, setInCart] = useState(false);
    let lang = "ru";

    useEffect(() => {
        let cart = localStorage.getItem("books");
        if(cart !== null) {
            setInCart(cart.includes("*" + book.id + "*"))
        }
    }, [inCart, book]);

    function addToCart() {
        let cartBooks = localStorage.getItem("books");
        if(cartBooks === null) {
            cartBooks = "*" + book.id + "*";
        } else {
            cartBooks = cartBooks + book.id + "*";
        }
        localStorage.setItem("books", cartBooks)
        setInCart(true);

    }

    function removeFromCart() {
        let cartBooks = localStorage.getItem("books");
        setInCart(false)
        localStorage.setItem("books", cartBooks
            .replace("*" + book.id + "*", "*"));
    }

    function deleteBook() {
        axios.delete("/books/" + book.id)
            .then(() => {
                book.inStock = true;
        })
    }

    return (
        <>
            <div className={"author_view_container"}>
                <img src={book.image.imageContent === null ? noPic :"data:image/jpg;base64," + book.image.imageContent}
                     className={"author_picture"}
                     width={500} height={500}
                     alt={"book image"}
                />
                <div className={"author_description"}>
                    <h2>{book.name}</h2>
                    {book['discounts'].length === 0 && (
                        <div className={"price"}>
                            {book.price}
                        </div>
                    )}
                    {book['discounts'].length !== 0 && (
                        <div className={"view_sale_price_container"}>
                            <div className={"view_price_sale"}>
                                {book.price}
                            </div>
                            <div className={"view_discount_price"}>
                                {book['discountPrice']}
                            </div>
                        </div>

                    )}
                    {!AuthorizationService.currentUserHasRole("ROLE_ADMIN") && (
                        <></>
                    ) && inCart === false && (
                    <input type={"button"}
                           className={"action_cart_btn"}
                           value={bookLocalization.locale[lang].addToCart}
                           onClick={()=> {
                               addToCart();
                               props.cart();
                    }}/>)}

                    {!AuthorizationService.currentUserHasRole("ROLE_ADMIN") && (
                        <></>
                    ) && inCart === true && (
                        <input type={"button"}
                               className={"action_cart_btn active_cart_btn"}
                               value={bookLocalization.locale[lang].removeFromCart}
                               onClick={()=> {
                                   removeFromCart();
                                   props.cart();
                               }}/>)}

                    {AuthorizationService.currentUserHasRole("ROLE_ADMIN") && (
                            <div className={"action_btn_container"}>
                                <Link className={"action_link"}
                                      to={{
                                          pathname : "/books/" + book.id + "/edit"
                                      }}>
                                    {bookLocalization.locale[lang].editBtn}
                                </Link>
                                {book.inStock && (<button className={"action_link delete_btn"}
                                        onClick={deleteBook}
                                       >
                                    {bookLocalization.locale[lang].deleteBtn}
                                </button>)
                                }
                            </div>
                    )}
                    {!book.inStock && (
                        <div>
                            {bookLocalization.locale[lang].notInStock}
                        </div>
                    )}
                </div>
            </div>
            <div className={"book_description"}>
                <div>
                    <span>{bookLocalization.locale[lang].name} :</span>
                    {book.weight}</div>
                <div>
                    <span>{bookLocalization.locale[lang].publishedYear}:</span>
                    {book.publishedYear}</div>
                <div>
                    <span>{bookLocalization.locale[lang].materialCover} :</span>
                    {book.materialCover}</div>
                <div>
                    <span>{bookLocalization.locale[lang].amountPages}:</span>
                    {book.amountPages}</div>
                <div>
                    <span>{bookLocalization.locale[lang].inStock}: </span>
                    {book.inStock ? bookLocalization.locale[lang].yes : bookLocalization.locale[lang].no}</div>
                <div>
                    <span>{bookLocalization.locale[lang].description}: </span>
                    {book.description}</div>
                <div className={"book_item_authors_list"}>
                    <span>{bookLocalization.locale[lang].authorTitle} : </span>
                    {book.authors.map((author)=> (
                        <div className={"book_item_author"} key={author.id}>
                            <Link to={{
                                pathname: "/authors/" + author.id
                            }}>
                                {author.pseudonym}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BookItemView;