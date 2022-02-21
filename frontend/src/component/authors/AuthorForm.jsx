import React from "react"
import '../../styles/author/authors.sass'
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
                <form className={"author_form"}>
                        <label>Псевдоним</label>
                        <input
                            required
                            onChange={this.handleChange}
                            type="text"
                            name="pseudonym"
                            placeholder="Введите псевдоним" />
                        <input
                            as="textarea"
                            name="description"
                            onChange={this.handleChange}
                            placeholder="Введите описание"
                            style={{ height: '300px', bottom: 30}}
                        />
                    <label>Загрузите фото автора</label>
                    <input
                        type="file"
                        required
                        onChange={this.uploadImg}
                        name="file"
                    />
                    <input type={"button"} variant="primary"
                            onClick={this.createAuthor}
                           value={"Сохранить"}
                    />
                </form>
            </div>
        );
    }
}
export default AuthorForm;