import React from "react";
import user from '../../icon/user.png'
import jwtDecode from "jwt-decode";
import AdminNavBar from "./AdminNavBar";
import CustomerNavBar from "./CustomerNavBar";
import AuthorizationService from "../../service/AuthorizationService";

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            ShowCustomerNavBar: false,
            ShowAdminNavBar: false,
            ShowGuestNavBar: false
        }}

    componentDidMount() {
        let user = localStorage.getItem('user');
        if (user != null) {
            user = jwtDecode(user);
            this.setState( {
                ShowCustomerNavBar: user.role.includes('ROLE_CUSTOMER'),
                ShowAdminNavBar: user.role.includes('ROLE_ADMIN')
            });
        } else {
            this.setState({
                ShowGuestNavBar: true
            })
        }

    }

    render() {
        return (
            <>
                {this.state.ShowAdminNavBar && (
                    <AdminNavBar/>
                )}
                {!AuthorizationService.currentUserHasRole("ROLE_ADMIN") && (
                    <CustomerNavBar/>
                )}
            </>

        );
    }
}

export default NavBar;