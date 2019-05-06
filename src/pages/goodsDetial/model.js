import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { pathMatchRegexp } from 'utils'
import { model } from 'utils/model'
import api from 'api'

const { queryGoodsDetail } = api

export default modelExtend(model, {
  namespace: 'goodsDetial',
  state: {
    msg: 'goodsDetial',
    good: {},
    user: {},
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (query) {
          dispatch({
            type: 'query',
            payload: {
              goodsId: query.id,
            },
          })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(queryGoodsDetail, payload)
      console.log(res)
      const { code, data } = res
      if (code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            good: data.goodInfo,
            user: data.userInfo,
          },
        })
      } else {
        message.error('网络出小差啦！！！')
      }
    },
  },
})
