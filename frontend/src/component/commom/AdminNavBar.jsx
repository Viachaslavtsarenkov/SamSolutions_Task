import logo from "../../icon/book.png";
import {Link} from "react-router-dom";
import user from "../../icon/user.png";
import logOutIcon from "../../icon/logout.png"
import React from "react";

function AdminNavBar() {

    function logOut() {
        localStorage.removeItem("user")
        window.location.reload();
    }

    return (
        <>
            <header className={"header"}>
                <div className={"wrapper"}>
                    <nav className={"header_menu"}>
                        <Link to="/books" className={"nav_link"}>Каталог книг</Link>
                        <Link to="/sales" className={"nav_link"}>Скидки</Link>
                        <Link to="/" className={"nav_link"}>
                            <img  src={logo} width={"80px"} height={"60px"} alt={"book store"}/>
                        </Link>
                        <Link to="/authors" className={"nav_link"}>Авторы</Link>
                        <Link to="/payments" className={"nav_link"}>Заказы</Link>
                        <div className={"user_panel"}>
                            <Link to="/profile">
                                <img src={user} width={"25px"} height={"25px"} alt={"person"}/>
                            </Link>
                            <a onClick={logOut}>
                                <img src={logOutIcon} width={"25px"} height={"25px"} alt={"logout"}/>
                            </a>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default AdminNavBar;