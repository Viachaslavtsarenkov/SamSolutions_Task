import React from 'react';
import axios from 'axios';
import '../../styles/common/common.sass'
import '../../styles/author/authors.sass'
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
class AuthorsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authors: [
                {id : '',
                pseudonym : '',
                description: '',
                }],
            page : 0,
            totalPages: 0
        }
    }

    componentDidMount() {
        this.loadAuthors();
    }


    loadAuthors() {
        let url = '/authors?page=' + this.state.page;
        axios.get(url).then(
            (response) => {
                this.setState({
                    authors: response.data['authors'],
                    totalPages : response.data['totalPages']
                })
                console.log("pages" + response.data['totalPages'])
            }
        );
    }


    render() {
        const authors = this.state.authors;

        return (
            <div className={"wrapper"}>
                <Link to={"/authors/new"} className={"add_btn"}>Добавить</Link>
                <Table striped bordered hover variant="light" className={"authors_list"}>
                    <thead>
                        <tr>
                            <th>Идентификатор</th>
                            <th>Псевдоним</th>
                            <th>Описание</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.map((author) => (
                            <tr>
                                <td>
                                    {author.id}
                                </td>
                                <td>
                                    {author.pseudonym}
                                </td>
                                <td>
                                    {author.description}
                                </td>
                                <td>
                                    <Link to={{
                                            pathname: "authors/" + author.id,
                                            state: author
                                        }}>
                                        Посмотреть
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="pagination">
                    <button onClick={() => (this.setState({page: this.state.page + 1}))} className="page">
                        &larr;
                    </button>
                    {[...Array(this.state.totalPages).keys()].map((el) => (
                        <button
                            onClick={() => this.setState({page : el})}
                        >{el + 1} </button>
                    ))}
                    <button onClick={() => (this.setState({page: this.state.page + 1}))} className="page">
                        &rarr;
                    </button>
                </div>
            </div>
        )
    }
}

export default AuthorsList;