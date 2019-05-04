import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import Search from './components/search'
import GoodsContent from './components/goodsContent'

@connect(({ loading, home }) => ({ loading, home }))
class index extends PureComponent {
  onChangePage = (page, pageSize) => {
    const { dispatch } = this.props
    dispatch({
      type: 'home/query',
      payload: {
        current: page,
        pageSize,
      },
    })
  }

  onSearch = value => {
    const { dispatch } = this.props
    dispatch({
      type: 'home/query',
      payload: {
        keyWords: value,
      },
    })
  }

  onChangeType = goodsType => {
    const { dispatch } = this.props
    dispatch({
      type: 'home/updateState',
      payload: {
        goodsType,
      },
    })
    dispatch({
      type: 'home/query',
      payload: {
        goodsType,
      },
    })
  }

  render() {
    const { data, pageOption, goodsType } = this.props.home
    const searchProps = {
      goodsType,
      onChangeType: this.onChangeType,
      onSearch: this.onSearch,
    }
    const goodsProps = {
      data,
      pageOption,
      onChangePage: this.onChangePage,
    }
    return (
      <div className={styles.container}>
        <Search {...searchProps} />
        <GoodsContent {...goodsProps} />
      </div>
    )
  }
}

export default index
