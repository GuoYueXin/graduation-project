import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Carousel, Button } from 'antd';
import styles from './search.less';

const Search = Input.Search;
const ButtonGroup = Button.Group;

class search extends Component {
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.search}>
          <Search
            placeholder="请输入关键字"
            enterButton="搜索"
            size="large"
            onSearch={value => console.log(value)}
          />
        </div>
        <div className={styles.loopPic}>
          <Carousel autoplay autoplaySpeed={2000}>
            <div><img src="https://img.alicdn.com/simba/img/TB14nTMMkPoK1RjSZKbSut1IXXa.jpg" alt="" /></div>
            <div><img src="https://img.alicdn.com/tfs/TB1X0PxLxjaK1RjSZFAXXbdLFXa-520-280.jpg_q90_.webp" alt="" /></div>
            <div><img src="https://img.alicdn.com/simba/img/TB1CLenKMHqK1RjSZFPSuwwapXa.jpg" alt="" /></div>
            <div><img src="https://img.alicdn.com/simba/img/TB1i87HL3HqK1RjSZJnSuvNLpXa.jpg" alt="" /></div>
          </Carousel>
        </div>
        <div className={styles.btnWrap}>
          <ButtonGroup>
            <Button>全部</Button>
            <Button>学习用品</Button>
            <Button>生活用品</Button>
            <Button>娱乐用品</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

search.propTypes = {

};

export default search;