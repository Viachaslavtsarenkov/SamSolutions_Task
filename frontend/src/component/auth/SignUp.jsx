import React from "react";
import axios from "axios";
import '../../styles/auth/login.sass'
import {Form, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import AuthorizationService from "../../service/AuthorizationService";
import LocalizedStrings from "react-localization";
import data from '../commom/Localization'

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
            lang : new LocalizedStrings({data})
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
                <form onSubmit={this.registerUser} className={"sign_up_form"}>
                        <label>Фамилия</label>
                        <input
                            required
                            className={"text_field"}
                            onChange={this.handleChange}
                            type="text"
                            name="surname"
                            value={this.state.user.surname}
                            placeholder="Введите имя" />
                        <div className={"error_validation"}>
                            {this.state.errors['surname']}
                        </div>
                        <label>Имя</label>
                        <input
                            required
                            className={"text_field"}
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.user.name}
                            name="name"
                            placeholder="Введите фамилию" />
                        <div className={"error_validation"}>
                            {this.state.errors['name']}
                        </div>
                        <label>Отчество</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            className={"text_field"}
                            value={this.state.user.patronymic}
                            name="patronymic"
                            placeholder="Введите отчество" />
                        <label>Номер телефона</label>
                        <input
                            required
                            onChange={this.handleChange}
                            type="text"
                            className={"text_field"}
                            name="phoneNumber"
                            value={this.state.user.phoneNumber}
                            placeholder="Введите номер телефона" />
                        <label>Email</label>
                        <input
                            required
                            onChange={this.handleChange}
                            type="email"
                            name="email"
                            className={"text_field"}
                            value={this.state.user.email}
                            placeholder="Введите email" />
                        <div className={"error_validation"}>
                            {this.state.errors['email']}
                        </div>
                        <label>Пароль</label>
                        <input
                            required
                            onChange={this.handleChange}
                            type="password"
                            name="password"

                            className={"text_field"}
                            value={this.state.user.password}
                            placeholder="Введите пароль" />
                        <label>Подтвержение пароля</label>
                        <input
                            required
                            onChange={this.handleChange}
                            type="password"
                            className={"text_field"}
                            name="matchingPassword"
                            placeholder="Введите повторно пароль" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                        <div className={"error_validation"}>
                            {this.state.errors["password"]}
                        </div>
                    <input type={"submit"}
                           className={"action_btn"}
                           value="Зарегистрироваться"/>
                </form>
            </div>

        );
    }
}
export default SignUP;