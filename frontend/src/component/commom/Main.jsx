import React, {useState} from "react";
import '../../styles/common/common.sass';
import '../../styles/common/main.sass';
import 'bootstrap/dist/css/bootstrap.min.css';
import main from  "../../icon/main.jpg";
import {Link} from "react-router-dom";
import CommonLocalization from "../localization/CommonLocalization";

function Main() {

        let [lang] = useState("ru");

        return (
            <div className={"wrapper"}>
                <section className={"main_container"}>
                    <img className={"main_background"}
                         alt={"book store"}
                        src={main}
                        width={456} height={563}/>
                    <div className={"main_description"}>
                        <h2 className={"main_title"}>
                            {CommonLocalization.locale[lang].mainHeadline}
                        </h2>
                        <p className={"main_cite"}>
                            {CommonLocalization.locale[lang].mainDescription}
                        </p>
                        <Link to={"/books"} className={"shop_now_btn"}>
                            {CommonLocalization.locale[lang].shopBtn}
                        </Link>
                    </div>
                </section>
            </div>
        )
}

export default Main;