import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Steps } from 'antd';
import styles from './index.less';
import FirstPage from './components/firstPage.js';
import SecondPage from './components/secondPage';
import ThirdPage from './components/thirdPage';
import FourthPage from './components/fourthPage';

const Step = Steps.Step;

@connect(({ loading, dispatch, resetPwd }) => ({ loading, dispatch, resetPwd }))
class ResetPwd extends PureComponent {

  changeStep = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'resetPwd/updateState',
      payload: {
        ...payload
      }
    });
  }

  render() {
    const {
      step,
      phoneNumber,
      question1,
      question2,
      answer1,
      answer2,
      password,
    } = this.props.resetPwd;
    const stepProps = {
      current: step,
      labelPlacement: 'vertical',
      style: { borderBottom: '1px solid #999', padding: '0 30px 20px' }
    }

    const firstProps = {
      changeStep: this.changeStep,
      phoneNumber
    }

    const secondProps = {
      changeStep: this.changeStep,
      question1,
      question2,
      answer1,
      answer2,
    }

    const thirdProps = {
      changeStep: this.changeStep,
      password,
    }

    return (
      <div className={styles.mainWrap}>
        <Steps {...stepProps}>
          <Step title="填写手机号" />
          <Step title="填写密保问题" />
          <Step title="设置新密码" />
          <Step title="修改成功" />
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

ResetPwd.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default ResetPwd;
