import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Switch } from 'react-router';
import Mapping from './Components/Mapping';
import Form from './Components/Form';
import Admin from './Components/Admin';

const Routes = () => {
    return(
        <Router>
            <Switch>
            <Route path="/" component={Mapping} exact={true} />
            <Route path="/form" component={Form} exact={true} />
            <Route path="/admin" component={Admin} exact={true} />
            </Switch>
        </Router>
    );
    }
export { Routes }


