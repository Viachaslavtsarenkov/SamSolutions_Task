import React from "react";
import axios from "axios";
import '../../styles/auth/login.sass'
import {Form, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import AuthorizationService from "../../service/AuthorizationService";
import localization from '../localization/RegistrationLocalization'
import validationLocale from '../localization/ValidationLocalization'

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
            lang : 'ru'
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
        this.setState({errors : []})
        event.preventDefault();
        const {user} = this.state;
        axios.post("/signUp", this.state.user).then((response) => {
            this.setState({ redirect: '/login' });
        }).catch((error) => {
           this.setState({errors: {"emailError" : ""}})
        })
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
                        <label>
                            {localization.locale[this.state.lang].surname}
                        </label>
                        <input
                            required
                            className={"text_field"}
                            onChange={this.handleChange}
                            type="text"
                            name="surname"
                            autoComplete={"off"}
                            title={validationLocale.locale[this.state.lang].fieldSimpleText}
                            minLength={2}
                            pattern={"[A-Za-zА-Яа-яЁё]{2,}"}
                            value={this.state.user.surname}
                            placeholder= {localization.locale[this.state.lang].surnamePlaceHolder}/>
                        <div className={"error_validation"}>
                            {this.state.errors['surname']}
                        </div>
                        <label>
                            {localization.locale[this.state.lang].name}
                        </label>
                        <input
                            required
                            className={"text_field"}
                            onChange={this.handleChange}
                            type="text"
                            pattern={"[A-Za-zА-Яа-яЁё]{2,}"}
                            autoComplete={"off"}
                            title={validationLocale.locale[this.state.lang].fieldSimpleText}
                            value={this.state.user.name}
                            name="name"
                            placeholder={localization.locale[this.state.lang].namePlaceHolder} />
                        <div className={"error_validation"}>
                            {this.state.errors['name']}
                        </div>
                        <label>
                            {localization.locale[this.state.lang].patronymic}
                        </label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            className={"text_field"}
                            value={this.state.user.patronymic}
                            name="patronymic"
                            required
                            autoComplete={"off"}
                            pattern={"[A-Za-zА-Яа-яЁё]{2,}"}
                            title={validationLocale.locale[this.state.lang].fieldSimpleText}
                            placeholder={localization.locale[this.state.lang].patronymic} />
                        <label>
                            {localization.locale[this.state.lang].phone}
                        </label>
                        <input
                            required
                            onChange={this.handleChange}
                            type="tel"
                            className={"text_field"}
                            name="phoneNumber"
                            pattern={"[\+](375)[0-9]{9}"}
                            value={this.state.user.phoneNumber}
                            title={validationLocale.locale[this.state.lang].fieldPhoneNumber}
                            placeholder={localization.locale[this.state.lang].phonePlaceHolder}/>
                        <div className={"error_validation"}>
                            {this.state.errors["phoneNumber"]}
                        </div>
                        <label>
                            {localization.locale[this.state.lang].email}
                        </label>
                        <input
                            required
                            onChange={this.handleChange}
                            type="email"
                            name="email"
                            minLength={8}
                            maxLength={100}
                            className={"text_field"}
                            value={this.state.user.email}
                            title={validationLocale.locale[this.state.lang].fieldPassword}
                            placeholder={localization.locale[this.state.lang].placeholderLogin} />
                        {this.state.errors['emailError'] !== undefined && (
                            <div className={"error_validation"}>
                                shdfksdhfdkl
                            </div>
                        ) }
                        <label>
                            {localization.locale[this.state.lang].passwordTitle}
                        </label>
                        <input
                            required
                            onChange={this.handleChange}
                            type="password"
                            name="password"
                            pattern={"[A-Za-zА-Яа-яЁё0-9]{8,}"}
                            className={"text_field"}
                            title={validationLocale.locale[this.state.lang].fieldPassword}
                            value={this.state.user.password}
                            placeholder={localization.locale[this.state.lang].placeholderPassword} />
                        <label>
                            {localization.locale[this.state.lang].repeatedPassword}
                        </label>
                        <input
                            required
                            onChange={this.handleChange}
                            type="password"
                            className={"text_field"}
                            name="matchingPassword"
                            placeholder={localization.locale[this.state.lang]
                                .repeatedPasswordPlaceHolder} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                        <div className={"error_validation"}>
                            {this.state.errors["password"] !== undefined && (
                                <div>Пароли должны совпадать</div>
                            )}
                        </div>
                    <input type={"submit"}
                           className={"action_btn"}
                           value={localization.locale[this.state.lang].register}/>
                </form>
            </div>

        );
    }
}
export default SignUP;