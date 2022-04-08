import {Route, Switch} from "react-router-dom";
import React from "react";
import BookView from "./BookView";
import BookList from "./BookList";
import BookForm from "./BookForm";

function Book(props) {
    return (
        <div>
            <Switch>
                <Route exact path={"/books"} component={BookList}>
                </Route>
                <Route path={"/books/new"} component={BookForm}>
                </Route>
                <Route path={"/books/:id/edit"} component={BookForm}>
                </Route>
                <Route path={"/books/:id"} render={() =>
                    <BookView cart={props.cart}/>}/>
            </Switch>
        </div>
    )

}
export default Book;