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
                        <Link to="/main" className={"nav_link"}>Каталог книг</Link>
                        <Link to="/signUp" className={"nav_link"}>Скидки</Link>
                        <Link to="/" className={"nav_link"}>
                            <img  src={logo} width={"80px"} height={"60px"} alt={"book store"}/>
                        </Link>
                        <Link to="/signUp" className={"nav_link"}>О магазине</Link>
                        <Link to="/signUp" className={"nav_link"}>Доставка</Link>
                        <div className={"user_panel"}>
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