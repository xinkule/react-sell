import React, { Component } from 'react';
import BScroll from 'better-scroll';
import './Ratings.css';
import Star from '../Star/Star';
import Split from '../Split/Split';
import RatingSelect from '../RatingSelect/RatingSelect';
import formatDate from '../../common/js/date';

const ALL = 2;
const ERR_OK = 0;

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
      selectType: ALL,
      onlyContent: true,
    };
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleSwitchClick = this.handleSwitchClick.bind(this);
  }

  componentDidMount() {
    fetch('http://192.168.0.105:3001/api/ratings')
      .then(this.checkStatus)
      .then(response => response.json())
      .then(json => {
        if (json.errno === ERR_OK) {
          this.setState({
            ratings: json.data,
          }, () => {
            this.scroll = new BScroll(this.wrapper, {
              click: true,
            });
          });
        }
      }).catch(error => {
        console.log('request failed', error);
      });
  }

  handleLabelClick(type) {
    this.setState({
      selectType: type
    }, () => {
      this.scroll.refresh();
    });
  }

  handleSwitchClick() {
    this.setState(({ onlyContent }) => ({
      onlyContent: !onlyContent,
    }), () => {
      this.scroll.refresh();
    });
  }

  checkStatus(response) {
    if (response.ok) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  showRatings() {
    return this.state.ratings.filter((rating) => {
      if (this.state.onlyContent && !rating.text) {
        return false;
      }
      if (this.state.selectType === ALL) {
        return true;
      }
      return rating.rateType === this.state.selectType;
    });
  }

  render() {
    const { seller } = this.props;

    return (
      <div className="Ratings" ref={(wrapper) => { this.wrapper = wrapper; }}>
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
          <RatingSelect
            selectType={this.state.selectType}
            onlyContent={this.state.onlyContent}
            ratings={this.state.ratings}
            onLabelClick={this.handleLabelClick}
            onSwitchClick={this.handleSwitchClick}
          />
          <div className="rating-wrapper">
            <ul>
              {this.showRatings().map((rating, index) =>
                <li className="rating-item" key={index}>
                  <div className="avatar">
                    <img width="28" height="28" src={rating.avatar} alt="" />
                  </div>
                  <div className="content">
                    <h1 className="name">{rating.username}</h1>
                    <div className="star-wrapper">
                      <Star size="24" score={rating.score} />
                      {rating.deliveryTime &&
                        <span className="delivery">{rating.deliveryTime}分钟送达</span>
                      }
                    </div>
                    <p className="text">{rating.text}</p>
                    {rating.recommend && rating.recommend.length > 0 &&
                      <div className="recommend">
                        <span className="icon-thumb_up"></span>
                        {rating.recommend.map((item, index) =>
                          <span className="item" key={index}>{item}</span>
                        )}
                      </div>
                    }
                    <div className="time">{formatDate(new Date(rating.rateTime), 'yyyy-MM-dd hh:mm')}</div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Ratings;
