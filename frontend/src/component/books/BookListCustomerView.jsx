import {Link} from "react-router-dom";
import Locale from '../localization/BookLocalization'
import noPic from "../../icon/nopic.png";

function BookListCustomerView(props) {

    const books = props.value;

    return (
        <>
            {books.map((book) => (
                <div className={"book_user_item"} key={book.id}>
                    <img src={book.image.imageContent === null ? noPic : "data:image/jpg;base64," + book.image.imageContent} height={120} alt={"book"}/>
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
                        <p className={"code"}>Нет в наличии</p>
                    )}
                    <Link className = "action_btn" to={{
                        pathname: "/books/" + book.id
                    }}> {Locale.locale['ru']['see']}</Link>
                </div>
            ))}
        </>
    )
}
export default BookListCustomerView;