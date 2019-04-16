import { router, pathMatchRegexp, setSession } from 'utils'
import api from 'api'

const { loginUser } = api

export default {
  namespace: 'login',

  state: {
    user: {},
  },

  effects: {
    *login({ payload }, { put, call, select }) {
      const data = yield call(loginUser, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.code === '200') {
        setSession('isLogin', 'yes');
        yield put({
          type: 'updateState',
          payload: {
            user: data.data,
          },
        })
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (!pathMatchRegexp('/login', from)) {
          if (from === '/') router.push('/home')
          else router.push(from)
        } else {
          router.push('/home')
        }
      } else {
        throw data
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
