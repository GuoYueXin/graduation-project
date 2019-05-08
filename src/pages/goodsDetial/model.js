import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import router from 'umi/router'
import { pathMatchRegexp, getSession } from 'utils'
import { model } from 'utils/model'
import api from 'api'

const {
  queryGoodsDetail,
  addCart,
  addCollect,
  queryIsCollect,
  cancelCollect,
  addOrder,
} = api

export default modelExtend(model, {
  namespace: 'goodsDetial',
  state: {
    msg: 'goodsDetial',
    good: {},
    user: {},
    isCollect: false,
    num: 1,
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/goodsDetial' && query) {
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
      const res = yield call(queryGoodsDetail, payload)
      const { code, data } = res
      if (code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            good: data.goodInfo,
            user: data.userInfo,
          },
        })
        const params = {
          goodsId: data.goodInfo.goodsId,
          userId: user.userId,
        }
        const result = yield call(queryIsCollect, params)
        if (result.code === '200') {
          yield put({
            type: 'updateState',
            payload: {
              isCollect: result.data === 0 ? false : true,
            },
          })
        }
      } else {
        message.error('网络出小差啦！！！')
      }
    },
    *addShopCart({ payload }, { call, select }) {
      const user = JSON.parse(getSession('user'))
      const { good } = yield select(_ => _.goodsDetial)
      const params = {
        goodsId: good.goodsId,
        userId: user.userId,
        num: 1,
      }
      const res = yield call(addCart, params)
      if (res.code === '200') {
        message.success('添加购物车成功')
      } else {
        message.error('网络出小差啦！！！')
      }
    },
    *addCollect({ payload }, { put, call, select }) {
      const user = JSON.parse(getSession('user'))
      const { good } = yield select(_ => _.goodsDetial)
      const params = {
        goodsId: good.goodsId,
        userId: user.userId,
      }
      const res = yield call(addCollect, params)
      if (res.code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            isCollect: true,
          },
        })
        message.success('收藏成功')
      } else {
        message.error('网络出小差啦！！！')
      }
    },
    *cancelCollect({ payload }, { call, put, select }) {
      const user = JSON.parse(getSession('user'))
      const { good } = yield select(_ => _.goodsDetial)
      const params = {
        goodsId: good.goodsId,
        userId: user.userId,
      }
      const res = yield call(cancelCollect, params)
      if (res.code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            isCollect: false,
          },
        })
        message.success('取消收藏成功')
      } else {
        message.error('网络出小差啦！！！')
      }
    },
    *addOrder({ payload }, { put, call, select }) {
      const user = JSON.parse(getSession('user'))
      const { good, num } = yield select(_ => _.goodsDetial)
      const params = {
        goodsId: good.goodsId,
        goodsPrice: good.goodsPrice,
        goodsName: good.goodsName,
        sellUserId: good.userId,
        userId: user.userId,
        userPhone: user.phoneNumber,
        num,
      }
      const res = yield call(addOrder, params)
      if (res.code === '200') {
        message.success(
          '下单成功，订单消息已经发送给卖家，请及时查看相关消息！'
        )
        setTimeout(() => {
          router.push('/home')
        }, 2000)
      } else {
        message.error('网络出小差啦！！！')
      }
    },
  },
})
