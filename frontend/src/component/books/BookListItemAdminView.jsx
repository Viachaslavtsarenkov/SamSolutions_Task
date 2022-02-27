import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function BookListItemAdminView(props) {

    let [book, setBook] = useState({});

    useEffect(() => {
        setBook(props.value)
    }, []);

    return (
        <tr>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td>{book.amount}</td>
            <td>{book.inStock}</td>
            <td>{book.price}</td>
            <td>
                <Link to={{
                    pathname : "/books/" + book.id
                }}> Посмотреть</Link>
            </td>
        </tr>
    )
}

export default BookListItemAdminView;