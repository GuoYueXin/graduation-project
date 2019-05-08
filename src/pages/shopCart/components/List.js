import React, { PureComponent } from 'react'
import { Table, Button, Modal } from 'antd'
import Link from 'umi/link'

const confirm = Modal.confirm

class List extends PureComponent {
  handleShowConfirm = goodsId => {
    const { onDelete } = this.props
    confirm({
      title: '您确定删除吗?',
      content: '删除后该商品将不再展示在您的购物车中',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        onDelete(goodsId)
      },
      onCancel() {},
    })
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
        title: '操作',
        dataIndex: 'operate',
        render: (text, record) => (
          <div>
            {record.goodsStatus === 1 && (
              <Button
                style={{ marginRight: 8 }}
                onClick={() => {
                  onShow(record)
                }}
              >
                下单
              </Button>
            )}
            <Button
              onClick={() => {
                this.handleShowConfirm(record.goodsId)
              }}
            >
              删除
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
