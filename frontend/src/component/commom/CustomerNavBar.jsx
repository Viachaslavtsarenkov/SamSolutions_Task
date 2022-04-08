import React, {useState} from 'react'
import logo from "../../icon/book.png";
import {Link} from "react-router-dom";
import cart from "../../icon/shopping-cart.png";
import user from "../../icon/user.png";
import "../../styles/common/header.sass";
import AuthorizationService from "../../service/AuthorizationService";
import logOutIcon from "../../icon/logout.png";
import CommonLocalization from "../localization/CommonLocalization";

function CustomerNavBar(props) {

    let [lang] = useState("ru");

    return (
        <>
            <header className={"header"}>
                <div className={"header_panel"}>
                </div>
                <div className={"wrapper"}>
                    <nav className={"header_menu"}>
                        <Link to="/" className={"nav_link"}>
                            <div className={"logo_container"}>
                                <img  src={logo} width={"40px"} height={"40px"} alt={"book store"}/>
                                <p>TheBookStore</p>
                            </div>
                        </Link>
                        <div className={"customer_nav"}>
                            <Link to="/" className={"nav_link"}>
                                {CommonLocalization.locale[lang].home}
                            </Link>
                            <Link to="/books" className={"nav_link"}>
                                {CommonLocalization.locale[lang].collection}
                            </Link>
                            <div className={"user_panel"}>
                                 <Link to="/cart">
                                    <div className={"cart_count_container"}>
                                        <p className={"count"}>{props.count}</p>
                                        <img src={cart} width={"30px"} height={"30px"} alt={"cart"}/>
                                    </div>
                                </Link>
                                {AuthorizationService.currentUserHasRole("ROLE_CUSTOMER") && (
                                    <>
                                        <Link to="/profile">
                                            <img src={user} width={"30px"} height={"30px"} alt={"person"}/>
                                        </Link>
                                        <Link onClick={() => props.logout()}>
                                            <img src={logOutIcon} width={"30px"} height={"30px"} alt={"person"}/>
                                        </Link>
                                    </>

                                )}
                                {!AuthorizationService.currentUserHasRole("ROLE_CUSTOMER") && (
                                    <Link to="/login">
                                        <img src={user} width={"30px"} height={"30px"} alt={"person"}/>
                                    </Link>
                                    )}
                            </div>
                        </div>
                    </nav>

                </div>
            </header>
        </>

    )
}

export default CustomerNavBar;