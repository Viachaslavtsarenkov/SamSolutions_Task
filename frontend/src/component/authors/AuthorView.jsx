import React, {useEffect, useState} from 'react';
import '../../styles/common/common.sass'
import '../../styles/author/authors.sass'
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
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
        console.log(id)
        axios.get(url + id).then((response)=>{
            console.log(response.data)
            setAuthor(response.data)
        }).catch((error) => {

        })
    }, []);

    function getAuthor(id) {
        const url = "/authors/"
        axios.get((url, id) =>{
        }).then((response)=>{
            setAuthor(response.data)
        }).catch((error) => {

        })
    }

    return (
        <div className={"wrapper"} >
            <Link to={{
                pathname : "/authors/" + author.id + "/edit"
            }}>
                Редактировать
            </Link>
            {author.id}
            {author.description}
            {author.pseudonym}
            <img src={author.imageName}/>
        </div>
    );
}

export default AuthorView;