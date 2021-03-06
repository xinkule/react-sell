import React, { Component } from 'react';
import BScroll from 'better-scroll';
import './Goods.css';
import ShopCart from '../ShopCart/ShopCart';
import CartControl from '../CartControl/CartControl';
import Food from '../Food/Food';

class Goods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      shouldShowFood: false,
      selectedFood: {},
    };
    this.handleCartControlClick = this.handleCartControlClick.bind(this);
    this.hanldeMaskClick = this.hanldeMaskClick.bind(this);
  }

  componentDidMount() {
    this.initScroll();
    this.calculateHeight();
  }

  componentWillUnmount() {
    // 切换router的时候，会销毁组件，需要同时销毁滚动组件
    this.menuScroll.destroy();
    this.foodsScroll.destroy();
  }

  handleMenuClick(index) {
    const foodNodes = this.foodsWrapper.querySelectorAll('.food-list');
    const el = foodNodes[index];
    this.foodsScroll.scrollToElement(el);
    this.setState({ currentIndex: index });
  }

  handleCartControlClick() {
    this.props.onShopCartChange();
  }

  handleItemClick(food) {
    this.setState({
      shouldShowFood: true,
      selectedFood: food,
    });
  }

  hanldeMaskClick() {
    this.setState({ shouldShowFood: false });
  }

  initScroll() {
    this.menuScroll = new BScroll(this.menuWrapper, {
      click: true,
    });
    this.foodsScroll = new BScroll(this.foodsWrapper, {
      click: true,
      probeType: 3,
    });
    this.foodsScroll.on('scroll', (pos) => {
      // 计算左侧菜单当前区域
      const scrollY = Math.abs(Math.round(pos.y));
      const currentIndex = this.getCurrentIndex(scrollY);
      this.setState({ currentIndex });
    });
  }

  calculateHeight() {
    this.listHeight = [];
    let height = 0;
    const foodNodes = this.foodsWrapper.querySelectorAll('.food-list');

    // 取右侧各商品类别高度区间
    this.listHeight.push(height);
    foodNodes.forEach((node) => {
      height += node.clientHeight;
      this.listHeight.push(height);
    });
  }

  getCurrentIndex(scrollY) {
    for (let i = 0; i < this.listHeight.length; i++) {
      const height1 = this.listHeight[i];
      const height2 = this.listHeight[i + 1];
      if (!height2 || (scrollY >= height1 && scrollY < height2)) {
        return i;
      }
    }
    return 0;
  }

  render() {
    const { currentIndex, shouldShowFood, selectedFood } = this.state;
    const { goods, selectFoods } = this.props;
    const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

    return (
      <div className="Goods">
        <div className="menu-wrapper" ref={(menuWrapper) => { this.menuWrapper = menuWrapper; }}>
          <ul>
            {goods.map((item, index) =>
              <li className={`menu-item ${index === currentIndex ? 'current' : ''}`} key={index} onClick={this.handleMenuClick.bind(this, index)}>
                <span className="text border-1px">
                  {item.type > 0 &&
                    <span className={`icon ${classMap[item.type]}`}></span>
                  }
                  {item.name}
                </span>
              </li>
            )}
          </ul>
        </div>
        <div className="foods-wrapper" ref={(foodsWrapper) => { this.foodsWrapper = foodsWrapper; }} >
          <ul>
            {goods.map((item, index) =>
              <li className="food-list" key={index}>
                <h1 className="title">{item.name}</h1>
                <ul>
                  {item.foods.map((food, index) =>
                    <li className="food-item border-1px" key={index} onClick={this.handleItemClick.bind(this, food)}>
                      <div className="icon">
                        <img width="57" height="57" src={food.icon} alt="icon" />
                      </div>
                      <div className="content">
                        <h2 className="name">{food.name}</h2>
                        <p className="desc">{food.description}</p>
                        <div className="extra">
                          <span className="count">月售{food.sellCount}</span>
                          <span>好评率{food.rating}</span>
                        </div>
                        <div className="price">
                          <span className="now">¥{food.price}</span>
                          {food.oldPrice &&
                            <span className="old">¥{food.oldPrice}</span>
                          }
                        </div>
                        <div className="cartcontrol-wrapper">
                          <CartControl food={food} onCartControlClick={this.handleCartControlClick} />
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </li>
            )}
          </ul>
        </div>
        <ShopCart
          selectFoods={selectFoods}
          deliveryPrice={this.props.seller.deliveryPrice}
          minPrice={this.props.seller.minPrice}
          onShopCartChange={this.handleCartControlClick}
        />
        <Food
          selectedFood={selectedFood}
          onMaskClick={this.hanldeMaskClick}
          shouldShowFood={shouldShowFood}
          onFoodAdd={this.handleCartControlClick}
        />
      </div>
    );
  }
}

export default Goods;
