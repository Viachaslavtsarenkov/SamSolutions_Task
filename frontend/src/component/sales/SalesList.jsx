import {Link} from "react-router-dom";

function SalesList() {
    return (
        <div>
            <Link to={"/sales/new"}>
                Добавить
            </Link>
        </div>
    )
}

export default SalesList;