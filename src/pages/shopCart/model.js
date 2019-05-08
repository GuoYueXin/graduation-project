import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { pathMatchRegexp, getSession } from 'utils'
import { model } from 'utils/model'
import api from 'api'

const { queryShopCart, addOrder, deleteShopCart } = api

export default modelExtend(model, {
  namespace: 'shopCart',
  state: {
    data: [],
    modalVisible: false,
    currentItem: {},
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/shopCart' && query) {
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
      const res = yield call(queryShopCart, params)
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
    *addOrder({ payload }, { put, call }) {
      const user = JSON.parse(getSession('user'))
      const params = {
        ...payload,
        userId: user.userId,
        userPhone: user.phoneNumber,
      }
      const res = yield call(addOrder, params)
      if (res.code === '200') {
        message.success(
          '下单成功，订单消息已经发送给卖家，请及时查看相关消息！'
        )
      } else {
        message.error('网络出小差啦！！！')
      }
    },
    *delete({ payload }, { call, put }) {
      const user = JSON.parse(getSession('user'))
      const params = {
        ...payload,
        userId: user.userId,
      }
      const res = yield call(deleteShopCart, params)
      if (res.code === '200') {
        yield put({
          type: 'query',
        })
        message.success('删除成功')
      } else {
        message.error('网络出小差啦！！！')
      }
    },
  },
})
