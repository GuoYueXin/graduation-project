import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Steps } from 'antd'
import styles from './index.less'
import FirstPage from './components/firstPage.js'
import ThirdPage from './components/thirdPage'
import FourthPage from './components/fourthPage'

const Step = Steps.Step

@connect(({ loading, dispatch, resetPwd }) => ({ loading, dispatch, resetPwd }))
class ResetPwd extends PureComponent {
  changeStep = payload => {
    const { dispatch } = this.props
    dispatch({
      type: 'resetPwd/updateState',
      payload: {
        ...payload,
      },
    })
  }

  handleSend = payload => {
    const { dispatch } = this.props
    dispatch({
      type: 'resetPwd/updateState',
      payload: {
        ...payload,
      },
    })
    dispatch({
      type: 'resetPwd/sendCode',
      payload: {
        ...payload,
      },
    })
  }

  handleVerify = payload => {
    const { dispatch } = this.props
    dispatch({
      type: 'resetPwd/verifyCode',
      payload: {
        ...payload,
      },
    })
  }

  handleReset = payload => {
    const { dispatch } = this.props;
    dispatch({
      type: 'resetPwd/forgetPwd',
      payload: {
        ...payload,
      },
    });
  }

  render() {
    const { step, phoneNumber, password } = this.props.resetPwd
    const stepProps = {
      current: step,
      labelPlacement: 'vertical',
      style: { borderBottom: '1px solid #999', padding: '0 30px 20px' },
    }

    const firstProps = {
      handleVerify: this.handleVerify,
      handleSend: this.handleSend,
      phoneNumber,
    }

    const thirdProps = {
      handleReset: this.handleReset,
      changeStep: this.changeStep,
      password,
    }

    return (
      <div className={styles.mainWrap}>
        <Steps {...stepProps}>
          <Step title="填写手机号" />
          <Step title="设置新密码" />
          <Step title="修改成功" />
        </Steps>
        <div className={styles.content}>
          <div className={styles.contentWrap}>
            {step === 0 && <FirstPage {...firstProps} />}
            {step === 1 && <ThirdPage {...thirdProps} />}
            {step === 2 && <FourthPage />}
          </div>
        </div>
      </div>
    )
  }
}

ResetPwd.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default ResetPwd
