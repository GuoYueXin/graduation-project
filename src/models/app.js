import React from 'react'
import { router, delSession, getSession } from 'utils'
import { stringify } from 'qs'
import Link from 'umi/link'
import store from 'store'
import { queryLayout, pathMatchRegexp } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import config from 'config'
import api from 'api'
import { notification, Button } from 'antd'

const { queryMessage, updateMessage } = api
const { menu, visit } = config
let timer = null

export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit,
    },
    routeList: [...menu],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },

    setup({ dispatch }) {
      dispatch({ type: 'query' })
      if (!timer) {
        timer = setInterval(() => {
          const user = JSON.parse(getSession('user'))
          if (user) {
            dispatch({
              type: 'queryMessage',
              payload: {
                userId: user.userId,
              },
            })
          }
        }, 5000)
      }
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      // const { success, user } = yield call(queryUserInfo, payload)
      const { locationPathname } = yield select(_ => _.app)
      const { user = { id: -1 } } = yield select(_ => _.login)

      if (user.id !== -1) {
        yield put({
          type: 'updateState',
          payload: {
            user,
          },
        })
        if (pathMatchRegexp(['/', '/login'], window.location.pathname)) {
          router.push({
            pathname: '/home',
          })
        }
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        router.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname,
          }),
        })
      }
    },

    *signOut({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          user: {},
        },
      })
      delSession('isLogin')
      router.push('/login')
    },

    *queryMessage({ payload }, { call, put }) {
      const res = yield call(queryMessage, payload)
      if (res.code === '200' && res.data.length !== 0) {
        notification.warning({
          message: '您有新订单，请及时查看！',
          description: `订单商品为${
            res.data.goodsName
          },请及时到“我卖出的订单”中进行查看处理`,
          duration: null,
          btn: (
            <Button
              type="primary"
              size="small"
              onClick={() => {
                notification.destroy()
              }}
            >
              已阅读
            </Button>
          ),
        })
        yield put({
          type: 'updateMessage',
          payload: {
            messageId: res.data.messageId,
          },
        })
      }
    },
    *updateMessage({ payload }, { call, put }) {
      yield call(updateMessage, payload)
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },
  },
}
