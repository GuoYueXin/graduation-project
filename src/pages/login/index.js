import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form } from 'antd'
import { withI18n } from '@lingui/react'

import styles from './index.less'
const FormItem = Form.Item

@withI18n()
@connect(({ loading }) => ({ loading }))
@Form.create()
class Login extends PureComponent {
  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <div className={styles.wrap}>
        <div className={styles.login}>
          <div className={styles.loginContent}>
            <div className={styles.icon} />
            <div className={styles.title}>欢迎来到校园闲鱼</div>
            <div className={styles.inputBox}>
              <Form>
                <FormItem>
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        required: true,
                        message: '请输入用户名',
                      },
                    ],
                  })(<input type="text" />)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                      },
                    ],
                  })(<input type="password" />)}
                </FormItem>
              </Form>
            </div>
            <button onClick={this.handleOk}>Login</button>
            <div className={styles.helpTips}>
              <span className={styles.forget}>忘记密码</span>
              <span className={styles.register}>注册</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
