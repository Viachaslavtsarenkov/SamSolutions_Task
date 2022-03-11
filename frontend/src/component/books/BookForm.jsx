import './../../styles/book/book.sass';
import './../../styles/common/common.sass'
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, Redirect, useParams} from "react-router-dom";
import AuthorizationService from "../../service/AuthorizationService";

function BookForm() {

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
        inStock : false,
        cart: [],
        sales: [],
        payments: [],
        authors : [],
        genres : [],
    })

    let {id} = useParams();
    let [url,setURL] = useState("/books")
    let [file, setFile] = useState(null);
    let [searchString, setSearchString] = useState('');
    let [authors, setAuthors] = useState([{
        id : '',
        pseudonym : '',
        description : ''
    }])
    let[isRedirect, setIsRedirect] = useState(false);

    function getBook(id) {
        const url = "/books/";
        setURL(url + id)
        axios.get(url + id).then((response)=>{
            setBook(response.data);
        }).catch((error) => {
            setURL("/error")
            setIsRedirect(true)
        })
    }

    useEffect(() => {
        if(id !== undefined) {
            getBook(id);
            turnGenres();
        }
        }, []);

    function uploadImage(event) {
        setFile(event.target.files[0])
    }

    function turnGenres() {
        const container_genres = document.querySelector(".genres");
        container_genres.childNodes.forEach((node) => {
            let currentGenre = book.genres.find((f) => {
               return f.genre === +node.dataset.genre;
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
                   return f.genre !== +genre
               })
            })
        } else {
            setBook({
                ...book,
                'genres': [...book.genres,
                    {'genre' : genre}
                ]
            })
            e.target.classList.add("active_genre")
        }
    }

    function turnAuthorPanel(e) {
        const authorOverlay= document.querySelector(".overlay")
        const authorPanel= document.querySelector(".author_panel")
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
            alert("Выберите жанр");
        } else if(book.authors.length === 0) {
            alert("Выберите автора");
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
                if(book.id === undefined) {
                    setURL("/books/" + response.data.message)
                } else {
                    setURL("/books/" + book.id)
                }
                setIsRedirect(true)
            })
        }
    }

    function addAuthor(e) {
        const list = document.getElementById('authors_datalist')
        const searcher = document.querySelector('.authors_input_search');
        let index = list.options.namedItem(searcher.value).getAttribute('data-index');
        e.preventDefault();
        if(!book.authors.includes(authors[index])) {
        let currentAuthor = [...book.authors, authors[index]];
            setBook({
                ...book,
                authors : currentAuthor
            })
        } else {
            alert("Данный автор уже добавлен")
        }
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

    if(!AuthorizationService.currentUserHasRole("ADMIN")) {
        return <Redirect to={"/"}/>
    }
    if(isRedirect) {
        return <Redirect to={url}/>
    }

    return (

        <div>
            {book.id !== '' ? turnGenres() : ''}
            <form className={"book_form"} onSubmit={saveBook}>
                <label>Название</label>
                <input type={"text"}
                       required
                       maxLength={100}
                       onChange={updateBook}
                       name={"name"}
                       value={book.name}
                />
                <label>Описание</label>
                <textarea type={"text"}
                          required
                          maxLength={1200}
                          onChange={updateBook}
                          className={"description"}
                          name={"description"}
                          value={book.description}
                />
                <label>Жанр</label>
                <div className={"genres"}>
                    <div className={"genre"}
                         data-genre={"0"}
                         onClick={chooseGenre}
                    >Исскуство</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"1"}>Автобиография</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"2"}>Биография</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"3"}>
                        Бизнесс литература
                    </div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"4"}>Кулинария</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"5"}>Словари</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"6"}>Энциклопедии</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"7"}>Справочники</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"8"}>Здоровье</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"9"}>История</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"10"}>Философия</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"11"}>Наука</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"12"}>Религия</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"13"}>Преключения</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"14"}>Детская литература</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"15"}>Классическая литература</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"16"}>Драма</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"17"}>Сказки</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"18"}>Фэнтези</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"19"}>Фэнтези</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"20"}>Ужасы</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"21"}>Мистика</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"23"}>Поэмы</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"24"}>Романы</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"25"}>Триллеры</div>
                </div>
                <label>Год издания</label>
                <input
                    required
                    pattern="^[0-9]+$"
                    onChange={updateBook}
                    name={"publishedYear"}
                    maxLength={4}
                    value={book.publishedYear}
                    type={"text"}/>

                <label>Авторы</label>
                <div type={"button"} className={"author_btn"} onClick={turnAuthorPanel}>Выбрать авторов</div>
                <div className={"overlay panel_hidden"} onClick={turnAuthorPanel}>
                </div>
                    <div className={"author_panel panel_hidden"}>
                        <div className={"book_author_search"}>
                            <input className={"authors_input_search"}
                                   list={"authors_datalist"}
                                   onChange={updateSearch}
                            />
                            <datalist id="authors_datalist">
                                {authors.map((author, index) => (
                                    <option data-index={index} name={author.pseudonym} value={author.pseudonym}/>
                                ))}
                            </datalist>

                            <input type={"button"}
                                   value={"Добавить"}
                                   onClick={addAuthor}/>
                        </div>
                        <div className={"book_authors_list"}>
                            {book.authors.map((author, index) => (
                                <div className={"book_author_item"}>
                                    <p>{author.id} {author.pseudonym}</p>
                                    <input type="button" value="Удалить" onClick={deleteAuthor} data-index={index}/>
                                </div>
                            ))}
                        </div>
                        <div onClick={turnAuthorPanel}>+</div>
                    </div>
                <label>Вес</label>
                <input type={"text"}
                       onChange={updateBook}
                       required
                       pattern="^[0-9]+$"
                       maxLength={5}
                       value={book.weight}
                       name={"weight"}
                />
                <label>Переплет</label>
                <input type={"text"}
                       required
                       maxLength={40}
                       onChange={updateBook}
                       name={"materialCover"}
                       value={book.materialCover}
                />
                <label>Количество страниц</label>
                <input type={"text"}
                       required
                       pattern="^[0-9]+$"
                       maxLength={4}
                       onChange={updateBook}
                       name={"amountPages"}
                       value={book.amountPages}
                />
                <label>Фото</label>
                <input type={"file"}
                       accept={"jpg"}
                       onChange={uploadImage}
                    name={"image"}
                />
                <label>Цена</label>
                <input type={"price"}
                       required
                       pattern="^\d+(.)\d{0,2}$"
                       value={book.price}
                       onChange={updateBook}
                       name={"price"}
                />
                <input type={"submit"} value={"Сохранить"}
                       className={"save_btn"}/>
            </form>
        </div>
    )
}
export default BookForm;