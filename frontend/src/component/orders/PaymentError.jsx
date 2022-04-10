import {Link} from "react-router-dom";
import paidError from '../../icon/paid_error.png'
import '../../styles/order/order.sass'
import OrderLocalization from "../localization/OrderLocalization";
import {useState} from "react";

function PaymentError() {
    let [lang] = useState("ru");
    return (
        <div className={"wrapper"}>
            <div className={"order_inf_container"}>
                <img src={paidError} width={300} alt={"payment error"}/>
                <h4>
                    {OrderLocalization.locale[lang].orderError}
                </h4>
                <Link to={"/profile"} className={"action_btn"}>
                    {OrderLocalization.locale[lang].goToProfile}
                </Link>
            </div>

        </div>
    )
}

export default PaymentError;