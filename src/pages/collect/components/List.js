import React, { PureComponent } from 'react'
import { Table, Button } from 'antd'
import Link from 'umi/link'

class List extends PureComponent {
  handleCancelCollect = goodsId => {
    const { onCancelCollect } = this.props
    onCancelCollect(goodsId)
  }

  render() {
    const { data } = this.props
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        align: 'left',
        render: (text, record) => (
          <Link to={`/goodsDetial?id=${record.goodsId}`}>
            `${record.goodsName.slice(0, 20)}...`
          </Link>
        ),
      },
      {
        title: '商品价格',
        dataIndex: 'price',
        align: 'left',
        render: (text, record) => `￥${record.goodsPrice}`,
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (text, record) => (
          <div>
            <Button
              onClick={() => {
                this.handleCancelCollect(record.goodsId)
              }}
            >
              取消收藏
            </Button>
          </div>
        ),
      },
    ]

    const tableProps = {
      columns,
      dataSource: data,
      bordered: true,
      pagination: false,
    }

    return <Table {...tableProps} />
  }
}

export default List
