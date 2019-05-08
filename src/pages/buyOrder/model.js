import modelExtend from 'dva-model-extend'
import { pathMatchRegexp, getSession } from 'utils'
import { message } from 'antd'
import { model } from 'utils/model'
import api from 'api'

const { queryBuyOrder, updateOrderStatus, deleteOrder } = api

export default modelExtend(model, {
  namespace: 'buyOrder',
  state: {
    data: [],
    modalVisible: false,
    currentItem: {},
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/buyOrder') {
          dispatch({
            type: 'query',
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
      const res = yield call(queryBuyOrder, params)
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
    *updateStatus({ payload }, { call, put }) {
      const res = yield call(updateOrderStatus, payload)
      if (res.code === '200') {
        message.success('订单状态更新成功！')
        yield put({
          type: 'query',
        })
      } else {
        message.error('网络出小差啦！！！')
      }
    },
    *delete({ payload }, { call, put }) {
      const res = yield call(deleteOrder, payload)
      if (res.code === '200') {
        message.success('订单删除成功！')
        yield put({
          type: 'query',
        })
      } else {
        message.error('网络出小差啦！！！')
      }
    },
  },
})
