import React, { PureComponent } from 'react'
import { connect } from 'dva'
import List from './components/List'

@connect(({ loading, dispatch, buyOrder }) => ({ loading, dispatch, buyOrder }))
class BuyOrder extends PureComponent {
  onChangeStatus = orderId => {
    const { dispatch } = this.props
    dispatch({
      type: 'buyOrder/updateStatus',
      payload: {
        orderId,
        buyStatus: 1,
      },
    })
  }

  onDeleteOrder = orderId => {
    const { dispatch } = this.props
    dispatch({
      type: 'buyOrder/delete',
      payload: {
        orderId,
        buyDelFlag: 1,
      },
    })
  }

  render() {
    const { data } = this.props.buyOrder

    const listProps = {
      data,
      onChangeStatus: this.onChangeStatus,
      onDeleteOrder: this.onDeleteOrder,
    }

    return (
      <div>
        <List {...listProps} />
      </div>
    )
  }
}

export default BuyOrder
