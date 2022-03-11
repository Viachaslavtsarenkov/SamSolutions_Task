import React from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";
class Activation extends React.Component {

    componentDidMount() {
        this.activateAccount = this.activateAccount.bind(this);
        this.activateAccount();
    }

    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            userActivation: {
                email : query.get('mail'),
                code : query.get('code')
            },
            redirect : false,
            url : '',
        }
    }

    activateAccount() {
        axios.post("/activation", this.state.userActivation)
            .then((response) => {
             this.setState({url : "/login"})
        }).catch((error) => {
            this.setState({url : "/error"})
        })
    }

    render() {
        return (
            <div>
                <Redirect to={"/login"} />
            </div>
        );
    }



}

export default Activation;