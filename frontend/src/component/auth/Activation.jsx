import React from "react";
import AuthorizationService from "../../service/AuthorizationService";
import {Redirect} from "react-router-dom";
class Activation extends React.Component {

    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            userActivation: {
                mail : query.get('mail'),
                code : query.get('code')
            }
        }
        this.activationAccount();
    }

    activationAccount() {

    }

    render() {
        if(AuthorizationService.getCurrentUser() != null) {
            return <Redirect to={"/"}/>
        }

        return (
            <div></div>
        );
    }



}

export default Activation;