import React, {useState} from "react";
import {Link} from "react-router-dom";
import BookLocalization from "../localization/BookLocalization";
import LangUtil from "../../service/LangUtil";

function BookAdminList(props) {

    const books = props.value;
    let [lang] = useState(LangUtil.getLang())

    return (
        <React.Fragment>
            {books.length !== 0 && (
            <table className={"book_list_table"}>
                <thead>
                <tr>
                    <th>
                        {BookLocalization.locale[lang].id}
                    </th>
                    <th>
                        {BookLocalization.locale[lang].name}
                    </th>
                    <th>
                        {BookLocalization.locale[lang].amountPages}
                    </th>
                    <th>
                        {BookLocalization.locale[lang].price}
                    </th>
                    <th>
                        {BookLocalization.locale[lang].inStock}
                    </th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.name}</td>
                        <td>{book.amountPages}</td>
                        <td>{book.price}</td>
                        <td>{book.inStock ? "Да" : "Нет"}</td>
                        <td>
                            <Link to={{
                                pathname : "/books/" + book.id
                            }}>
                                {BookLocalization.locale[lang].see}
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>)}
        </React.Fragment>

    )
}

export default BookAdminList;