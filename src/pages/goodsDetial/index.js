import React, { PureComponent } from 'react'
import { connect } from 'dva'
import GoodMain from './components/goodMain'
import GoodDesc from './components/goodDesc'
import styles from './index.less'

@connect(({ loading, goodsDetial }) => ({ loading, goodsDetial }))
class index extends PureComponent {
  render() {
    const { user, good } = this.props.goodsDetial
    const goodMainProps = {
      user,
      good,
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
