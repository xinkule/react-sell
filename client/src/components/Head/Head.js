import React, { Component } from 'react';
import './Head.css';
import ImgHolder from '../ImgHolder/ImgHolder';
import Star from '../Star/Star';

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldShowDetail: false };

    this.handleShowDetailClick = this.handleShowDetailClick.bind(this);
    this.handleHideDetailClick = this.handleHideDetailClick.bind(this);
  }

  handleShowDetailClick() {
    this.setState({ shouldShowDetail : true });
  }

  handleHideDetailClick() {
    this.setState({ shouldShowDetail : false });
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
              <span className="name">{seller.name}</span>
            </div>
            <div className="description">
              <span>{seller.description} / {seller.deliveryTime}分钟送达</span>
              {seller.deliveryPrice &&
                <span> / 配送费¥{seller.deliveryPrice}</span>
              }
            </div>
            <div className="bulletin">公告：{seller.bulletin}</div>
          </div>
        </div>
        <div className="support-wrapper">
          {seller.supports &&
            <div className="support">
              <span className={`icon ${Head.getClassMap()[seller.supports[0].type]}`}></span><span className="text">{seller.supports[0].description}</span>
            </div>
          }
          {seller.supports &&
            <div className="support-count" onClick={this.handleShowDetailClick}>
              <span className="count">{seller.supports.length}个活动</span>
              <i className="icon-keyboard_arrow_right"></i>
            </div>
          }
        </div>
        <div className="background">
          <ImgHolder src={seller.avatar} width="100%" height="100%" alt="seller" />
        </div>
        {this.state.shouldShowDetail &&
          <div className="detail">
            <div className="detail-wrapper">
              <h1 className="name">{seller.name}</h1>
              <div className="star-wrapper">
                <Star size="48" score={seller.score} />
              </div>
            </div>
            <div className="detail-close" onClick={this.handleHideDetailClick}>
              <i className="icon-close"></i>
            </div>
          </div>
        }
      </div>
    );
  }

  static getClassMap() {
    return ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
}

export default Head;
