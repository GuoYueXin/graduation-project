import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Modal } from 'antd'

const FormItem = Form.Item
const confirm = Modal.confirm
let timer

@Form.create()
class thirdPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      second: 60,
    }
  }

  handleConfirm = num => {
    const { handleVerify, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      } else {
        handleVerify(values)
      }
    })
  }

  handleSend = () => {
    const { handleSend, phoneNumber } = this.props
    const { second } = this.state
    let temp = second
    handleSend({ phoneNumber })
    if (!timer) {
      timer = setInterval(() => {
        if (temp === 0) {
          clearInterval(timer)
          timer = null
          this.setState({
            second: 60,
          })
        } else {
          this.setState({
            second: temp--,
          })
        }
      }, 1000)
    }
  }

  render() {
    const { form, phoneNumber, changeStep } = this.props
    const { second } = this.state
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const showConfirm = () => {
      confirm({
        title: '您确定要返回上一步吗?',
        content: '返回上一步本次编辑将不会保留！',
        onOk() {
          changeStep({ step: 1 })
        },
        okText: '确定',
        cancelText: '取消',
      })
    }

    return (
      <Form {...formItemLayout}>
        <FormItem label="手机号">
          {getFieldDecorator('phoneNumber', {
            initialValue: phoneNumber,
          })(<Input disabled />)}
        </FormItem>
        <FormItem label="验证码">
          {getFieldDecorator('authCode', {
            rules: [
              {
                required: true,
                message: '请输入验证码',
              },
            ],
          })(
            <Input
              placeholder="请输入验证码"
              style={{ width: 145, marginRight: 50 }}
            />
          )}
          <Button
            type="primary"
            onClick={this.handleSend}
            style={{ width: 70 }}
          >
            {second === 60 ? '发送' : `${second}''`}
          </Button>
        </FormItem>
        <div>
          <Button
            type="primary"
            style={{ margin: '0 128px' }}
            onClick={() => this.handleConfirm(3)}
          >
            下一步
          </Button>
          <Button onClick={showConfirm}>上一步</Button>
        </div>
      </Form>
    )
  }
}

thirdPage.propTypes = {
  form: PropTypes.object,
}

export default thirdPage
