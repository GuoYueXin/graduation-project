import React, { PureComponent } from 'react'
import { connect } from 'dva'
import GoodMain from './components/goodMain'
import GoodDesc from './components/goodDesc'
import styles from './index.less'

@connect(({ loading, goodsDetial }) => ({ loading, goodsDetial }))
class index extends PureComponent {
  addShopCart = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'goodsDetial/addShopCart',
    })
  }

  addCollect = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'goodsDetial/addCollect',
    })
  }
  cancelCollect = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'goodsDetial/cancelCollect',
    })
  }

  changeNum = value => {
    const { dispatch } = this.props
    dispatch({
      type: 'goodsDetial/updateState',
      payload: {
        num: +value,
      },
    })
  }

  addOrder = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'goodsDetial/addOrder',
    })
  }

  render() {
    const { user, good, isCollect } = this.props.goodsDetial
    const goodMainProps = {
      user,
      good,
      isCollect,
      addShopCart: this.addShopCart,
      addCollect: this.addCollect,
      cancelCollect: this.cancelCollect,
      changeNum: this.changeNum,
      addOrder: this.addOrder,
    }
    const goodDescProps = {
      good,
    }
    return (
      <div className={styles.wrap}>
        <div className={styles.userTitle}>
          <image className={styles.userIcon} src={user.userIcon} />
          <span className={styles.userName}>{user.username}的店铺</span>
        </div>
        <GoodMain {...goodMainProps} />
        <div className={styles.black} />
        <GoodDesc {...goodDescProps} />
      </div>
    )
  }
}

export default index
