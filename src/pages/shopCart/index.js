import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import List from './components/List'
import Modal from './components/Modal'

@connect(({ loading, dispatch, shopCart }) => ({ loading, dispatch, shopCart }))
class ShopCart extends PureComponent {
  onShowModal = record => {
    const { dispatch } = this.props
    dispatch({
      type: 'shopCart/updateState',
      payload: {
        modalVisible: true,
        currentItem: record,
      },
    })
  }

  onCloseModal = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'shopCart/updateState',
      payload: {
        modalVisible: false,
        currentItem: {},
      },
    })
  }

  onOk = (currentItem, num) => {
    const { dispatch } = this.props
    dispatch({
      type: 'shopCart/updateState',
      payload: {
        modalVisible: false,
        currentItem: {},
      },
    })
    dispatch({
      type: 'shopCart/addOrder',
      payload: {
        goodsId: currentItem.goodsId,
        goodsName: currentItem.goodsName,
        goodsPrice: currentItem.goodsPrice,
        num,
        sellUserId: currentItem.userId,
      },
    })
  }

  onDelete = goodsId => {
    const { dispatch } = this.props
    dispatch({
      type: 'shopCart/delete',
      payload: {
        goodsId,
      },
    })
  }

  render() {
    const { data, modalVisible, currentItem } = this.props.shopCart

    const listProps = {
      data,
      onDelete: this.onDelete,
      onShow: this.onShowModal,
    }

    const modalProps = {
      modalVisible,
      currentItem,
      onCancel: this.onCloseModal,
      onOk: this.onOk,
    }

    return (
      <div className={styles.wrap}>
        <div className={styles.title}>我的购物车</div>
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </div>
    )
  }
}

export default ShopCart
