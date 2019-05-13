import React, { PureComponent } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { Button, message, InputNumber, Modal } from 'antd'
import { getSession } from 'utils'
import styles from './goodMain.less'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const confirm = Modal.confirm

class index extends PureComponent {
  handleChangeNum = value => {
    const { changeNum } = this.props
    changeNum(value)
  }

  handleAddCart = () => {
    const { addShopCart } = this.props
    const isLogin = getSession('isLogin')
    if (isLogin) {
      addShopCart()
    } else {
      message.warning('您还没有登录，快去登录吧！')
    }
  }

  handleCollect = e => {
    const { addCollect, cancelCollect } = this.props
    const isLogin = getSession('isLogin')
    if (isLogin) {
      if (e.target.innerText === '收 藏') {
        addCollect()
      } else {
        cancelCollect()
      }
    } else {
      message.warning('您还没有登录，快去登录吧！')
    }
  }

  handleConfirm = () => {
    const { addOrder } = this.props
    const isLogin = getSession('isLogin')
    if (isLogin) {
      confirm({
        title: '确定要购买该商品吗?',
        content: '确定后将会向卖家发送订单消息。',
        cancelText: '取消',
        okText: '确定',
        onOk() {
          addOrder()
        },
        onCancel() {
          console.log('Cancel')
        },
      })
    } else {
      message.warning('您还没有登录，快去登录吧！')
    }
  }

  render() {
    const { user, good, isCollect } = this.props
    const userInfo = JSON.parse(getSession('user'))
    const carouselProps = {
      infiniteLoop: true,
      autoPlay: true,
      showStatus: false,
      showThumbs: false,
    }
    const inputNumPoros = {
      defaultValue: 1,
      onChange: this.handleChangeNum,
      min: 1,
      max: good.goodsNum,
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
            <div className={styles.numWrap}>
              <span className={styles.item}>数量:</span>
              <InputNumber {...inputNumPoros} />
              {good.goodsNum <= 2 && (
                <span style={{ color: 'red', marginLeft: 10 }}>
                  即将售罄，仅剩{good.goodsNum}件
                </span>
              )}
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
            <Button
              type="primary"
              onClick={this.handleConfirm}
              disabled={user.userId === userInfo.userId}
            >
              立即购买
            </Button>
            <Button
              type="primary"
              onClick={this.handleAddCart}
              disabled={user.userId === userInfo.userId}
            >
              加入购物车
            </Button>
            <Button type="primary" onClick={this.handleCollect}>
              {isCollect ? '取消收藏' : '收藏'}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default index
