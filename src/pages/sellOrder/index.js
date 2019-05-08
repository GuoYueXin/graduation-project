import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import List from './components/List'

@connect(({ loading, dispatch, sellOrder }) => ({
  loading,
  dispatch,
  sellOrder,
}))
class SellOrder extends PureComponent {
  onChangeStatus = orderId => {
    const { dispatch } = this.props
    dispatch({
      type: 'sellOrder/updateStatus',
      payload: {
        orderId,
        sellStatus: 1,
      },
    })
  }

  onDeleteOrder = orderId => {
    const { dispatch } = this.props
    dispatch({
      type: 'sellOrder/delete',
      payload: {
        orderId,
        sellDelFlag: 1,
      },
    })
  }

  render() {
    const { data } = this.props.sellOrder

    const listProps = {
      data,
      onChangeStatus: this.onChangeStatus,
      onDeleteOrder: this.onDeleteOrder,
    }

    return (
      <div className={styles.wrap}>
        <List {...listProps} />
      </div>
    )
  }
}

export default SellOrder
