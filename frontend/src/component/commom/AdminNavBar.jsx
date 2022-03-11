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
                        <Link to="/" className={"nav_link"}>
                            <img  src={logo} width={"55px"} height={"55px"} alt={"book store"}/>
                        </Link>
                        <Link to="/books" className={"nav_link"}>Каталог книг</Link>
                        <Link to="/sales" className={"nav_link"}>Скидки</Link>
                        <Link to="/authors" className={"nav_link"}>Авторы</Link>
                        <Link to="/orders" className={"nav_link"}>Заказы</Link>
                        <Link to="/users" className={"nav_link"}>Пользователи</Link>
                        <div className={"user_panel"}>
                            <Link onClick={logOut}>
                                <img src={logOutIcon} width={"30px"} height={"30px"} alt={"person"}/>
                            </Link>
                        </div>
                    </nav>

                </div>
            </header>
        </>
    )
}

export default AdminNavBar;