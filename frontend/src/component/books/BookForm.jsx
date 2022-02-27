import './../../styles/book/book.sass';
import './../../styles/common/common.sass'
import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

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

    function getBook(id) {
        const url = "/books/";
        setURL(url + id)
        axios.get(url + id).then((response)=>{
            setBook(response.data);
        }).catch((error) => {

        })
    }

    useEffect(() => {
            getBook(id);
        }, []);

    function uploadImage(event) {
        setFile(event.target.files[0])
    }

    function turnGenres() {
        const container_genres = document.querySelector(".genres");
        container_genres.childNodes.forEach((node) => {
            let currentGenre = book.genres.find((f) => {
               return f.genre === node.dataset.genre;
            })
            console.log(currentGenre)
            if(currentGenre !== undefined) {
                console.log(currentGenre)
                node.classList.add("active_genre");

            }
        })
    }

    function findAuthors() {
        axios.get('/authors/search?searchString=' + searchString).then(
            (response) => {
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
                   return f.genre !== genre
               })
            })
        } else {
            setBook({
                ...book,
                'genres': [...book.genres, {'genre' : genre}]
            })
            e.target.classList.add("active_genre")
        }
    }

    function turnAuthorPanel(e) {
        const authorPanel = document.querySelector(".author_panel")
        authorPanel.classList.toggle("panel_hidden")
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

    function createBook(e) {
        e.preventDefault();
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
        }).catch(function (response) {
        });
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

    return (
        <div>
            <form className={"book_form"} onSubmit={createBook}>
                <label>Название</label>
                <input type={"text"}
                       required
                       onChange={updateBook}
                       name={"name"}
                       value={book.name}
                />
                <label>Описание</label>
                <textarea type={"text"}
                          required
                          onChange={updateBook}
                          className={"description"}
                          name={"description"}
                          value={book.description}
                />
                <label>Жанр</label>
                <div className={"genres"}>
                    <div className={"genre"}
                         data-genre={"ART"}
                         onClick={chooseGenre}
                    >Исскуство</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"AUTOBIOGRAPHY"}>Автобиография</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"BIOGRAPHY"}>Биография</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"BUSINESS"}>
                        Бизнесс литература
                    </div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"COOKBOOK"}>Кулинария</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"DICTIONARY"}>Словари</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"ENCYCLOPEDIA"}>Энциклопедии</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"GUIDE"}>Справочники</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"HEALTH"}>Здоровье</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"HISTORY"}>История</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"PHILOSOPHY"}>Философия</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"SCIENCE"}>Наука</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"RELIGION"}>Религия</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"ADVENTURE"}>Преключения</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"KINDS"}>Детская литература</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"CLASSIC"}>Классическая литература</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"DRAMA"}>Драма</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"FAIRYTALE"}>Сказки</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"FANTASY"}>Фэнтези</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"FANTASY"}>Фэнтези</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"HORROR"}>Ужасы</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"MYSTERY"}>Мистика</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"POETRY"}>Поэмы</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"ROMANCE"}>Романы</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         data-genre={"THRILLER"}>Триллеры</div>
                </div>
                <label>Год издания</label>
                <input
                    required
                    onChange={updateBook}
                    name={"publishedYear"}
                    value={book.publishedYear}
                    type={"text"}/>

                <label>Авторы</label>
                <div type={"button"} className={"author_btn"} onClick={turnAuthorPanel}>Выбрать авторов</div>
                <div className={"author_panel panel_hidden"}>
                    <div className={"author_list"}>
                        <input className={"authors_input_search"} list={"authors_datalist"} onChange={updateSearch} />
                        <datalist id="authors_datalist">
                            {authors.map((author, index) => (
                                <option data-index={index} name={author.pseudonym} value={author.pseudonym}/>
                            ))}
                        </datalist>
                    </div>
                    <input type={"button"} onClick={addAuthor}/>
                    <div onClick={turnAuthorPanel}>Закрыть</div>
                </div>
                <label>Вес</label>
                <input type={"text"}
                       onChange={updateBook}
                       required
                       value={book.weight}
                       name={"weight"}
                />
                <label>Переплет</label>
                <input type={"text"}
                       required
                       onChange={updateBook}
                       name={"materialCover"}
                       value={book.materialCover}
                />
                <label>Количество страниц</label>
                <input type={"text"}
                       required
                       onChange={updateBook}
                       name={"amountPages"}
                       value={book.amountPages}
                />
                <label>Фото</label>
                <input type={"file"}
                       onChange={uploadImage}
                    name={"image"}
                />
                <label>Цена</label>
                <input type={"price"}
                       required
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