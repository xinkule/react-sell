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
    this.state = {
      seller: {},
      goods: [],
      selectFoods: [],
    };
    this.handleShopCartChange = this.handleShopCartChange.bind(this);
  }

  componentDidMount() {
    const ERR_OK = 0;

    const apiSeller =
      fetch('http://192.168.0.105:3001/api/seller')
      .then(this.checkStatus)
      .then(response => response.json());

    const apiGoods =
      fetch('http://192.168.0.105:3001/api/goods')
      .then(this.checkStatus)
      .then(response => response.json());

    Promise.all([apiSeller, apiGoods])
      .then(jsons => {
        if (jsons[0].errno === ERR_OK && jsons[1].errno === ERR_OK) {
          this.setState({
            seller: jsons[0].data,
            goods: jsons[1].data,
          });

          if (this.goodsComponent) {
            this.goodsComponent.menuScroll.refresh();
            this.goodsComponent.foodsScroll.refresh();
            this.goodsComponent.calculateHeight();
          }
        }
      }).catch(error => {
        console.log('request failed', error);
      });
  }

  handleShopCartChange() {
    const selectFoods = [];
    // 计算购物车里的商品
    this.state.goods.forEach((good) => {
      good.foods.forEach((item) => {
        if (item.count) {
          selectFoods.push(item);
        }
      });
    });
    this.setState(({ goods }) => ({
      goods,
      selectFoods,
    }));
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

          <Route
            path="/goods"
            render={() =>
              <Goods
                seller={this.state.seller}
                goods={this.state.goods}
                onShopCartChange={this.handleShopCartChange}
                selectFoods={this.state.selectFoods}
                ref={(goods) => { this.goodsComponent = goods; }}
              />
            }
          />
          <Route path="/ratings" render={() => <Ratings seller={this.state.seller} />} />
          <Route path="/seller" component={Seller} />
        </div>
      </Router>
    );
  }
}

export default App;
