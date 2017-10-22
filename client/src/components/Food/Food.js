import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Food.css';
import CartControl from '../CartControl/CartControl';

class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleMaskClick = this.handleMaskClick.bind(this);
    this.handleCartControlClick = this.handleCartControlClick.bind(this);
  }

  handleMaskClick() {
    this.props.onMaskClick();
  }

  handleCartControlClick() {
    this.props.onFoodAdd();
  }

  render() {
    const { selectedFood, shouldShowFood } = this.props;

    return (
      <TransitionGroup className="food-transition">
        {shouldShowFood &&
          <CSSTransition timeout={300} classNames="pop">
            <div className="food-mask" onClick={this.handleMaskClick}></div>
          </CSSTransition>
        }
        {shouldShowFood &&
          <CSSTransition timeout={300} classNames="pop">
            <div className="Food">
              <div className="food-content">
                <div className="image-header">
                  <img src={selectedFood.image} alt="food" />
                </div>
                <div className="content">
                  <h1 className="title">{selectedFood.name}</h1>
                  <div className="detail">
                    <span className="sell-count">月售{selectedFood.sellCount}份</span>
                    <span className="rating">好评率{selectedFood.rating}%</span>
                  </div>
                  <div className="price">
                    <span className="now">¥{selectedFood.price}</span>
                    {selectedFood.oldPrice &&
                      <span className="old">¥{selectedFood.oldPrice}</span>
                    }
                  </div>
                  <div className="cartcontrol-wrapper">
                    <CartControl food={selectedFood} onCartControlClick={this.handleCartControlClick} />
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
        }
      </TransitionGroup>
    );
  }
}

export default Food;
