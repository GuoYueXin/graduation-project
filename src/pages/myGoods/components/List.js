import React, { PureComponent } from 'react'
import { Table, Button, Badge } from 'antd'
import Link from 'umi/link'

class List extends PureComponent {
  handleChangeStatus = (goodsIs, status) => {
    const { onChangeGoodsStatus } = this.props
    onChangeGoodsStatus(goodsIs, status)
  }

  render() {
    const { data, onShow } = this.props
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
        title: '商品库存',
        dataIndex: 'num',
        render: (text, record) => record.goodsNum,
      },
      {
        title: '商品状态',
        dataIndex: 'status',
        align: 'left',
        render: (text, record) => (
          <div>
            {record.goodsStatus === 0 && (
              <span>
                <Badge status="error" />
                已下架
              </span>
            )}
            {record.goodsStatus === 1 && (
              <span>
                <Badge status="success" />
                出售中
              </span>
            )}
            {record.goodsStatus === 2 && (
              <span>
                <Badge status="warning" />
                已售罄
              </span>
            )}
          </div>
        ),
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (text, record) => (
          <div>
            {record.goodsStatus === 0 && (
              <Button
                style={{ marginRight: 8 }}
                onClick={() => {
                  this.handleChangeStatus(record.goodsId, 1)
                }}
              >
                上架
              </Button>
            )}
            {record.goodsStatus === 1 && (
              <Button
                style={{ marginRight: 8 }}
                onClick={() => {
                  this.handleChangeStatus(record.goodsId, 0)
                }}
              >
                下架
              </Button>
            )}
            <Button
              onClick={() => {
                onShow(record)
              }}
            >
              补货
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
