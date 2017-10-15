import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';
import Head from './components/Head/Head';
import Goods from './components/Goods/Goods';
import Ratings from './components/Ratings/Ratings';
import Seller from './components/Seller/Seller';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { seller: {} };
  }

  componentDidMount() {
    const ERR_OK = 0;

    fetch('http://192.168.0.105:3001/api/seller')
      .then(this.checkStatus)
      .then(response => response.json())
      .then(json => {
        if (json.errno === ERR_OK) {
          this.setState({
            seller: json.data,
          });
        }
      }).catch(error => {
        console.log('request failed', error);
      });
  }

  checkStatus(response) {
    if (response.ok) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Head seller={this.state.seller}></Head>

          <div className="tab border-1px">
            <div className="tab-item">
              <NavLink to="/goods">商品</NavLink>
            </div>
            <div className="tab-item">
              <NavLink to="/ratings">评价</NavLink>
            </div>
            <div className="tab-item">
              <NavLink to="/seller">店铺</NavLink>
            </div>
          </div>

          <Route path="/goods" render={() => <Goods seller={this.state.seller} />} />
          <Route path="/ratings" component={Ratings} />
          <Route path="/seller" component={Seller} />
        </div>
      </Router>
    );
  }
}

export default App;
