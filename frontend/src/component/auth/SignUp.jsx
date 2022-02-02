import React from "react";
import axios from "axios";
import '../../styles/auth/login.sass'
import '../../styles/common/common.sass'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Navbar, Nav } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class SignUP extends React.Component {

    userInfo = {
        name : '',
        surname: '',
        patronymic : '',
        email: '',
        phoneNumber: '',
        password: ''
        };


    constructor(props) {
        super(props);
        this.state = {
            user : this.userInfo,
            isEqual: true,
            repeatedPassword: '',
            errors : {password: ''},
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
        if (name === "repeatedPassword") {
            this.setState({repeatedPassword: value}, () => {
                this.checkEqualPassword();
            })
            this.checkEqualPassword();
        }
        if(name === "password" || name === "repeatedPassword") {
            this.checkEqualPassword();
        }
        this.setState({user});
    }

    checkEqualPassword() {
        this.setState( {isEqual : this.state.user.password === this.state.repeatedPassword});
    }

    registerUser(event) {
        event.preventDefault();
        const {user} = this.state;
        axios.post("/signIn", this.state.user).then((response) => {
            this.setState({ redirect: '/login' });
        }).catch((error) => {
            this.setState({error : error.response.data})
        })
    }

    render() {
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
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.user.name}
                            name="name"
                            placeholder="Введите фамилию" />
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control
                            required
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
                            name="repeatedPassword"
                            placeholder="Введите повторно пароль" />
                        <Form.Text className="text-muted">
                            {this.state.isEqual ? '' : 'Пароли должны совпадать'}
                        </Form.Text>
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