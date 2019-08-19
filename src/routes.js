import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Component
import Home from './components/Home/Home'

// Hoc
import Layout from './hoc/layout'
//


class Routes extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
            </Layout>
        );
    }
}

export default Routes; 