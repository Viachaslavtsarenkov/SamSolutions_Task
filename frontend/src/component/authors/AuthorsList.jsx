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
        }
    }

    componentDidMount() {
        this.loadAuthors();
    }

    loadAuthors() {
        axios.get('/authors/').then(
            (response) => {
                this.setState({
                    authors: response.data
                });
            }
        );
    }


    render() {
        return (
            <div className={"wrapper"}>
                <Link to={"/authors/new"}>Добавить</Link>
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
                        {this.state.authors.map((author) => (
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
            </div>
        )
    }
}

export default AuthorsList;