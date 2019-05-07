import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'
import api from 'api'

const { queryGoods } = api

export default modelExtend(model, {
  namespace: 'home',
  state: {
    data: [],
    goodsType: 0,
    keyWords: '',
    pageOption: {
      showSizeChanger: true,
      showQuickJumper: true,
      hideOnSinglePage: true,
      pageSizeOptions: ['12', '24', '48'],
      current: 1,
      total: 0,
      pageSize: 12,
    },
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/home') {
          dispatch({
            type: 'query',
            payload: {
              pageSize: 12,
              current: 1,
              goodsType: 0,
            },
          })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const { pageOption, goodsType, keyWords } = yield select(_ => _.home)
      const params = {
        ...payload,
        goodsType,
        keyWords,
      }
      const res = yield call(queryGoods, params)
      const { code, data } = res
      if (code === '200') {
        yield put({
          type: 'updateState',
          payload: {
            data: data.data,
            pageOption: {
              ...pageOption,
              total: data.total,
              pageSize: data.pageSize,
              current: data.current,
            },
          },
        })
      }
    },
  },
})
