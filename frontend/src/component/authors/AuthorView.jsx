import React, {useEffect, useState} from 'react';
import '../../styles/common/common.sass'
import '../../styles/author/authors.sass'
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import {render} from "react-dom";
import AuthorItem from "./AuthorItem";
function AuthorView() {

    let {id} = useParams();
    const[author, setAuthor] = useState(
        {
            id:'',
            pseudonym: '',
            description: '',
            imageName : '',
        }
    )


    useEffect(() => {
        const url = "/authors/"
        axios.get(url + id).then((response)=>{
            setAuthor(response.data)
        })
    }, []);

    function deleteAuthor(id) {
        const url = "/authors/";
        axios.delete((url, id) =>{
        }).then((response)=>{
            setAuthor(response.data)
        }).catch((error) => {

        })
    }

    return (
        <div className={"wrapper"} >
            <AuthorItem value={author}/>
        </div>
    );
}

export default AuthorView;