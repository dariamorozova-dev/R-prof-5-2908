import React from "react";
import { Switch, Route } from 'react-router-dom';

/*import Layout from '';*/

export default class Router extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='' component={ Layout } />
            </Switch>
        );
    }
}