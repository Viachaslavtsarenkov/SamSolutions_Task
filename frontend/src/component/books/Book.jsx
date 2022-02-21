import {Route, Switch} from "react-router-dom";
import React from "react";
import BookView from "./BookView";
import BookList from "./BookList";
import BookForm from "./BookForm";

const Book = () => (
    <Switch>
        <Route exact path={"/books"} component={BookList}>
        </Route>
        <Route path={"/books/new"} component={BookForm}>
        </Route>
        <Route path={"/books/:id"} component={BookView}>
        </Route>
        <Route path={"/books/:id/edit"} component={BookList}>
        </Route>
    </Switch>
)

export default Book;