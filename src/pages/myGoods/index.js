import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import List from './components/List'
import Modal from './components/Modal'

@connect(({ loading, dispatch, myGoods }) => ({ loading, dispatch, myGoods }))
class MyGoods extends PureComponent {
  onChangeGoodsStatus = (goodsId, status) => {
    const { dispatch } = this.props
    dispatch({
      type: 'myGoods/updateGoodsStatus',
      payload: {
        goodsId,
        status,
      },
    })
  }

  onShowModal = record => {
    const { dispatch } = this.props
    dispatch({
      type: 'myGoods/updateState',
      payload: {
        modalVisible: true,
        currentItem: record,
      },
    })
  }

  onCloseModal = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'myGoods/updateState',
      payload: {
        modalVisible: false,
        currentItem: {},
      },
    })
  }

  onOk = (goodsId, num) => {
    const { dispatch } = this.props
    console.log(goodsId, num)
    dispatch({
      type: 'myGoods/updateState',
      payload: {
        modalVisible: false,
        currentItem: {},
      },
    })
    dispatch({
      type: 'myGoods/updateGoodsNum',
      payload: {
        goodsId,
        num,
      },
    })
  }

  render() {
    const { data, modalVisible, currentItem } = this.props.myGoods

    const listProps = {
      data,
      onChangeGoodsStatus: this.onChangeGoodsStatus,
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
        <div className={styles.title}>我的闲置</div>
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </div>
    )
  }
}

export default MyGoods
