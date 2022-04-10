import {Link} from "react-router-dom";
import Locale from '../localization/BookLocalization'
import noPic from "../../icon/nopic.png";
import BookLocalization from "../localization/BookLocalization";
import {useState} from "react";
import inStock from "../../icon/instock.png"
import LangUtil from "../../service/LangUtil";
import bookLocalization from "../localization/BookLocalization";

function BookListCustomerView(props) {

    const books = props.value;
    let [lang] = useState(LangUtil.getLang())

    return (
        <>
            {books.map((book) => (
                <div className={"book_user_item"} key={book.id}>
                    <img src={book.image.imageContent === null ?
                        noPic : "data:image/jpg;base64," + book.image.imageContent} height={120} alt={"book"}/>
                    <h2 className={"book_item_name"}>{book.name}</h2>
                    {book['discounts'].length !== 0 && (
                        <div className={"book_container_price"}>
                            <p className={"old_price"}>{book.price}</p>
                            <p className={"discountPrice"}>
                                {book['discountPrice']}
                            </p>
                        </div>)}
                    {book['discounts'].length === 0 && (
                        <div className={"book_container_price"}>
                            <p className={"book_item_price"}>{book.price}</p>
                        </div>)}
                    {!book.inStock && (
                        <p color={"red"} className={"code"}>
                            {BookLocalization.locale[lang].notInStock}
                        </p>
                    )}
                    {book.inStock && (
                        <p className={"code"}>
                            {bookLocalization.locale[lang].inStock}
                        </p>
                    )}
                    <Link className="action_btn" to={{
                        pathname: "/books/" + book.id
                    }}> {Locale.locale[lang].see}</Link>
                </div>
            ))}
        </>
    )
}
export default BookListCustomerView;