import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        console.log(props),
        props.authenticated 
          ? <Component {...props} />
          : <Redirect to='/Login' />
      )} />
);