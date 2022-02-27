import React from "react";
import axios from "axios";
import '../../styles/auth/login.sass';
import '../../styles/common/common.sass';
import {Form, Button} from 'react-bootstrap';
import {Link, NavLink, Redirect} from "react-router-dom";
import AuthorizationService from '../../service/AuthorizationService';

class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                login : '',
                password : ''
            },
            redirect: false,
            error : ''
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
        const {user} = this.state;
        axios.post("/login", this.state.user).then((response) => {
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
               <label className={"form_description"}>Войдите в свой аккаунт</label>
               <label>Email</label>
               <input name={"login"}
                      onChange={this.handleChange}
                      type="email"
                      className={"text_field"}
                      placeholder="Введите email" />

               <label>Пароль</label>
               <input name={"password"}
                      onChange={this.handleChange}
                      type="password" className={"text_field"}
                      placeholder="Введите пароль" />
               <input type={"button"}  onClick={this.loginUser} variant="primary" value={"Войти"} className={"action_btn"}/>
               {this.error !== '' && (
                   <div className={"error_validation"}>
                       {this.state.error}
                   </div>
               )}
               <Form.Text className="text-muted">
                   У вас есть аккаунт?
               </Form.Text>
                   <Link to = "/registration">Зарегистрироваться</Link>
           </form>
       </div>
       )
   }
}

export default LogIn;