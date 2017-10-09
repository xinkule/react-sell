import React, { Component } from 'react';
import './Star.css';

class Star extends Component {
  render() {
    const stars = this.getStarClass();

    return (
      <div className={`Star star-${this.props.size}`}>
        {stars.map((star, index) =>
          <span className={`star-item ${star}`} key={index}></span>
        )}
      </div>
    );
  }

  getStarClass() {
    const MAX_LENGTH = 5;
    const result = [];

    // 取0.5的整数倍
    const score = Math.floor(this.props.score * 2) / 2;
    const integer = Math.floor(score);
    for (let i = 0; i < integer; i++) {
      result.push('on');
    }
    if (score % 1 !== 0) {
      result.push('half');
    }
    while (result.length < MAX_LENGTH) {
      result.push('off');
    }

    return result;
  }
}

export default Star;
