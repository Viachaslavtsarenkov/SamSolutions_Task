import React from "react";
import CustomerNavBar from './CustomerNavBar'
import user from '../../icon/user.png'
import jwtDecode from "jwt-decode";
import AdminNavBar from "./AdminNavBar";
import GuestNavBar from "./GuestNavBar";

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
            console.log(user);
            this.setState( {
                ShowCustomerNavBar: user.role.includes('CUSTOMER'),
                ShowAdminNavBar: user.role.includes('ADMIN')
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
                {this.state.ShowCustomerNavBar && (
                    <CustomerNavBar/>
                )}
                {this.state.ShowAdminNavBar && (
                    <AdminNavBar/>
                )}
                {this.state.ShowGuestNavBar && (
                    <GuestNavBar/>
                )}

            </>

        );
    }
}

export default NavBar;