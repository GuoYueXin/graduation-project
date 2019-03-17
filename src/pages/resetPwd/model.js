import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'

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
  }
})