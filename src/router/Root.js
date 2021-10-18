import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import { Global } from "@emotion/react";
import GlobalStyle from "components/css/GlobalStyle";

import { Main, Category, Products, Product, Login, Like, Cart } from "pages";

const Root = () => {
  return (
    <BrowserRouter>
      <Global styles={GlobalStyle} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/category">
          <Category />
        </Route>
        <Route exact path="/category/:category">
          <Products />
        </Route>
        <Route exact path="/product/:id">
          <Product />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/like">
          <Like />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
