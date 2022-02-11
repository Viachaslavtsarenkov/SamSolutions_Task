import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/auth/login.sass'
import {Form, Button, FloatingLabel} from "react-bootstrap";
import AuthorizationService from "../../service/AuthorizationService";
import {Redirect} from "react-router-dom";
import axios from "axios";

class AuthorForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            author : {
                pseudonym: "",
                description: "",
            },
            file: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.createAuthor = this.createAuthor.bind(this);
        this.uploadImg = this.uploadImg.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let author = {...this.state.author};
        author[name] = value;
        this.setState({author});
    }

    uploadImg(event) {
        this.setState({file:event.target.files[0]})
    }

    createAuthor(){
        const url = "/authors";
        const formData = new FormData();
        formData.append("author",
            new Blob([JSON.stringify(this.state.author)], {
            type: "application/json"
        }))
        formData.append('image', this.state.file,)
        axios({
            method: 'post',
            url: url,
            data: formData,
            header: {
                "Content-Type": undefined
            },
        }).then(function (response) {
                console.log(response);
        }).catch(function (response) {
            console.log(response.response.data);
        });
    }

    render() {
        if(!AuthorizationService.currentUserHasRole("ADMIN")) {
            return <Redirect to={"/"}/>
        }
        return (
            <div className={"wrapper"}>
                <Form className={"login_form"}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Псевдоним</Form.Label>
                        <Form.Control
                            required
                            onChange={this.handleChange}
                            type="text"
                            name="pseudonym"
                            placeholder="Введите псевдоним" />
                    <FloatingLabel controlId="floatingTextarea2" label="Введите описание автора">
                        <Form.Control
                            as="textarea"
                            name="description"
                            onChange={this.handleChange}
                            placeholder="Leave a comment here"
                            style={{ height: '400px', bottom: 30}}
                        />
                    </FloatingLabel>
                    <Form.Label>Загрузите фото автора</Form.Label>
                    <input
                        type="file"
                        required
                        onChange={this.uploadImg}
                        name="file"
                    />
                    </Form.Group>
                    <Button variant="primary"
                            onClick={this.createAuthor}
                            style={{margin: 30}}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}
export default AuthorForm;