import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function BookItemCustomerView(props) {

    let [book, setBook] = useState({});

    useEffect(() => {
        setBook(props.value)
    }, []);

    return (
        <div className={"book_user_item"}>
            <img src={book.imageName} width={120} height={120} />
            <h2 className={"book_item_name"}>{book.name}</h2>
            <p className={"book_item_price"}>{book.price}</p>
            <Link className = "show_book_item_btn" to={{
                pathname: "/books/" + book.id
            }
            }> Посмотреть</Link>
        </div>
    )
}

export default BookItemCustomerView;