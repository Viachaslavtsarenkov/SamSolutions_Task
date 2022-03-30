import {Link} from "react-router-dom";

function PaymentError() {
    return (
        <div className={"wrapper"}>
            <p>Оплата не прошла. Для оплаты заказа перейдите в личный кабинет</p>
            <Link to={"/profile"}>
                Перейти в личный кабинет
            </Link>
        </div>
    )
}

export default PaymentError;