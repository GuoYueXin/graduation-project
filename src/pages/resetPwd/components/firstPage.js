import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'umi/link'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item
let timer

@Form.create()
class firstPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      second: 60,
    }
  }

  handleConfirm = () => {
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
    const { handleSend, form } = this.props
    const { getFieldValue } = form
    const { second } = this.state
    const phoneNumber = getFieldValue('phoneNumber')
    let temp = second
    handleSend({ phoneNumber, type: 'update' })
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
    const { form, phoneNumber } = this.props
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
    return (
      <Form {...formItemLayout}>
        <FormItem label="手机号">
          {getFieldDecorator('phoneNumber', {
            initialValue: phoneNumber,
          })(<Input placeholder="请输入绑定的手机号" />)}
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
            style={{ margin: '0 130px' }}
            onClick={() => this.handleConfirm(1)}
          >
            下一步
          </Button>
          <Link to="/login">返回登录页</Link>
        </div>
      </Form>
    )
  }
}

firstPage.propTypes = {
  form: PropTypes.object,
}

export default firstPage
