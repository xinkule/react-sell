import React, { Component } from 'react';
import BScroll from 'better-scroll';
import './Seller.css';
import Star from '../Star/Star';
import Split from '../Split/Split';

const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

class Seller extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.scroll = new BScroll(this.sellerDom, {
      click: true,
    });
    this.picScroll = new BScroll(this.picWrapper, {
      scrollX: true,
      eventPassthrough: 'vertical',
    });
    this.initPics();
  }

  componentDidUpdate() {
    this.scroll.refresh();
    this.initPics();
  }

  initPics() {
    if (this.props.seller.pics) {
      const picWidth = 120;
      const margin = 6;
      const width = ((picWidth + margin) * this.props.seller.pics.length) - margin;
      this.picList.style.width = `${width}px`;
      this.picScroll.refresh();
    }
  }

  render() {
    const { seller } = this.props;

    return (
      <div className="Seller" ref={(sellerDom) => { this.sellerDom = sellerDom; }}>
        <div className="seller-content">
          <div className="overview">
            <h1 className="title">{seller.name}</h1>
            <div className="desc border-1px">
              <Star size="36" score={seller.score} />
              <span className="text">({seller.ratingCount})</span>
              <span className="text">月售{seller.sellCount}单</span>
            </div>
            <ul className="remark">
              <li className="block">
                <h2>起送价</h2>
                <div className="content">
                  <span className="stress">{seller.minPrice}</span>元
                </div>
              </li>
              <li className="block">
                <h2>商家配送</h2>
                <div className="content">
                  <span className="stress">{seller.deliveryPrice}</span>元
                </div>
              </li>
              <li className="block">
                <h2>平均配送时间</h2>
                <div className="content">
                  <span className="stress">{seller.deliveryTime}</span>分钟
                </div>
              </li>
            </ul>
            <div className="favorite">
              <span className="icon-favorite"></span>
              <span className="text"></span>
            </div>
          </div>
          <Split/>
          <div className="bulletin">
            <h1 className="title">公告与活动</h1>
            <div className="content-wrapper border-1px">
              <p className="content">{seller.bulletin}</p>
            </div>
            {seller.supports &&
              <ul className="supports">
                {seller.supports.map((item, index) =>
                  <li className="support-item border-1px" key={index}>
                    <span className={`icon ${classMap[item.type]}`}></span>
                    <span className="text">{item.description}</span>
                  </li>
                )}
              </ul>
            }
          </div>
          <Split/>
          <div className="pics">
            <h1 className="title">商家实景</h1>
            <div className="pic-wrapper" ref={(picWrapper) => { this.picWrapper = picWrapper; }}>
              <ul className="pic-list" ref={(picList) => { this.picList = picList; }}>
                {seller.pics && seller.pics.map((pic, index) =>
                  <li className="pic-item" key={index}>
                    <img src={pic} width="120" height="90" alt="pic" />
                  </li>
                )}
              </ul>
            </div>
          </div>
          <Split/>
          <div className="info">
            <h1 className="title border-1px">商家信息</h1>
            <ul>
              {seller.infos && seller.infos.map((info, index) =>
                <li className="info-item" key={index}>{info}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Seller;
