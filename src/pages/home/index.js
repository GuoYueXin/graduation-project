import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import Search from './components/search'
import GoodsContent from './components/goodsContent'

@connect(({ loading, home }) => ({ loading, home }))
class index extends PureComponent {
  render() {
    const { msg } = this.props.home
    return (
      <div className={styles.container}>
        <Search />
        <GoodsContent />
      </div>
    )
  }
}

export default index
