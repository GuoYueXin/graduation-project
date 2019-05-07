import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { pathMatchRegexp, getSession } from 'utils'
import { model } from 'utils/model'
import api from 'api'

const { queryByUserId, updateStatus, updateGoodsNum } = api
const user = JSON.parse(getSession('user'))

export default modelExtend(model, {
  namespace: 'myGoods',
  state: {
    data: [],
    modalVisible: false,
    currentItem: {},
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/myGoods' && query) {
          dispatch({
            type: 'query',
          })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const params = {
        userId: user.userId,
      }
      const res = yield call(queryByUserId, params)
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
    *updateGoodsStatus({ payload }, { call, put }) {
      const res = yield call(updateStatus, payload)
      const { code } = res
      if (code === '200') {
        yield put({
          type: 'query',
        })
        message.success('商品状态更新成功')
      }
    },
    *updateGoodsNum({ payload }, { call, put }) {
      const res = yield call(updateGoodsNum, payload)
      const { code } = res
      if (code === '200') {
        yield put({
          type: 'query',
        })
        message.success('商品补货成功')
      }
    },
  },
})
