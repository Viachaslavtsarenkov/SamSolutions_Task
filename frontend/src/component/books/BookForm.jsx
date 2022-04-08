import './../../styles/book/book.sass';
import './../../styles/common/common.sass'
import axios from "axios";
import React, {useEffect, useState} from "react";
import '../../styles/common/search.sass'
import {Redirect, useParams} from "react-router-dom";
import AuthorizationService from "../../service/AuthorizationService";
import validationLocalization from  '../localization/ValidationLocalization';
import bookLocalization from "../localization/BookLocalization";
import GenrePanel from "./GenrePanel";

function BookForm() {

    let [lang] = useState("ru");

    let [book, setBook] = useState({
        id : '',
        name : '',
        description : '',
        publishedYear : '',
        weight : '',
        materialCover : '',
        amountPages : '',
        imageName : '',
        price : '',
        inStock : true,
        cart: [],
        sales: [],
        payments: [],
        authors : [],
        genres : [],
    })

    let {id} = useParams();
    let [url,setURL] = useState("/books")
    let [file] = useState(null);
    let [searchString, setSearchString] = useState('');
    let [authors, setAuthors] = useState([{
        id : '',
        pseudonym : '',
        description : ''
    }])
    let [isRedirect, setIsRedirect] = useState(false);
    let [newAuthor, setNewAuthor] = useState({});

    function getBook(id) {
        const url = "/books/";
        setURL(url + id)
        axios.get(url + id).then((response)=>{
            setBook(response.data);
        }).catch(() => {
            setURL("/404")
            setIsRedirect(true)
        })
    }

    useEffect(() => {
        if(id !== undefined) {
            getBook(id);
            turnGenres();
        }
        }, [newAuthor]);

    function uploadImage(event) {
        alert(event.target.files[0].size )
        if(event.target.files[0].size < 2000000) {
            this.setState({file:event.target.files[0]})
        } else {
            alert("Размер файла должен быть меньше 2мб")
            event.target.value = "";
        }
    }

    function turnGenres() {
        const container_genres = document.querySelector(".genres");
        container_genres.childNodes.forEach((node) => {
            let currentGenre = book.genres.find((f) => {
               return f.id === +node.dataset.genre;
            })
            if(currentGenre !== undefined) {
                node.classList.add("active_genre");
            }
        })
    }

    function findAuthors() {
        axios.get('/authors/search?searchString=' + searchString)
            .then((response) => {
                setAuthors(response.data)
            });
    }

    function chooseGenre(e) {
        e.preventDefault();
        let genre = e.target.dataset.genre;
        if(e.target.classList.contains("active_genre")) {
            e.target.classList.remove("active_genre");
            setBook({
                ...book,
               'genres': book.genres.filter(function(f) {
                   return f.id !== +genre
               })
            })
        } else {
            setBook({
                ...book,
                'genres': [...book.genres,
                    {'id' : +genre}
                ]
            })
            e.target.classList.add("active_genre")
        }
    }

    function turnAuthorPanel() {
        const authorOverlay= document.querySelector(".overlay")
        const authorPanel= document.querySelector(".search_panel")
        authorPanel.classList.toggle("panel_hidden")
        authorOverlay.classList.toggle("panel_hidden")
    }

    function updateSearch(e) {
        setSearchString(e.target.value);
        findAuthors();
    }

    function updateBook(e) {
        let option = e.target.name;
        setBook({...book,
           [option] : e.target.value
        })
    }

    function saveBook(e) {
        e.preventDefault();
        if(book.genres.length === 0) {
            alert(bookLocalization.locale[lang].msgGenre);
        } else if(book.authors.length === 0) {
            alert(bookLocalization.locale[lang].msgAuthor);
        } else {
            const formData = new FormData();
            formData.append("book",
                new Blob([JSON.stringify(book)], {
                    type: "application/json"
                }));
            formData.append("image", file)
            axios({
                method: 'post',
                url: url,
                data: formData,
                header: {
                    "Content-Type": undefined
                },
            }).then(function (response) {
                alert(bookLocalization.locale[lang].msgSaved);
                 setURL(book.id !== ''
                   ? url.concat("/",id)
                   : url.concat("/",response.data.message));
                 setIsRedirect(true);
            })
        }
    }

    function addAuthor(e) {
       e.preventDefault();
       const searcher = document.querySelector('.input_search_connection');
       let idAuthor = searcher.value.split(".")[0];
       if(!checkAuthor(idAuthor)) {
           getAuthor(idAuthor);
           let currentAuthor = [...book.authors, newAuthor];
           setBook({
               ...book,
               authors : currentAuthor
           })
       } else {
           alert(bookLocalization.locale[lang].authorAlreadyAdded)
       }
    }

    function checkAuthor(idAuthor) {
        let result = false
        book.authors.forEach((author)=> {
            if(+author.id === +idAuthor) {
                result = true;
            }
        })
        return result;
    }

    function deleteAuthor(e) {
       let indexAuthor = +e.target.dataset.index;
        setBook({
            ...book,
            'authors': book.authors.filter(function(f, index) {
                return index !== indexAuthor
            })
        })
    }

    function getAuthor(idAuthor) {
        axios.get("/authors/" + idAuthor)
            .then((response) => {
                setNewAuthor(response.data);
        })
    }

    if(!AuthorizationService.currentUserHasRole("ROLE_ADMIN")) {
        return <Redirect to={"/"}/>
    }
    if(isRedirect) {
        return <Redirect to={url}/>
    }

    return (

        <div>
            <form className={"book_form"} onSubmit={saveBook}>
                <label>
                    {bookLocalization.locale[lang].name}
                </label>
                <input type={"text"}
                       required
                       onChange={updateBook}
                       name={"name"}
                       pattern={"[0-9a-zA-ZА-ЯЁа-яё ]{1,}"}
                       title={validationLocalization.locale[lang].bookNameValidation}
                       value={book.name}
                />
                <label>
                    {bookLocalization.locale[lang].description}
                </label>
                <textarea required
                          maxLength={1200}
                          onChange={updateBook}
                          className={"description"}
                          name={"description"}
                          title={validationLocalization.locale[lang].descriptionValidation}
                          value={book.description}
                />
                <label>
                    {bookLocalization.locale[lang].genreTitle}
                </label>
                <GenrePanel chooseGenre={chooseGenre}/>
                <label>
                    {bookLocalization.locale[lang].publishedYear}
                </label>
                <input
                    required
                    onChange={updateBook}
                    name={"publishedYear"}
                    pattern={"[0-9]{1,4}"}
                    title={validationLocalization.locale[lang].yearValidation}
                    value={book.publishedYear}
                    type={"text"}/>
                <label>
                    {bookLocalization.locale[lang].authorTitle}
                </label>
                <div className={"author_btn"}
                     onClick={turnAuthorPanel}>
                    {bookLocalization.locale[lang].chooseAuthor}
                </div>
                <label>
                    {bookLocalization.locale[lang].weight}
                </label>
                <input type={"text"}
                       onChange={updateBook}
                       required
                       pattern={"[0-9]{1,4}"}
                       title={validationLocalization.locale[lang].weightValidation}
                       value={book.weight}
                       name={"weight"}

                />
                <label>
                    {bookLocalization.locale[lang].materialCover}
                </label>
                <input type={"text"}
                       required
                       onChange={updateBook}
                       name={"materialCover"}
                       value={book.materialCover}
                       pattern={"[a-zA-ZА-ЯЁа-яё]{1,50}"}
                       title={validationLocalization.locale[lang].descriptionValidation}
                />
                <label>
                    {bookLocalization.locale[lang].amountPages}
                </label>
                <input type={"text"}
                       required
                       pattern={"[0-9]{1,4}"}
                       title={validationLocalization.locale[lang].pagesValidation}
                       onChange={updateBook}
                       name={"amountPages"}
                       value={book.amountPages}
                />
                <label>
                    {bookLocalization.locale[lang].picture}
                </label>
                <input type={"file"}
                       accept={"jpg"}
                       max={4}
                       onChange={uploadImage}
                    name={"image"}
                />
                <label>
                    {bookLocalization.locale[lang].price}
                </label>
                <input type={"price"}
                       required
                       pattern="(0\.((0[1-9]{1})|([1-9]{1}([0-9]{1})?)))|(([1-9]+[0-9]*)(\.([0-9]{1,2}))?)"
                       title={validationLocalization.locale[lang].priceValidation}
                       value={book.price}
                       onChange={updateBook}
                       name={"price"}
                />
                <div className={"overlay panel_hidden"}
                       onClick={turnAuthorPanel}>
                 </div>
                <div className={"search_panel panel_hidden"}>
                    <div className={"search_container"}>
                        <input className={"input_search_connection"}
                               list={"search_result_datalist"}
                               onChange={updateSearch}
                        />
                        <datalist id="search_result_datalist">
                            {authors.map((author) => (
                                <option value={author.id + "." + author.pseudonym}/>
                            ))}
                        </datalist>

                        <input type={"button"}
                               value={bookLocalization.locale[lang].addBtn}
                               onClick={addAuthor}/>
                    </div>
                    <div className={"search_list"}>
                        {book.authors.map((author, index) => (
                            author.id !== undefined && (
                                    <div className={"search_item"} key={index}>
                                        <p>{author.id} {author.pseudonym}</p>
                                        <input type="button"
                                               value={bookLocalization.locale[lang].deleteBtn}
                                               onClick={deleteAuthor} data-index={index}/>
                                    </div>)

                        ))}
                    </div>
                </div>
                <input type={"submit"}
                       value={bookLocalization.locale[lang].saveBtn}
                       className={"save_btn"}/>
            </form>

        </div>
    )
}
export default BookForm;