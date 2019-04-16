import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import styles from './index.less'
import Model from  './components/model';


@withI18n()
@connect(({ loading, dispatch, releaseIdle }) => ({ loading, dispatch, releaseIdle }))
class releaseIdle extends PureComponent {

  render() {
    // const { test } = this.props.releaseIdle;
    return (
      <div className={styles.mainWrap}>
        <Model />
      </div>
    )
  }
}

releaseIdle.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default releaseIdle
