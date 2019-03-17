import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'

export default modelExtend(model, {
  namespace: 'register',
  state: {
    step: 0,
    school: '',
    username: '',
    phoneNumber: '',
    password: '',
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
  }
})