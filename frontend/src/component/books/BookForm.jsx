import './../../styles/book/book.sass';
import './../../styles/common/common.sass'
import axios from "axios";
import {useState} from "react";

function BookForm() {

    let book = {
        name : '',
        description : '',
        genre : [],
        published_year : '',
        authors : [],
        weight : '',
        material_cover : '',
        amount_pages : '',
        price : ''
    }

    let [searchString, setSearchString] = useState('');

    let authors = {

    }

    function findAuthors(e) {

        axios.get('/authors/search?searchString=' + searchString).then(
            (response) => {
                
                console.log(response.data)
            });
    }

    function chooseGenre(e) {
        e.preventDefault();
        let genre = e.target.getAttribute("value");
        if(e.target.classList.contains("active_genre")) {
            e.target.classList.remove("active_genre");
            delete book.genre[genre];
        } else {
            book.genre[genre] = genre
            e.target.classList.add("active_genre")
        }
    }

    function turnAuthorPanel(e) {
        const authorPanel = document.querySelector(".author_panel")
        authorPanel.classList.toggle("panel_hidden")
    }

    function updateSearch(e) {
        setSearchString(e.target.value);
    }

    return (
        <div>
            <form className={"book_form"}>
                <label>Название</label>
                <input type={"text"}
                       required
                       name={"name"}
                />
                <label>Описание</label>
                <textarea type={"text"}
                       required
                          className={"description"}
                       name={"description"}
                />
                <label>Жанр</label>
                <div className={"genres"}>
                    <div className={"genre"}
                         value={"0"}
                         onClick={chooseGenre}
                    >Исскуство</div>
                    <div className={"genre"}
                         value={"1"}
                         onClick={chooseGenre}
                         name={"AUTOBIOGRAPHY"}>Автобиография</div>
                    <div className={"genre"}
                         onClick={chooseGenre}
                         value={"2"}
                         name={"BIOGRAPHY"}>Биография</div>
                    <div className={"genre"}
                         value={"3"}
                         onClick={chooseGenre}
                         name={"BUSINESS"}>Бизнесс литература</div>
                    <div className={"genre"}
                         value={"4"}
                         onClick={chooseGenre}
                         name={"COOKBOOK"}>Кулинария</div>
                    <div className={"genre"}
                         value={"5"}
                         onClick={chooseGenre}
                         name={"DICTIONARY"}>Словари</div>
                    <div className={"genre"}
                         value={"6"}
                         onClick={chooseGenre}
                         name={"ENCYCLOPEDIA"}>Энциклопедии</div>
                    <div className={"genre"}
                         value={"7"}
                         onClick={chooseGenre}
                         name={"GUIDE"}>Справочники</div>
                </div>
                <label>Год издания</label>
                <input type={"text"}/>
                <label>Авторы</label>
                <div type={"button"} className={"author_btn"} onClick={turnAuthorPanel}>Выбрать авторов</div>
                <div className={"author_panel panel_hidden"}>
                    <input type={"text"} onChange={updateSearch} />
                    <input type={"button"} value={"Найти"} onClick={findAuthors}/>
                    <div onClick={turnAuthorPanel}>Закрыть</div>
                </div>
                <label>Вес</label>
                <input type={"text"}
                    required
                       name={"weight"}
                />
                <label>Переплет</label>
                <input type={"text"}
                       required
                       name={"material_cover"}
                />
                <label>Количество страниц</label>
                <input type={"text"}
                       required
                       name={"amount_pages"}
                />
                <label>Фото</label>
                <input type={"file"}
                    name={"image"}
                />
                <label>Цена</label>
                <input type={"price"}
                       required
                       name={"price"}
                />
                <input type={"button"} value={"Сохранить"} className={"save_btn"}/>
            </form>
        </div>
    )
}
export default BookForm;