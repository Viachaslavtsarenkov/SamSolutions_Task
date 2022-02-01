import React from "react";
import axios from "axios";
import '../../styles/auth/login.sass'
import '../../styles/common/common.sass'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import NavBar from '../commom/NavBar';

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
            repeatedPassword: ''
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
        console.log(this.state.isEqual)
        this.setState({user});
    }

    checkEqualPassword() {
        this.setState( {isEqual : this.state.user.password === this.state.repeatedPassword});
    }

    registerUser(event) {
        event.preventDefault();
        const {user} = this.state;
        console.log(user)
        axios.post("/users", this.state.user).then((response) => {

        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        const {user} = this.state;
        return (
            <div className={"wrapper"}>
                <NavBar/>
                <Form onSubmit={this.registerUser} className={"login_form"}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            type="text"
                            name="name"
                            placeholder="Введите имя" />
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            type="text"
                            name="surname"
                            placeholder="Введите фамилию" />
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            type="text"
                            name="patronymic"
                            placeholder="Введите отчество" />
                        <Form.Label>Номер телефона</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            type="text"
                            name="phoneNumber"
                            placeholder="Введите номер телефона" />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            ype="email"
                            name="email"
                            placeholder="Введите email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            type="password"
                            name="password"
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