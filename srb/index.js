/* eslint react/no-multi-comp: 0 */
/* eslint react/self-closing-comp: 0 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Container, Card, CardBody, CardText } from 'reactstrap';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import 'bootstrap/dist/css/bootstrap.css';

import * as actions from './actions';
import './scss/landing-page.scss';

import './style/font-awesome/css/font-awesome.min.css';
import './style/simple-line-icons/css/simple-line-icons.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      oauth: {},
      data: [],
      token: null,
    };
  }

  componentDidMount() {
    // Validate instagram return code (token)
    if (/#access_token=([.a-z0-9])+/.test(window.location.hash)) {
      const token = window.location.hash.replace('#access_token=', '');

      // In case valid token, try user to login or register. Depends on existing record in database
      if (token) {
        this.setState({
          token,
        });
      }
    }

    this.fetchData();
  }

  componentDidUpdate(prevState) {
    // Detect if user has logged and load data for him
    if (prevState.token !== this.state.token) {
        this.fetchData();
    }
  }

  fetchData() {
    actions.fetchData(this.state.token)
    .then((data) => {
      if (data && data.length) {
        this.setState({
          data,
        })
      }
    });
  }

  render() {
    const authorized = !!this.state.token;
    const { data } = this.state;

    return (
      <Container>
        <section className="features-icons bg-light text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-screen-desktop m-auto text-primary"></i>
                  </div>
                  <h3>Connect instagram</h3>
                  <p className="lead mb-0">With just two clicks you can connect with your insttagram account!</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-layers m-auto text-primary"></i>
                  </div>
                  <h3>Publish your photos</h3>
                  <p className="lead mb-0">Connecting your account allow us to fetch your photos and get their GPS locations!</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-check m-auto text-primary"></i>
                  </div>
                  <h3>Watch your journey</h3>
                  <p className="lead mb-0">Let us create nice map of your travel and show you how awesome we are!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="google-wrapper">
          <div id="google-map">
            <Mapper data={data} />
          </div>
        </div>
      </Container>
    )
  }

}

class Map extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <section>
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
          {data.length && data.map(image => <Marker position={{ lat: image.location.langtitude, lng: image.location.longtitude }} />)}
        </GoogleMap>
      </section>
    );
  }
}

const ConnectedMap = withScriptjs(withGoogleMap(Map));

class Mapper extends React.Component {
  render() {
    console.log(this.props);

    if (! this.props.data.length) {
      return (
        <div id="google-map-overlay">
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <h1 className="mb-5">Create Map from my photos?</h1>
            </div>
            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
              <div className="form-row">
                <div className="col-12">
                  <a onClick={() => actions.authorize()}  className="btn btn-block btn-lg btn-primary">Sign up with Instagram!</a>
                  <small>We will redirect you into API of instagram.com</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <ConnectedMap
        data={this.props.data}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: '100%' }} />}
      />
    );
  }
}

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
