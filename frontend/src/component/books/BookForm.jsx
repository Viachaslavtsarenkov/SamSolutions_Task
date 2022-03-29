import './../../styles/book/book.sass';
import './../../styles/common/common.sass'
import axios from "axios";
import React, {useEffect, useState} from "react";
import '../../styles/common/search.sass'
import {Link, Redirect, useParams} from "react-router-dom";
import AuthorizationService from "../../service/AuthorizationService";
import validationLocalization from  '../localization/ValidationLocalization';

function BookForm() {

    let [lang, setLang] = useState("ru");

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
    let [file, setFile] = useState(null);
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
        }, [book, newAuthor]);

    function uploadImage(event) {
        setFile(event.target.files[0])
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

    function turnAuthorPanel(e) {
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
                alert("Сохранено");
               //  setURL(book.id !== ''
               //    ? url.concat("/",id)
             //      : url.concat("/",response.data.message));
               //  setIsRedirect(true);
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
           alert("Данный автор уже добавлен")
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
                <label>Название</label>
                <input type={"text"}
                       required
                       onChange={updateBook}
                       name={"name"}
                       pattern={"[0-9a-zA-ZА-ЯЁа-яё ]{1,}"}
                       title={validationLocalization.locale[lang].bookNameValidation}
                       value={book.name}
                />
                <label>Описание</label>
                <textarea type={"text"}
                          required
                          maxLength={1200}
                          onChange={updateBook}
                          className={"description"}
                          name={"description"}
                          pattern={"[0-9a-zA-ZА-ЯЁа-яё]{1,}"}
                          title={validationLocalization.locale[lang].descriptionValidation}
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
                        Бизнес литература
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
                         data-genre={"13"}>Приключения</div>
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
                         data-genre={"19"}>Ужасы</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"20"}>Мистика</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"21"}>Поэмы</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"22"}>Романы</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"23"}>Триллеры</div>
                </div>
                <label>Год издания</label>
                <input
                    required
                    onChange={updateBook}
                    name={"publishedYear"}
                    pattern={"[0-9]{1,4}"}
                    title={validationLocalization.locale[lang].yearValidation}
                    value={book.publishedYear}
                    type={"text"}/>
                <label>Авторы</label>
                <div type={"button"}
                     className={"author_btn"}
                     onClick={turnAuthorPanel}>Выбрать авторов</div>
                <label>Вес</label>
                <input type={"text"}
                       onChange={updateBook}
                       required
                       pattern={"[0-9]{1,4}"}
                       title={validationLocalization.locale[lang].weightValidation}
                       value={book.weight}
                       name={"weight"}

                />
                <label>Переплет</label>
                <input type={"text"}
                       required
                       onChange={updateBook}
                       name={"materialCover"}
                       value={book.materialCover}
                       pattern={"[a-zA-ZА-ЯЁа-яё]{1,50}"}
                       title={validationLocalization.locale[lang].descriptionValidation}
                />
                <label>Количество страниц</label>
                <input type={"text"}
                       required
                       pattern={"[0-9]{1,4}"}
                       title={validationLocalization.locale[lang].pagesValidation}
                       onChange={updateBook}
                       name={"amountPages"}
                       value={book.amountPages}
                />
                <label>Фото</label>
                <input type={"file"}
                       accept={"jpg"}
                       max={4}
                       onChange={uploadImage}
                    name={"image"}
                />
                <label>Цена</label>
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
                            {authors.map((author, index) => (
                                <option value={author.id + "." + author.pseudonym}/>
                            ))}
                        </datalist>

                        <input type={"button"}
                               value={"Добавить"}
                               onClick={addAuthor}/>
                    </div>
                    <div className={"search_list"}>
                        {book.authors.map((author, index) => (
                            <div className={"search_item"}>
                                <p>{author.id} {author.pseudonym}</p>
                                <input type="button" value="Удалить" onClick={deleteAuthor} data-index={index}/>
                            </div>
                        ))}
                    </div>
                </div>
                <input type={"submit"} value={"Сохранить"}
                       className={"save_btn"}/>
            </form>

        </div>
    )
}
export default BookForm;