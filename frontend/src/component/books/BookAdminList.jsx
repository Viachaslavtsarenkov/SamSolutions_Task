import React from "react";
import {Link} from "react-router-dom";

function BookAdminList(props) {

    const books = props.value;

    return (
        <table className={"book_list_table"}>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Количество страниц</th>
                <th>Цена</th>
                <th>В наличии</th>
                <th>Действие</th>
            </tr>
            {books.map((book, index) => (
                <tr>
                    <td>{book.id}</td>
                    <td>{book.name}</td>
                    <td>{book.amountPages}</td>
                    <td>{book.price}</td>
                    <td>{book.inStock ? "Да" : "Нет"}</td>
                    <td>
                        <Link to={{
                            pathname : "/books/" + book.id
                        }}> Посмотреть</Link>
                    </td>
                </tr>
            ))}
        </table>
    )
}

export default BookAdminList;