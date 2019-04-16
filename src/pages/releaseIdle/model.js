import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'
import api from 'api'
import { message } from 'antd'

const { sendMsg, verifyCode, register } = api

export default modelExtend(model, {
  namespace: 'releaseIdle',
  state: {
    goodName: '',
    goodType: '',
    goodPrice: '',
    goodPicUrl: '',
    goodDesc: '',
    test: '1111',
  },
  effects: {

  },
})
