import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import Search from './components/search'
import GoodsContent from './components/goodsContent'

@connect(({ loading, home }) => ({ loading, home }))
class index extends PureComponent {

  onChangePage = (payload) => {
    const { dispatch } = this.props;
    console.log(payload);
    // dispatch({
    //   type: 'home/query',
    //   payload: {
    //     ...payload
    //   }
    // });
  }

  render() {
    const { msg, data, pageOption } = this.props.home;
    const goodsProps = {
      data,
      pageOption,
      onChangePage: this.onChangePage,
    }
    return (
      <div className={styles.container}>
        <Search />
        <GoodsContent {...goodsProps} />
      </div>
    )
  }
}

export default index
