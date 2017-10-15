import React, { Component } from 'react';
import './ShopCart.css';

class ShopCart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTotalCount() {
    let count = 0;
    this.props.selectFoods.forEach((food) => {
      count += food.count;
    });
    return count;
  }

  getTotalPrice() {
    let total = 0;
    this.props.selectFoods.forEach((food) => {
      total += food.price * food.count;
    });
    return total;
  }

  payDesc(totalPrice) {
    if (totalPrice === 0) {
      return `¥${this.props.minPrice}起送`;
    } else if (totalPrice < this.props.minPrice) {
      const diff = this.props.minPrice - totalPrice;
      return `还差¥${diff}起送`;
    }
    return '去结算';
  }

  render() {
    const totalCount = this.getTotalCount();
    const totalPrice = this.getTotalPrice();
    const logoClass = totalCount > 0 ? 'highlight' : '';

    return (
      <div className="ShopCart">
        <div className="content">
          <div className="content-left">
            <div className="logo-wrapper">
              <div className={`logo ${logoClass}`}>
                <i className={`icon-shopping_cart ${logoClass}`}></i>
              </div>
              {totalCount > 0 &&
                <div className="num">{totalCount}</div>
              }
            </div>
            <div className="price-wrapper">
              <div className="price">¥{totalPrice}</div>
              <div className="desc">配送费¥{this.props.deliveryPrice}</div>
            </div>
          </div>
          <div className="content-right">
            <div className={`pay ${totalPrice >= this.props.minPrice ? 'enough' : ''}`}>{this.payDesc(totalPrice)}</div>
          </div>
        </div>
        <div className="shopcart-list">
          <div className="list-header">
            <h1 className="title">购物车</h1>
            <span className="empty">清空</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopCart;
