import React, { Component } from 'react';
import './RatingSelect.css';

const POSITIVE = 0;
const NEGATIVE = 1;

class RatingSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSwitchClick = this.handleSwitchClick.bind(this);
  }

  handleClick(type) {
    this.props.onLabelClick(type);
  }

  handleSwitchClick() {
    this.props.onSwitchClick();
  }

  getPositiveNum() {
    return this.props.ratings.filter(rating => (rating.rateType === POSITIVE)).length;
  }

  getNegativeNum() {
    return this.props.ratings.filter(rating => rating.rateType === NEGATIVE).length;
  }

  render() {
    const { ratings, selectType, onlyContent } = this.props;
    return (
      <div className="RatingSelect">
        <div className="rating-type border-1px">
          <span className={`block positive ${selectType === 2 ? 'active' : ''}`} onClick={() => this.handleClick(2)}>全部<span className="count">{ratings.length}</span></span>
          <span className={`block positive ${selectType === 0 ? 'active' : ''}`} onClick={() => this.handleClick(0)}>满意<span className="count">{this.getPositiveNum()}</span></span>
          <span className={`block negative ${selectType === 1 ? 'active' : ''}`} onClick={() => this.handleClick(1)}>不满意<span className="count">{this.getNegativeNum()}</span></span>
        </div>
        <div className={`switch ${onlyContent ? 'on' : ''}`} onClick={this.handleSwitchClick}>
          <span className="icon-check_circle"></span>
          <span className="text">只看有内容的评价</span>
        </div>
      </div>
    );
  }
}

export default RatingSelect;
