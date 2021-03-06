import React from "react"
import '../../styles/author/authors.sass'
import AuthorizationService from "../../service/AuthorizationService";
import {Redirect} from "react-router-dom";
import axios from "axios";
import localization from "../localization/AuthorLocalization";
import LangUtil from "../../service/LangUtil";

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
                image : {imageContent : ''}
            },
            file: null,
            method : '',
            url: '/authors',
            errorPseudonym : null,
            isSaved : false,
            isFound : true,
            lang : LangUtil.getLang()
        }
        this.handleChange = this.handleChange.bind(this);
        this.createAuthor = this.createAuthor.bind(this);
        this.uploadImg = this.uploadImg.bind(this)
    }

    getAuthor(id) {
        const url = "/authors/";
        axios.get(url + id).then((response)=>{
            this.setState({ author : response.data})
        }).catch(() => {
            this.setState({url : "/404"})
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
        if(event.target.files[0].size < 2000000) {
            this.setState({file:event.target.files[0]})
        } else {
            alert(localization.locale[this.state.lang].authorPicSize)
            event.target.value = "";
        }
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
            alert(localization.locale[this.state.lang].modificationMessage);
            this.setState({
                url : this.state.author.id === undefined
                    ? this.state.url + "/" + response.data.message
                    : this.state.url
            })
            this.setState({isSaved: true})
        }).catch(error => {
            this.setState({errorPseudonym : error.response.data});
        })
    }
    render() {
        if(!AuthorizationService.currentUserHasRole("ROLE_ADMIN")) {
            return <Redirect to={"/"}/>
        }
        if(this.state.isSaved || !this.state.isFound) {
            return <Redirect to={this.state.url}/>
        }

        return (
            <div className={"wrapper"}>
                <form className={"author_form"} onSubmit={this.createAuthor}>
                        <label>
                            {localization.locale[this.state.lang].pseudonym}
                        </label>
                        <input
                            required
                            onChange={this.handleChange}
                            type="text"
                            name="pseudonym"
                            minLength={1}
                            maxLength={120}
                            value={this.state.author.pseudonym}
                            placeholder={localization.locale[this.state.lang].pseudonymPlaceHolder} />
                    {this.state.errorPseudonym != null && (
                        <div className={"error_validation"}>
                            {localization.locale[this.state.lang].pseudonymTaken}
                        </div>
                    )}
                        <textarea
                            value={this.state.author.description}
                            required
                            name="description"
                            minLength={10}
                            maxLength={1200}
                            onChange={this.handleChange}
                            placeholder={localization.locale[this.state.lang].descriptionPlaceHolder}
                            style={{ height: '300px', bottom: 30}}
                        />
                    <label>
                        {localization.locale[this.state.lang].loadPhoto}
                    </label>
                    <input
                        type="file"
                        onChange={this.uploadImg}
                        name="file"
                        accept={".jpg"}
                    />
                    <input type={"submit"}
                           className={"action_btn"}
                           value={localization.locale[this.state.lang].save}
                    />
                </form>
            </div>
        );
    }
}
export default AuthorForm;