import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import List from './components/List'

@connect(({ loading, dispatch, collect }) => ({ loading, dispatch, collect }))
class Collect extends PureComponent {
  onCancelCollect = goodsId => {
    const { dispatch } = this.props
    dispatch({
      type: 'collect/cancelCollect',
      payload: {
        goodsId,
      },
    })
  }

  render() {
    const { data } = this.props.collect

    const listProps = {
      data,
      onCancelCollect: this.onCancelCollect,
    }

    return (
      <div className={styles.wrap}>
        <div className={styles.title}>我的收藏</div>
        <List {...listProps} />
      </div>
    )
  }
}

export default Collect
