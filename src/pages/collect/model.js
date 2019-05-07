import modelExtend from 'dva-model-extend'
import { message } from 'antd'
// import router from 'umi/router'
import { pathMatchRegexp, getSession } from 'utils'
import { model } from 'utils/model'
import api from 'api'

const { queryCollect, cancelCollect } = api
const user = JSON.parse(getSession('user'))

export default modelExtend(model, {
  namespace: 'collect',
  state: {
    data: [],
    msg: 'test',
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/collect' && query) {
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
      const user = JSON.parse(getSession('user'))
      const params = {
        userId: user.userId,
      }
      const res = yield call(queryCollect, params)
      const { code, data } = res
      if (code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            data,
          },
        })
      }
    },
    *cancelCollect({ payload }, { call, put }) {
      const params = {
        ...payload,
        userId: user.userId,
      }
      const res = yield call(cancelCollect, params)
      if (res.code === '200') {
        yield put({
          type: 'query',
        })
        message.success('取消收藏成功')
      } else {
        message.error('网络出小差啦！！！')
      }
    },
  },
})
