import AuthorizationService from "../../service/AuthorizationService";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

function BookItemView(props) {

    const book = props.value;

    let [inCart, setInCart] = useState(false);
    useEffect(() => {
        let cart = localStorage.getItem("books");
        console.log(cart)
        if(cart !== null) {
            setInCart(cart.includes("*" + book.id + "*"))
        }
    }, [inCart]);

    function addToCart(e) {
        let cartBooks = localStorage.getItem("books");
        if(cartBooks === null) {
            cartBooks = "*" + book.id + "*";
        } else {
            cartBooks = cartBooks + book.id + "*";
        }
        localStorage.setItem("books", cartBooks)

        setInCart(true);

    }

    function removeFromCart(e) {
        let cartBooks = localStorage.getItem("books");
        setInCart(false)
        localStorage.setItem("books", cartBooks
            .replace("*" + book.id + "*", "*"));

    }

    return (
        <>
            <div className={"author_view_container"}>
                <img src={book.imageName} className={"author_picture"} width={500} height={500}/>
                <div className={"author_description"}>
                    <h2>{book.name}</h2>
                    <p className={"price"}>{book.price} р.</p>
                    {!AuthorizationService.currentUserHasRole("ADMIN") && (
                        <></>
                    ) && inCart === false && (
                    <input type={"button"}
                           className={"action_cart_btn"}
                           value={"Добавить в козину"} onClick={addToCart}/>)}

                    {!AuthorizationService.currentUserHasRole("ADMIN") && (
                        <></>
                    ) && inCart === true && (
                        <input type={"button"}
                               className={"action_cart_btn active_cart_btn"}
                               value={"Удалить из корзины"} onClick={removeFromCart}/>)}

                    {AuthorizationService.currentUserHasRole("ADMIN") && (
                            <div className={"action_btn_container"}>
                                <Link className={"action_link"}
                                      to={{
                                          pathname : "/books/" + book.id + "/edit"
                                      }}> Редактировать </Link>
                                <Link className={"action_link delete_btn"}
                                      to={{
                                          pathname : "/books/" + book.id + "/"
                                      }} >Удалить</Link>
                            </div>
                    )}
                </div>
            </div>
            <div className={"book_description"}>
                <div><span>Название:</span> {book.weight}</div>
                <div><span>Год публикации:</span> {book.publishedYear}</div>
                <div><span>Материал обложки:</span> {book.materialCover}</div>
                <div><span>Количество страниц:</span> {book.amountPages}</div>
                <div><span>В наличии: </span>{book.inStock ? 'Да' : 'Нет'}</div>
                <div><span>Описание: </span>{book.description}</div>
                <div className={"book_item_authors_list"}>
                    <span>Авторы: </span>
                    {book.authors.map((author, index)=> (
                        <div className={"book_item_author"}>
                            <Link to={{
                                pathname: "authors/" + author.id
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