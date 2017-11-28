import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import configureStore from '../state/configureStore';
import Wrapper from './wrapper';

const store = configureStore({});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Wrapper />
      </Provider>
    );
  }
}
