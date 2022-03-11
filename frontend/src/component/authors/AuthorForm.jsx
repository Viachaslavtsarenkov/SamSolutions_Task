import React, {useEffect} from "react"
import '../../styles/author/authors.sass'
import AuthorizationService from "../../service/AuthorizationService";
import {Redirect, useParams} from "react-router-dom";
import axios from "axios";

class AuthorForm extends React.Component {

    componentDidMount() {
        if(this.state.author.id !== undefined) {
            this.getAuthor(this.props.match.params.id);
            this.setState({url: '/authors/' + this.props.match.params.id})
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            author : {
                id : this.props.match.params.id,
                pseudonym: "",
                description: "",
            },
            file: null,
            method : '',
            url: '/authors',
            errorPseudonym : null,
            isSaved : false,
            isFound : true
        }
        this.handleChange = this.handleChange.bind(this);
        this.createAuthor = this.createAuthor.bind(this);
        this.uploadImg = this.uploadImg.bind(this)
    }

    getAuthor(id) {
        const url = "/authors/";
        axios.get(url + id).then((response)=>{
            this.setState({ author : response.data})
        }).catch((error) => {
            this.setState({isFound: false})
        })
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

    createAuthor(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("author",
            new Blob([JSON.stringify(this.state.author)], {
            type: "application/json"
        }))
        if (this.state.file != null) {
            formData.append('image', this.state.file)
        }
        axios({
            method: 'post',
            url: this.state.url,
            data: formData,
            header: {
                "Content-Type": undefined
            },
        }).then(response => {

            if(this.state.author.id !== undefined) {
                this.setState({
                    url : this.state.url + "/" + response.data.message
                });
            }

            this.setState({isSaved: true})
        }).catch(error => {
            this.setState({errorPseudonym : error.response.data});
        })
    }

    saveChanges() {

    }

    render() {
        if(!AuthorizationService.currentUserHasRole("ADMIN")) {
            return <Redirect to={"/"}/>
        }

        if(this.state.isSaved) {
            return <Redirect to={this.state.url}/>
        }

        if(!this.state.isFound) {
            return <Redirect to={"/error"}/>
        }

        return (
            <div className={"wrapper"}>
                <form className={"author_form"} onSubmit={this.createAuthor}>
                        <label>Псевдоним</label>
                        <input
                            required
                            onChange={this.handleChange}
                            type="text"
                            name="pseudonym"
                            minLength={1}
                            maxLength={120}
                            value={this.state.author.pseudonym}
                            placeholder="Введите псевдоним" />
                    {this.state.errorPseudonym != null && (
                        <div className={"error_validation"}>
                            "Псевдоним уже занят другим автором"
                        </div>
                    )}
                        <input
                            value={this.state.author.description}
                            type="textarea"
                            required
                            name="description"
                            minLength={10}
                            maxLength={1200}
                            onChange={this.handleChange}
                            placeholder="Введите описание"
                            style={{ height: '300px', bottom: 30}}
                        />
                    <label>Загрузите фото автора</label>
                    <input
                        type="file"
                        onChange={this.uploadImg}
                        name="file"
                        accept={".jpg"}
                    />
                    <input type={"submit"}
                           value={"Сохранить"}
                    />
                </form>
            </div>
        );
    }
}
export default AuthorForm;