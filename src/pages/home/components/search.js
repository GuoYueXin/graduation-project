import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Carousel, Radio } from 'antd'
import styles from './search.less'

const Search = Input.Search

class search extends Component {
  onHandleChange = e => {
    const { onChangeType } = this.props
    onChangeType(e.target.value)
  }

  onHandleSearch = value => {
    const { onSearch } = this.props
    onSearch(value)
  }

  render() {
    const { goodsType } = this.props
    const carouselProps = {
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      infinite: true,
      className: 'slider-test',
    }
    return (
      <div className={styles.wrap}>
        <div className={styles.search}>
          <Search
            placeholder="请输入关键字"
            enterButton="搜索"
            size="large"
            onSearch={this.onHandleSearch}
          />
        </div>
        <div className={styles.loopPic}>
          <Carousel {...carouselProps}>
            <div>
              <img
                src="https://img.alicdn.com/simba/img/TB14nTMMkPoK1RjSZKbSut1IXXa.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://img.alicdn.com/tfs/TB1X0PxLxjaK1RjSZFAXXbdLFXa-520-280.jpg_q90_.webp"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://img.alicdn.com/simba/img/TB1CLenKMHqK1RjSZFPSuwwapXa.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://img.alicdn.com/simba/img/TB1i87HL3HqK1RjSZJnSuvNLpXa.jpg"
                alt=""
              />
            </div>
          </Carousel>
        </div>
        <div className={styles.btnWrap}>
          <Radio.Group value={+goodsType} onChange={this.onHandleChange}>
            <Radio.Button value={0}>全部</Radio.Button>
            <Radio.Button value={1}>学习用品</Radio.Button>
            <Radio.Button value={2}>生活用品</Radio.Button>
            <Radio.Button value={3}>娱乐用品</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    )
  }
}

search.propTypes = {}

export default search
