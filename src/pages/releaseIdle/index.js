import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import styles from './index.less'
import Model from './components/model'

@withI18n()
@connect(({ loading, dispatch, releaseIdle }) => ({
  loading,
  dispatch,
  releaseIdle,
}))
class releaseIdle extends PureComponent {
  onChange = info => {
    const { dispatch } = this.props
    const oldPicUrl = this.props.releaseIdle.goodsPic
    if (info.file.hasOwnProperty('response')) {
      const data = info.file.response
      if (data.code === '200') {
        const url = oldPicUrl
          ? `${oldPicUrl}|${data.data.filename}`
          : data.data.filename
        dispatch({
          type: 'releaseIdle/updateState',
          payload: {
            goodsPic: url,
          },
        })
      }
    }
  }

  onHandleConfirm = payload => {
    const { dispatch } = this.props
    const goodsPic = this.props.releaseIdle.goodsPic
    dispatch({
      type: 'releaseIdle/addGoods',
      payload: {
        ...payload,
        goodsPrice: parseFloat(payload.goodsPrice),
        goodsNum: parseInt(payload.goodsNum),
        goodsPic,
      },
    })
  }

  render() {
    // const { test } = this.props.releaseIdle;
    const modelProps = {
      onChange: this.onChange,
      onHandleConfirm: this.onHandleConfirm,
    }
    return (
      <div className={styles.mainWrap}>
        <Model {...modelProps} />
      </div>
    )
  }
}

releaseIdle.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default releaseIdle
