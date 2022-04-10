import LangUtil from "../../service/LangUtil";
import CommonLocalization from "../localization/CommonLocalization";
import {useState} from "react";
function Footer() {

    let [lang] = useState(LangUtil.getLang());

    return (
        <footer className={"footer"}>
            <div className={"lang_container"}>
                <button onClick={() => LangUtil.setLang("ru")}>
                    {CommonLocalization.locale[lang].rus}
                </button>
                <button onClick={() => LangUtil.setLang("en")}>
                    {CommonLocalization.locale[lang].eng}
                </button>
            </div>
        </footer>
    )
}
export default Footer;