import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'
import api from 'api'
import { message } from 'antd'
import { getSession, setSession } from 'utils'

const { updateUserInfo } = api

export default modelExtend(model, {
  namespace: 'userCenter',
  state: {
    userId: '',
    username: '',
    userIcon: '',
    address: '',
    QQ: '',
    phoneNumber: '',
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/userCenter') {
          const user = JSON.parse(getSession('user'))
          dispatch({
            type: 'updateState',
            payload: {
              userId: user.userId,
              username: user.username,
              userIcon: user.userIcon,
              address: user.address,
              QQ: user.QQ,
              phoneNumber: user.phoneNumber,
            },
          })
        }
      })
    },
  },
  effects: {
    *update({ payload }, { call }) {
      const data = yield call(updateUserInfo, payload)
      if (data.code === '200') {
        setSession('user', JSON.stringify(data.data))
        message.success('用户信息修改成功')
      } else {
        message.error('用户信息修改失败')
      }
    },
  },
})
