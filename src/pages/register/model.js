import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'
import api from 'api'
import { message } from 'antd'

const { sendMsg, verifyCode, register } = api

export default modelExtend(model, {
  namespace: 'register',
  state: {
    step: 0,
    school: '',
    username: '',
    phoneNumber: '',
    password: '',
    authCode: '',
  },
  effects: {
    *sendCode({ payload }, { call }) {
      const data = yield call(sendMsg, payload)
      if (data.code === '200') {
        message.success('验证码已发送')
      } else if (data.code === '501') {
        message.error('该手机已被注册，请返回上一步修改手机号！')
      } else {
        throw data
      }
    },
    *verifyCode({ payload }, { put, call, select }) {
      const data = yield call(verifyCode, payload)
      if (data.code === '200') {
        yield put({
          type: 'register',
        })
      } else {
        throw data
      }
    },
    *register({ payload }, { put, call, select }) {
      const { username, password, phoneNumber, school } = yield select(
        _ => _.register
      )
      const params = {
        username,
        password,
        phoneNumber,
        school,
      }
      const data = yield call(register, params)
      if (data.code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            step: 3,
          },
        })
      } else {
        message.error('注册失败，请检查您的注册信息')
      }
    },
  },
})
