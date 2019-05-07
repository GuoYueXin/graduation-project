import React, { PureComponent } from 'react'
import { Modal, InputNumber } from 'antd'

class modal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      num: 1,
    }
  }

  handleChange = num => {
    this.setState({
      num,
    })
  }

  handleOk = () => {
    const { onOk, currentItem } = this.props
    const { num } = this.state
    onOk(currentItem.goodsId, currentItem.goodsNum + num)
  }

  render() {
    const { modalVisible, onCancel } = this.props
    const modalProps = {
      title: '商品补货',
      visible: modalVisible,
      okText: '确定',
      cancelText: '取消',
      onCancel,
      onOk: this.handleOk,
    }
    const inputNumberProps = {
      min: 1,
      defaultValue: 1,
      onChange: this.handleChange,
    }
    return (
      <Modal {...modalProps}>
        <div>
          请输入补货商品数量：
          <InputNumber {...inputNumberProps} />
        </div>
      </Modal>
    )
  }
}

export default modal
