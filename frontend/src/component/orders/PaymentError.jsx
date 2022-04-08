import {Link} from "react-router-dom";
import paidError from '../../icon/paid_error.png'
import '../../styles/order/order.sass'

function PaymentError() {
    return (
        <div className={"wrapper"}>
            <div className={"order_inf_container"}>
                <img src={paidError} width={300} alt={"payment error"}/>
                <h4>Оплата не прошла. Для оплаты заказа перейдите в личный кабинет</h4>
                <Link to={"/profile"} className={"action_btn"}>
                    Перейти в личный кабинет
                </Link>
            </div>

        </div>
    )
}

export default PaymentError;