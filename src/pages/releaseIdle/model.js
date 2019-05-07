import modelExtend from 'dva-model-extend'
import { getSession } from 'utils'
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
      const user = JSON.parse(getSession('user'))
      const params = {
        ...payload,
        userId: user.userId,
      }
      const data = yield call(addGoods, params)
      if (data.code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            goodsName: '',
            goodsType: '',
            goodsPrice: '',
            goodsPic: '',
            goodsDesc: '',
            goodsNum: 1,
          },
        })
        message.success('商品发布成功')
      } else {
        message.error('商品发布失败，请稍后重试')
      }
    },
  },
})
