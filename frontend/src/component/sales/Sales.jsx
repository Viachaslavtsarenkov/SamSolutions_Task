import {Route, Switch} from "react-router-dom";
import React from "react";
import SaleForm from "./SaleForm";
import SalesList from "./SalesList";

const Sales = () => (
    <Switch>
        <Route exact path={"/sales"} component={SalesList}>
        </Route>
        <Route path={"/sales/new"} component={SaleForm}>
        </Route>
        <Route path={"/sales/:id/edit"} component={SaleForm}>
        </Route>
        <Route path={"/sales/:id"} component={SaleForm}>
        </Route>
    </Switch>
)

export default Sales;