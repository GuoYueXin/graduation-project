import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import FormMain from './components/FormMain'

@connect(({ loading, dispatch, userCenter }) => ({
  loading,
  dispatch,
  userCenter,
}))
class MyGoods extends PureComponent {
  onChange = info => {
    const { dispatch } = this.props
    if (info.file.hasOwnProperty('response')) {
      const data = info.file.response
      if (data.code === '200') {
        dispatch({
          type: 'userCenter/updateState',
          payload: {
            userIcon: data.data.filename,
          },
        })
      }
    }
  }

  onSubmit = payload => {
    const { dispatch } = this.props
    const { userIcon, userId } = this.props.userCenter
    dispatch({
      type: 'userCenter/update',
      payload: {
        ...payload,
        userIcon,
        userId,
      },
    })
  }

  render() {
    const {
      username,
      address,
      QQ,
      phoneNumber,
      userIcon,
    } = this.props.userCenter

    const formProps = {
      username,
      address,
      QQ,
      phoneNumber,
      userIcon,
      onChange: this.onChange,
      onSubmit: this.onSubmit,
    }

    return (
      <div className={styles.wrap}>
        <div className={styles.title}>修改用户资料</div>
        <FormMain {...formProps} />
      </div>
    )
  }
}

export default MyGoods
