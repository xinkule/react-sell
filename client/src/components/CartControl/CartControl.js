import React, { Component } from 'react';
import './CartControl.css';

class CartControl extends Component {
  constructor(props) {
    super(props);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDecreaseClick = this.handleDecreaseClick.bind(this);
  }

  handleAddClick(e) {
    e.stopPropagation();
    if (!this.props.food.count) {
      this.props.food.count = 0;
    }
    this.props.food.count++
    this.props.onCartControlClick();
  }

  handleDecreaseClick(e) {
    e.stopPropagation();
    this.props.food.count--;
    this.props.onCartControlClick();
  }

  render() {
    return (
      <div className="CartControl">
        {this.props.food.count > 0 &&
          <div className="cart-decrease icon-remove_circle_outline" onClick={this.handleDecreaseClick}></div>
        }
        {this.props.food.count > 0 &&
          <div className="cart-count">{this.props.food.count}</div>
        }
        <div className="cart-add icon-add_circle" onClick={this.handleAddClick}></div>
      </div>
    );
  }
}

export default CartControl;
