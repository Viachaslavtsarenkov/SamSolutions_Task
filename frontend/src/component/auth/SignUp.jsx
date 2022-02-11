import React from "react";
import axios from "axios";
import '../../styles/auth/login.sass'
import '../../styles/common/common.sass'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import AuthorizationService from "../../service/AuthorizationService";

class SignUP extends React.Component {

    userInfo = {
        name : '',
        surname: '',
        patronymic : '',
        email: '',
        phoneNumber: '',
        password: '',
        matchingPassword: ''
    };


    constructor(props) {
        super(props);
        this.state = {
            user : this.userInfo,
            isEqual: true,
            errors : {},
            redirect: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
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


    registerUser(event) {
        event.preventDefault();
        const {user} = this.state;
        axios.post("/signUp", this.state.user).then((response) => {
            this.setState({ redirect: '/login' });
        }).catch((error) => {
            this.setState({errors : error.response.data})
            console.log(this.state.error)
            this.checkValidityMessage();
        })
    }

    checkValidityMessage() {
        console.log(this.state.errors)
    }

    render() {
        if(AuthorizationService.getCurrentUser() === null) {
            return <Redirect to={"/"}/>
        }
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        const {user} = this.state;
        return (
            <div className={"wrapper"}>
                <Form onSubmit={this.registerUser} className={"login_form"}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            type="text"
                            name="surname"
                            value={this.state.user.surname}
                            placeholder="Введите имя" />
                        <div className={"error_validation"}>
                            {this.state.errors['surname']}
                        </div>
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.user.name}
                            name="name"
                            placeholder="Введите фамилию" />
                        <div className={"error_validation"}>
                            {this.state.errors['name']}
                        </div>
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.user.patronymic}
                            name="patronymic"
                            placeholder="Введите отчество" />
                        <Form.Label>Номер телефона</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            type="text"
                            name="phoneNumber"
                            value={this.state.user.phoneNumber}
                            placeholder="Введите номер телефона" />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            ype="email"
                            name="email"
                            value={this.state.user.email}
                            placeholder="Введите email" />
                        <div className={"error_validation"}>
                            {this.state.errors['email']}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            type="password"
                            name="password"
                            value={this.state.user.password}
                            placeholder="Введите пароль" />
                        <Form.Label>Подтвержение пароля</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            type="password"
                            name="matchingPassword"
                            placeholder="Введите повторно пароль" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                        <div className={"error_validation"}>
                            {this.state.errors["password"]}
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="Зарегистрироваться">
                        Регистрация
                    </Button>
                </Form>
            </div>

        );
    }
}
export default SignUP;