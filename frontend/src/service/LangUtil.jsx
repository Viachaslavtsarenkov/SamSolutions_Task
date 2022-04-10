class LangUtil {
    getLang() {
        let lang = localStorage.getItem("lang");
        return lang === undefined ?
            "ru" : lang;
    }

    setLang(lang) {
        localStorage.setItem("lang", lang);
        window.location.reload();
    }
}
export default new LangUtil();