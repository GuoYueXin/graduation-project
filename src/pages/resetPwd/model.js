import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'
import api from 'api'
import { message } from 'antd'

const { sendMsg, verifyCode, resetPwd } = api

export default modelExtend(model, {
  namespace: 'resetPwd',
  state: {
    step: 0,
    phoneNumber: '',
    password: '',
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
  },
  effects: {
    *sendCode({ payload }, { call }) {
      const data = yield call(sendMsg, payload)
      if (data.code === '200') {
        message.success('验证码已发送')
      } else {
        throw data
      }
    },
    *verifyCode({ payload }, { put, call, select }) {
      const data = yield call(verifyCode, payload)
      if (data.code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            step: 1,
          },
        })
      } else {
        throw data
      }
    },
    *forgetPwd({ payload }, { put, call, select }) {
      const { phoneNumber } = yield select(_ => _.resetPwd);
      console.log('number', phoneNumber);
      const params = {
        phoneNumber,
        ...payload,
      }
      const data = yield call(resetPwd, params);
      if (data.code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            step: 2
          }
        });
      }
    }
  },
})
