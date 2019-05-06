import React, { PureComponent } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { Button } from 'antd'
import styles from './goodMain.less'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

class index extends PureComponent {
  render() {
    const { user, good } = this.props
    const carouselProps = {
      infiniteLoop: true,
      autoPlay: true,
    }
    const renderDom =
      good.goodsPic &&
      good.goodsPic.split('|').map(item => {
        return (
          <div style={{ width: 300, height: 300 }}>
            <img src={`http://127.0.0.1:7777/imgs/${item}`} />
          </div>
        )
      })
    return (
      <div className={styles.content}>
        <Carousel className={styles.carousel} {...carouselProps}>
          {renderDom}
        </Carousel>
        <div className={styles.goodDesc}>
          <div className={styles.goodName}>{good.goodsName}</div>
          <div className={styles.goodPrice}>
            <span className={styles.item}>价格:</span>
            <span style={{ fontSize: 24, color: '#999' }}>&yen; </span>
            <span style={{ fontSize: 24, fontWeight: 'bold', color: 'red' }}>
              {good.goodsPrice}
            </span>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userPhone}>
              <span className={styles.item}>手机号:</span>
              {user.phoneNumber}
            </div>
            <div className={styles.other}>
              <span className={styles.item} style={{ float: 'left' }}>
                其他联系方式:
              </span>
              <div className={styles.QQ}>
                <div className={styles.otherItem}>QQ: {user.QQ}</div>
                <div className={styles.otherItem}>地址: {user.address}</div>
              </div>
            </div>
          </div>
          <div className={styles.btnWrap}>
            <Button type="primary">立即购买</Button>
            <Button type="primary">加入购物车</Button>
            <Button type="primary">收藏</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default index
