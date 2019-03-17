import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import styles from './index.less'
import { Steps } from 'antd';
import FirstPage from './components/firstPage';
import SecondPage from './components/secondPage';
import ThirdPage from './components/thirdPage';
import FourthPage from './components/fourthPage';

const Step = Steps.Step;

@withI18n()
@connect(({ loading, dispatch, register }) => ({ loading, dispatch, register }))
class Register extends PureComponent {

  changeStep = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'register/updateState',
      payload: {
        ...payload
      }
    });
  }

  render() {
    const {
      step,
      school,
      username,
      phoneNumber,
      password,
      question1,
      question2,
      answer1,
      answer2,
    } = this.props.register;
    const stepProps = {
      current: step,
      labelPlacement: 'vertical',
      style: { borderBottom: '1px solid #999', padding: '0 30px 20px' }
    }

    const firstProps = {
      changeStep: this.changeStep,
      school,
      username,
      phoneNumber,
    }

    const secondProps = {
      changeStep: this.changeStep,
      password,
    }

    const thirdProps = {
      changeStep: this.changeStep,
      question1,
      question2,
      answer1,
      answer2,
    }

    return (
      <div className={styles.mainWrap}>
        <Steps {...stepProps}>
          <Step title="设置账号" />
          <Step title="设置密码" />
          <Step title="设置密保问题" />
          <Step title="注册成功" />
        </Steps>
        <div className={styles.content}>
          <div className={styles.contentWrap}>
            {step === 0 && <FirstPage {...firstProps} />}
            {step === 1 && <SecondPage {...secondProps} />}
            {step === 2 && <ThirdPage {...thirdProps} />}
            {step === 3 && <FourthPage />}
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Register
