import React from 'react'
import logo from "../../icon/book.png";
import {Link} from "react-router-dom";
import cart from "../../icon/shopping-cart.png";
import user from "../../icon/user.png";
import "../../styles/common/header.sass";
import AuthorizationService from "../../service/AuthorizationService";
import logOutIcon from "../../icon/logout.png";

function CustomerNavBar() {

    function logOut() {
        localStorage.removeItem("user")
        window.location.reload();
    }

    return (
        <>
            <header className={"header"}>
                <div className={"header_panel"}>
                </div>
                <div className={"wrapper"}>
                    <nav className={"header_menu"}>
                        <Link to="/" className={"nav_link"}>
                            <img  src={logo} width={"55px"} height={"55px"} alt={"book store"}/>
                        </Link>
                        <Link to="/books" className={"nav_link"}>Каталог книг</Link>
                        <Link to="/sales" className={"nav_link"}>Скидки</Link>
                        <Link to="/#about" className={"nav_link"}>О магазине</Link>
                        <div className={"user_panel"}>
                            <input className={"search_input"}/> <input type={"button"} className={"search_button"} value={"Поиск"}/>
                            <Link to="/cart">
                                <img src={cart} width={"30px"} height={"30px"} alt={"cart"}/>
                            </Link>
                            {AuthorizationService.currentUserHasRole("CUSTOMER") && (
                                <>
                                    <Link to="/person">
                                        <img src={user} width={"30px"} height={"30px"} alt={"person"}/>
                                    </Link>
                                    <Link onClick={logOut}>
                                        <img src={logOutIcon} width={"30px"} height={"30px"} alt={"person"}/>
                                    </Link>
                                </>

                            )}
                            {!AuthorizationService.currentUserHasRole("CUSTOMER") && (
                                <Link to="/login">
                                    <img src={user} width={"30px"} height={"30px"} alt={"person"}/>
                                </Link>
                                )}
                        </div>
                    </nav>

                </div>
            </header>
        </>

    )
}

export default CustomerNavBar;