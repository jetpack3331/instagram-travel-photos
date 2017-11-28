import React from 'react';
import { Container, Card, CardBody, CardText } from 'reactstrap';
import { connect } from 'react-redux';

import Header from './header';
// import Navigation from './navigation';
import Highlights from './highlights';
import Map from './map';
import { login, fetchData } from '../state/actions/user';

export class Wrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
    };
  }

  componentDidMount() {
    // Validate instagram return code (token)
    if (/#access_token=([.a-z0-9])+/.test(window.location.hash)) {
      const token = window.location.hash.replace('#access_token=', '');

      // In case valid token, try user to login or register. Depends on existing record in database
      if (token) {
        login(token);
      }
    }
  }

  componentDidUpdate(prevState, prevProps) {
    // Detect if user has logged and load data for him
    if (prevProps.logged !== this.props.logged) {
      this.props.fetchData();
    }
  }

  render() {
    return (
      <Container>
        <Header logged={this.props.logged} />
        <Highlights />
        {this.props.logged
          ? <Map data={this.props.data} isMarkerShown={true} />
          : <Card style={{ height: '400px' }}><CardBody><CardText>Connect with instagram account to show your photos on the map</CardText></CardBody></Card>}
      </Container>
    )
  }
}

export default connect(state => ({
  data: state.pictures.data,
  logged: state.auth.logged,
  userData: state.auth.data,
}), {
  fetchData,
})(Wrapper);
