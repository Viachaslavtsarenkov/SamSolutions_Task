import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../../styles/common/common.sass'
import '../../styles/author/authors.sass'
import {Table} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import Pagination from "../commom/Pagination";
import AuthorizationService from "../../service/AuthorizationService";
import {useHistory} from "react-router-dom"
import Util from "../../service/Util";
import localization from '../localization/AuthorLocalization';
import loading from "../../icon/loading.gif";

function AuthorsList() {

    let lang = "ru";
    const history = useHistory()
    let [page, setPage] = useState(Util.getPage);
    let [authors, setAuthors] = useState([{}]);
    let [totalPages, setTotalPages] = useState(-1);


    useEffect(() => {
        if(page !== 0) {
            toPage(page);
        }
        loadAuthors();
    }, [page])


    function toPage(el) {
        Util.setUrl(Util.setPageParam(el),history)
        setPage(el);
    }

    function loadAuthors() {
        axios.get("/authors?" + Util.getPageParam()).then(
            (response) => {
                setAuthors(response.data['authors']);
                setTotalPages(response.data['totalPages']);
            }
        );
    }

    if(!AuthorizationService.currentUserHasRole("ROLE_ADMIN")) {
        return <Redirect to={"/"}/>
    }
    return (
        <div className={"wrapper"}>
            <Link to={"/authors/new"} className={"add_btn"}>
                {localization.locale[lang].add}
            </Link>
            {totalPages > 0 && (
                <div>
                    <Table striped bordered hover variant="light" className={"authors_list"}>
                    <thead>
                        <tr>
                            <th>{localization.locale[lang].id}</th>
                            <th>{localization.locale[lang].pseudonym}</th>
                            <th>{localization.locale[lang].description}</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.map((author) => (
                            <tr key={author.id}>
                                <td>
                                    {author.id}
                                </td>
                                <td>
                                    {author.pseudonym}
                                </td>
                                <td>
                                    {author.description.substring(0, 50)}...
                                </td>
                                <td>
                                    <Link to={{
                                        pathname: "authors/" + author.id
                                    }}>
                                        {localization.locale[lang].see}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </div>)}
            {totalPages === 0 && (
                <p>Список авторов пуст</p>
            )}
            {totalPages === -1 && (
                <div className={"loading_container"}>
                    <img src={loading} width={50} alt={"loading"}/>
                </div>
            )}
            {totalPages >= 0 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    toPage={toPage}
                />
            )}
        </div>
    );

}

export default AuthorsList;