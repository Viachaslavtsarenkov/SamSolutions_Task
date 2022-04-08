import logo from "../../icon/book.png";
import {Link} from "react-router-dom";
import logOutIcon from "../../icon/logout.png"
import React, {useState} from "react";
import CommonLocalization from "../localization/CommonLocalization";

function AdminNavBar(props) {


    let [lang] = useState("ru");

    return (
        <React.Fragment>
            <header className={"header"}>
                <div className={"wrapper"}>
                    <nav className={"header_menu"}>
                        <Link to="/" className={"nav_link"}>
                            <img  src={logo} width={"55px"} height={"55px"} alt={"book store"}/>
                        </Link>
                        <Link to={"/books"} className={"nav_link"}>
                            {CommonLocalization.locale[lang].collection}
                        </Link>
                        <Link to={"/discounts"} className={"nav_link"}>
                            {CommonLocalization.locale[lang].discounts}
                        </Link>
                        <Link to={"/authors"} className={"nav_link"}>
                            {CommonLocalization.locale[lang].authors}
                        </Link>
                        <Link to={"/orders"} className={"nav_link"}>
                            {CommonLocalization.locale[lang].orders}
                        </Link>
                        <Link to={"/users"} className={"nav_link"}>
                            {CommonLocalization.locale[lang].users}
                        </Link>
                        <div className={"user_panel"}>
                            <Link onClick={() => props.logout()} to={"/login"}>
                                <img src={logOutIcon} width={"30px"} height={"30px"} alt={"person"}/>
                            </Link>
                        </div>
                    </nav>

                </div>
            </header>
        </React.Fragment>
    )
}

export default AdminNavBar;