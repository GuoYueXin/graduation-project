import React, { PureComponent } from 'react'
import { Tabs } from 'antd'
import styles from './goodDesc.less'

const TabPane = Tabs.TabPane

class index extends PureComponent {
  render() {
    const { good } = this.props
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="商品详情" key="1">
          <div className={styles.desc}>{good.goodsDesc}</div>
        </TabPane>
        <TabPane tab="留言" key="2">
          这里是留言区
        </TabPane>
      </Tabs>
    )
  }
}

export default index
