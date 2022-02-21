import {Link} from "react-router-dom";

function BookList() {
    return (
        <div>
            <Link to={"/books/new"}>Добавить</Link>
        </div>
    )
};

export default BookList;