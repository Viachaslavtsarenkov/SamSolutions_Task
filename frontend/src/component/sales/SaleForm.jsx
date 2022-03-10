import {useState} from "react";
import AuthorizationService from "../../service/AuthorizationService";
import axios from "axios";


function SaleForm() {

    let [sale, setSale] = useState({
        name :'',
        startDate : '',
        endDate : '',
        discountFactor: '',
        books : []
    })

    let [books, setBooks] = useState([]);

    function saveSale(e) {
        e.preventDefault();
        let url = "/sales"
        axios.post(url, sale)
            .then((response) => {
                console.log("asdfghfds")
            })
            .catch((error) => {
                console.log(error.data)
            })
    }

    function changeDate(e) {
        let field = e.target.name;
        setSale({
            ...sale,
           [field] : e.target.value
        })
        console.log(sale)
    }

    return(
        <div>
            <form className={"book_form"} onSubmit={saveSale}>
                <label>Название скидки</label>
                <input
                    onChange={changeDate}
                    name={"name"}
                required
                />
                <label>Дата начала скидки</label>
                <input
                    onChange={changeDate}
                    name={"startDate"}
                    required
                    type={"date"}/>
                <label>Дата конца скидки</label>
                <input
                    onChange={changeDate}
                    name={"endDate"}
                    required
                    type={"date"}/>
                <label>Коэффициент скидки</label>
                <input
                    onChange={changeDate}
                    name={"discountFactor"}
                    required
                />
                <div className={"overlay panel_hidden"}></div>
                <label>Книги</label>
                <input type={"button"} value={"выбрать книги"}/>
                <input type={"submit"} value={"save"}/>
            </form>
        </div>
    )
}

export default SaleForm