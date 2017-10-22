import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import BScroll from 'better-scroll';
import './ShopCart.css';
import CartControl from '../CartControl/CartControl';

class ShopCart extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldShowShopCart: false };
    this.handleContentClick = this.handleContentClick.bind(this);
    this.handlePayClick = this.handlePayClick.bind(this);
    this.handleCartControlClick = this.handleCartControlClick.bind(this);
    this.handleEmptyClick = this.handleEmptyClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleMaskClick = this.handleMaskClick.bind(this);
  }

  handleContentClick() {
    if (this.getTotalCount() === 0) {
      return;
    }
    this.setState(({ shouldShowShopCart }) => ({
      shouldShowShopCart: !shouldShowShopCart,
    }));
  }

  handlePayClick() {
    if (this.getTotalPrice() >= this.props.minPrice) {
      window.alert(`支付${this.getTotalPrice()}元`);
    }
  }

  handleCartControlClick() {
    this.props.onShopCartChange();
    this.scroll.refresh();
  }

  handleEmptyClick() {
    this.props.selectFoods.forEach((food) => {
      food.count = 0;
    });
    this.setState({ shouldShowShopCart: false });
    this.props.onShopCartChange();
  }

  handleEnter() {
    this.scroll = new BScroll(this.listContent, {
      click: true,
    });
  }

  handleMaskClick() {
    this.setState({ shouldShowShopCart: false });
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
      <div>
        <div className="ShopCart">
          <div className="content">
            <div className="content-left" onClick={this.handleContentClick}>
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
            <div className="content-right" onClick={this.handlePayClick}>
              <div className={`pay ${totalPrice >= this.props.minPrice ? 'enough' : ''}`}>{this.payDesc(totalPrice)}</div>
            </div>
          </div>
          <TransitionGroup className="shopcart-transition">
            {this.state.shouldShowShopCart &&
              <CSSTransition timeout={300} classNames="fold" onEnter={this.handleEnter}>
                <div className="shopcart-list">
                  <div className="list-header group">
                    <h1 className="title">已选商品</h1>
                    <span className="empty" onClick={this.handleEmptyClick}>清空</span>
                  </div>
                  <div className="list-content" ref={(list) => { this.listContent = list; }}>
                    <ul>
                      {this.props.selectFoods.map((food, index) =>
                        <li className="food" key={index}>
                          <span className="name">{food.name}</span>
                          <div className="price">
                            <span>¥{food.price * food.count}</span>
                          </div>
                          <div className="cartcontrol-wrapper">
                            <CartControl food={food} onCartControlClick={this.handleCartControlClick} />
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </CSSTransition>
            }
          </TransitionGroup>
        </div>
        <TransitionGroup className="mask-transition">
          {this.state.shouldShowShopCart &&
            <CSSTransition timeout={300} classNames="fold">
              <div className="list-mask" onClick={this.handleMaskClick}></div>
            </CSSTransition>
          }
        </TransitionGroup>
      </div>
    );
  }
}

export default ShopCart;
