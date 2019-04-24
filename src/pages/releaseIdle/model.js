import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'
import api from 'api'
import { message } from 'antd'

const { addGoods } = api

export default modelExtend(model, {
  namespace: 'releaseIdle',
  state: {
    goodsName: '',
    goodsType: '',
    goodsPrice: '',
    goodsPic: '',
    goodsDesc: '',
    goodsNum: 1,
  },
  effects: {
    *addGoods({ payload }, { call, put, select }) {
      const { user } = yield select(_ => _.app)
      const params = {
        ...payload,
        userId: user.userId,
      }
      console.log('params', params)
      const data = yield call(addGoods, params)
      console.log(data)
      if (data.code === '200') {
        message.success('商品发布成功')
      } else {
        message.error('商品发布失败，请稍后重试')
      }
    },
  },
})
