import React, { Component } from 'react';
import ImgHolder from '../ImgHolder/ImgHolder';
import './Head.css';

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const seller = this.props.seller;

    return (
      <div className="Head">
        <div className="content-wrapper">
          <div className="avatar">
            <ImgHolder src={seller.avatar} width="64" height="64" alt="seller" />
          </div>
          <div className="content">
            <div className="title">
              <span className="brand"></span>
              <span className="name">{seller.name}</span>
            </div>
            <div className="description">
              {seller.description} / {seller.deliveryTime}分钟送达
            </div>
            {seller.supports &&
              <div className="support">
                <span className={`icon ${Head.getClassMap()[seller.supports[0].type]}`}></span>
                <span className="text">{seller.supports[0].description}</span>
              </div>
            }
          </div>
          {seller.supports &&
            <div className="support-count">
              <span className="count">{seller.supports.length}个</span>
              <i className="icon-keyboard_arrow_right"></i>
            </div>
          }
        </div>
        <div className="bulletin-wrapper">
          <span className="bulletin-title"></span><span className="bulletin-text">{seller.bulletin}</span>
          <i className="icon-keyboard_arrow_right"></i>
        </div>
        <div className="background">
          <ImgHolder src={seller.avatar} width="100%" height="100%" alt="seller" />
        </div>
      </div>
    );
  }

  static getClassMap() {
    return ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
}

export default Head;
