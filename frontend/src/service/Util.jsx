class Util {
    setUrl(url, history) {
        history.push({
            pathname: window.location.pathname,
            search: url
        })
    }

    getPage() {
        const params = new URLSearchParams(window.location.search);
        return params.get("page") === null ? 0 : params.get("page") ;
    }

    getSort() {
        const params = new URLSearchParams(window.location.search);
        return params.get("order") === null ? 'ASC' : params.get("order") ;
    }


    setPageParam(page) {
        return "page=" + page
    }

    setSortParam(order) {
        return "&order=" + order;
    }

    getPageParam() {
        return "page=" + this.getPage()
    }

    getSortParam() {
        return "&order=" + this.getSort();
    }

    getSearchParam() {
        const params = new URLSearchParams(window.location.search);
        return params.get("search") === null ? "" : "&search=" + params.get("search") ;
    }

}

export default new Util();