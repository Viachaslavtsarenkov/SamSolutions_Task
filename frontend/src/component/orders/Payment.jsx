import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import paid from "../../icon/success_payment.png";
import OrderLocalization from "../localization/OrderLocalization";
function  Payment() {

    const queryParams = new URLSearchParams(window.location.search)
    const paymentId = queryParams.get("paymentId")
    const payerId = queryParams.get("PayerID")
    const [lang] = useState("ru");

    useEffect(() => {
        orderPayment();
    }, [])

    function orderPayment() {
        axios.get("/orders/payment?paymentId=" + paymentId+ "&payerId=" + payerId)
            .then(() => {
        })
    }
    return (
        <div className={"wrapper"}>
            <div>
                <div className={"wrapper"}>
                    <div className={"order_inf_container"}>
                        <img src={paid} width={300} alt={"paid image"}/>
                        <h4>
                            {OrderLocalization.locale[lang].successPayment}
                        </h4>
                        <Link to={"/profile"} className={"action_btn"}>
                            {OrderLocalization.locale[lang].goToProfile}
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Payment;