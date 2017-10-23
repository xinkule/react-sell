import React, { Component } from 'react';
import './Ratings.css';
import Star from '../Star/Star';
import Split from '../Split/Split';

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { seller } = this.props;

    return (
      <div className="Ratings">
        <div className="ratings-content">
          <div className="overview">
            <div className="overview-left">
              <h1 className="score">{seller.score}</h1>
              <div className="title">综合评分</div>
              <div className="rank">高于周边商家{seller.rankRate}%</div>
            </div>
            <div className="overview-right">
              <div className="score-wrapper">
                <span className="title">服务态度</span>
                <Star size="36" score={seller.serviceScore} />
                <span className="score">{seller.serviceScore}</span>
              </div>
              <div className="score-wrapper">
                <span className="title">商品评分</span>
                <Star size="36" score={seller.foodScore} />
                <span className="score">{seller.foodScore}</span>
              </div>
              <div className="delivery-wrapper">
                <span className="title">送达时间</span>
                <span className="delivery">{seller.deliveryTime}分钟</span>
              </div>
            </div>
          </div>
          <Split/>
        </div>
      </div>
    );
  }
}

export default Ratings;
