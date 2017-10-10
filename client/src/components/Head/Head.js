import React, { Component } from 'react';
import './Head.css';
import ImgHolder from '../ImgHolder/ImgHolder';
import Star from '../Star/Star';
import Title from '../Title/Title';

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldShowDetail: false };

    this.handleShowDetailClick = this.handleShowDetailClick.bind(this);
    this.handleHideDetailClick = this.handleHideDetailClick.bind(this);
  }

  handleShowDetailClick() {
    this.setState({ shouldShowDetail : true });
    // fade效果hack
    setTimeout(() => {
      this.detailDiv.style.opacity = 1;
    }, 0);
  }

  handleHideDetailClick() {
    this.detailDiv.style.opacity = 0;
    setTimeout(() => {
      this.setState({ shouldShowDetail : false });
    }, 500);
  }

  render() {
    const { seller } = this.props;
    const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

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
              <span className={`icon ${classMap[seller.supports[0].type]}`}></span><span className="text">{seller.supports[0].description}</span>
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
          <div className="detail" ref={(detail) => {this.detailDiv = detail; }}>
            <div className="detail-wrapper">
              <h1 className="name">{seller.name}</h1>
              <div className="star-wrapper">
                <Star size="48" score={seller.score} />
              </div>
              <Title text="优惠信息"></Title>
              {seller.supports &&
                <ul className="supports">
                  {seller.supports.map((support, index) =>
                    <li className="support-item" key={index}>
                      <span className={`icon ${classMap[support.type]}`}></span>
                      <span className="text">{support.description}</span>
                    </li>
                  )}
                </ul>
              }
              <Title text="商家公告"></Title>
              <div className="bulletin">
                <p className="content">{seller.bulletin}</p>
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
}

export default Head;
