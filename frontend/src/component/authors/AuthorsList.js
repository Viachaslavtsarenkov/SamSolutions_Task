import React from 'react';
import axios from 'axios';
import '../../styles/author.css'
class AuthorsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authors: [{id : '', name : '',surname : '', dateOfBirth: ''}],
        }
    }

    componentDidMount() {
        this.loadAuthors();
    }

    loadAuthors() {
        axios.get('/authors').then(
            (response) => {
                this.setState({
                    authors: response.data
                });
            }
        );
    }


    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Идентификатор</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Отчество</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.authors.map((author) => (
                            <tr>
                                <td>
                                    {author.id}
                                </td>
                                <td>
                                    {author.name}
                                </td>
                                <td>
                                    {author.surname}
                                </td>
                                <td>
                                    {author.dateOfBirth}
                                </td>
                            </tr>


                        ))}
                    </tbody>

                </table>
            </div>

        )
    }
}

export default AuthorsList;