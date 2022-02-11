import React from "react";
import axios from "axios";
import '../../styles/auth/login.sass'
import '../../styles/common/common.sass'
import 'bootstrap/dist/css/bootstrap.min.css';
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
            console.log("ffffff")
            if(error.response) {
                console.log("fff")
                console.log(error.response.body)
                this.setState({error : error.response.data})
            }

        })
    }

    render () {
        if(AuthorizationService.getCurrentUser() != null) {
            return <Redirect to={"/"}/>
        }
       return (
       <div className={"wrapper"}>
           <Form onSubmit={this.loginUser} className={"login_form"}>
               <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Email</Form.Label>
                   <Form.Control
                       name={"login"}
                       onChange={this.handleChange}
                       type="email"
                       placeholder="Введите email" />
                   <Form.Text className="text-muted">
                       Мы никогда не используем ваш адресс в других целях
                   </Form.Text>
               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicPassword">
                   <Form.Label>Пароль</Form.Label>
                   <Form.Control
                       name={"password"}
                       onChange={this.handleChange}
                       type="password"
                       placeholder="Введите пароль" />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicCheckbox">
                   <Form.Check type="checkbox" label="Запомнить меня" />
               </Form.Group>
               <Button variant="primary" type="submit">
                   Войти
               </Button>
               <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Text className="text-muted">
                       У вас есть аккаунт?
                   </Form.Text>
                   <Link to = "/registration">Зарегистрироваться</Link>
                </Form.Group>
           </Form>
       </div>
       )
   }
}

export default LogIn;