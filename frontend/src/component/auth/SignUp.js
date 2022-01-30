import React from "react";
import axios from "axios";
import '../../styles/auth/signUp.sass'
import {Form, Input, Label} from "reactstrap";

class SignUP extends React.Component {

    componentDidMount() {
    }

    saveDate() {
        axios.post("/author/").then({

        })
    }

    render() {
        return (
            <div>
                <h1>ff</h1>
                <Form className={"author_form"}>
                    <Label>Имя</Label>
                    <Input/>
                    <Label>Фамилия</Label>
                    <Input/>
                    <Label>Отчество</Label>
                    <Input/>
                    <Label>Номер телефона</Label>
                    <Input/>
                    <Label>Пароль</Label>
                    <Input/>
                    <Label>Повторите пароль</Label>
                    <input/>
                    <input type={"submit"} value={"Зарегистрироваться"} className={"submit_btn"}/>
                </Form>
            </div>

        );
    }
}
export default SignUP;