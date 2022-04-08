import React from "react";
import axios from "axios";
import {Form} from 'react-bootstrap';
import {Link, Redirect} from "react-router-dom";
import AuthorizationService from '../../service/AuthorizationService';
import registrationLocale from '../localization/RegistrationLocalization'
import '../../styles/auth/login.sass';
import '../../styles/common/common.sass';

class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                login : '',
                password : ''
            },
            redirect: false,
            error : '',
            lang : 'ru'
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    componentDidMount() {

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let user = {...this.state.user};
        user[name] = value;
        this.setState({user});
    }

    loginUser(event) {
        event.preventDefault();
        axios.post("/login", this.state.user)
            .then((response) => {
            if (response.data["jwt"]) {
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.reload();
            }
            this.setState({ redirect: '/' });
        }).catch((error) => {
            if(error.response) {
                this.setState({error : error.response.data.message});
            }
        })
    }

    render () {
        if(AuthorizationService.getCurrentUser() != null) {
            return <Redirect to={"/"}/>
        }
       return (
       <div className={"wrapper"}>
           <form onSubmit={this.loginUser} className={"login_form"}>
               <label className={"form_description"}>
                  {registrationLocale.locale[this.state.lang].loginTitle}
               </label>
               <label>Email</label>
               <input name={"login"}
                      onChange={this.handleChange}
                      type="email"
                      className={"text_field"}
                      placeholder={registrationLocale.locale[this.state.lang].placeholderLogin} />
               <label>
                   {registrationLocale.locale[this.state.lang].passwordTitle}
               </label>
               <input name={"password"}
                      onChange={this.handleChange}
                      type="password" className={"text_field"}
                      placeholder={registrationLocale.locale[this.state.lang].placeholderPassword} />
               <input type={"button"}  onClick={this.loginUser}
                      value={registrationLocale.locale[this.state.lang].login}
                      className={"action_btn"}/>
               {this.state.error !== '' && (
                   <div className={"error_validation"}>
                       {registrationLocale.locale[this.state.lang][this.state.error]}
                   </div>
               )}
               <Form.Text className="text-muted">
                   {registrationLocale.locale[this.state.lang].account}
               </Form.Text>
                   <Link to = "/registration" >
                       {registrationLocale.locale[this.state.lang].register}
                   </Link>
           </form>
       </div>
       )
   }
}

export default LogIn;