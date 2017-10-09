import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';
import Head from './components/Head/Head';
import Goods from './components/Goods/Goods';
import Ratings from './components/Ratings/Ratings';
import Seller from './components/Seller/Seller';

const ERR_OK = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { seller: Object.create(null) };
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/seller')
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

          <Route path="/goods" component={Goods} />
          <Route path="/ratings" component={Ratings} />
          <Route path="/seller" component={Seller} />
        </div>
      </Router>
    );
  }

  checkStatus(response) {
    if (response.ok) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export default App;
