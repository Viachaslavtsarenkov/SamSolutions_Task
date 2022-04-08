import React, {useEffect} from "react";
import user from '../../icon/user.png'
import AdminNavBar from "./AdminNavBar";
import CustomerNavBar from "./CustomerNavBar";
import AuthorizationService from "../../service/AuthorizationService";
import axios from "axios";

function NavBar(props) {

    useEffect(() =>{
    }, [])

    function logOut() {
        axios.get("/login")
            .then(() => {
            })
        sessionStorage.clear();
        localStorage.removeItem("user");
        window.location.href = "/login"
    }

    return (
        <>
            {AuthorizationService.currentUserHasRole("ROLE_ADMIN") && (
                <AdminNavBar logout={logOut}/>
            )}
            {!AuthorizationService.currentUserHasRole("ROLE_ADMIN") && (
                <CustomerNavBar logout={logOut} count={props.count}/>
            )}
        </>
    );
}

export default NavBar;