import React, { Component } from 'react';
// import BScroll from 'better-scroll';
import './Ratings.css';
import Star from '../Star/Star';
import Split from '../Split/Split';
import RatingSelect from '../RatingSelect/RatingSelect';

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
          });
        }
      }).catch(error => {
        console.log('request failed', error);
      });
  }

  handleLabelClick(type) {
    this.setState({ selectType: type });
  }

  handleSwitchClick() {
    this.setState(({ onlyContent }) => ({
      onlyContent: !onlyContent,
    }));
  }

  checkStatus(response) {
    if (response.ok) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
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
          <RatingSelect
            selectType={this.state.selectType}
            onlyContent={this.state.onlyContent}
            ratings={this.state.ratings}
            onLabelClick={this.handleLabelClick}
            onSwitchClick={this.handleSwitchClick}
          />
        </div>
      </div>
    );
  }
}

export default Ratings;
