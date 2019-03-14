import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form } from 'antd'
import { withI18n } from '@lingui/react'

import styles from './index.less'

@withI18n()
@connect(({ loading, register }) => ({ loading, register }))
class Register extends PureComponent {
  render() {
    const { msg } = this.props.register;
    return (
      <div>
        123{msg}
      </div>
    )
  }
}

Register.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Register
