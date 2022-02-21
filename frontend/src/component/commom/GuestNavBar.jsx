import React from 'react'
import logo from "../../icon/book.png";
import {Link} from "react-router-dom";
import cart from "../../icon/shopping-cart.png";
import user from "../../icon/user.png";
import "../../styles/common/header.sass";

function GuestNavBar() {

    return (
        <>
            <header className={"header"}>
                <div className={"wrapper"}>
                    <nav className={"header_menu"}>
                        <Link to="/" className={"nav_link"}>
                            <img  src={logo} width={"55px"} height={"55px"} alt={"book store"}/>
                        </Link>
                        <Link to="/main" className={"nav_link"}>Каталог книг</Link>
                        <Link to="/signUp" className={"nav_link"}>Скидки</Link>
                        <Link to="/signUp" className={"nav_link"}>О магазине</Link>
                        <Link to="/signUp" className={"nav_link"}>Доставка</Link>
                        <Link to="/signUp" className={"nav_link"}>Контакты</Link>
                        <div className={"user_panel"}>
                            <input className={"search_input"}/> <input type={"button"} className={"search_button"} value={"Поиск"}/>
                            <Link to="/cart">
                                <img src={cart} width={"30px"} height={"30px"} alt={"cart"}/>
                            </Link>
                            <Link to="/login">
                                <img src={user} width={"30px"} height={"30px"} alt={"person"}/>
                            </Link>
                        </div>
                    </nav>

                </div>
            </header>
        </>

    )
}

export default GuestNavBar;