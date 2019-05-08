import React, { PureComponent } from 'react'
import { Table, Button, Badge, Modal } from 'antd'
import Link from 'umi/link'

const confirm = Modal.confirm

class List extends PureComponent {
  handleChangeStatus = orderId => {
    const { onChangeStatus } = this.props
    confirm({
      title: '确定完成交易吗?',
      content: '确定后代表您已经认同交易完成，此操作将无法撤销！',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        onChangeStatus(orderId)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  handleDelete = orderId => {
    const { onDeleteOrder } = this.props
    confirm({
      title: '确定删除该订单吗?',
      content: '删除后将无法恢复！',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        onDeleteOrder(orderId)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  render() {
    const { data } = this.props
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'orderNum',
        align: 'left',
        render: (text, record) => `NO.${record.orderId}`,
      },
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
        title: '商品数量',
        dataIndex: 'num',
        render: (text, record) => record.num,
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        align: 'left',
        render: (text, record) => (
          <div>
            {record.buyStatus === 1 && record.sellStatus === 1 && (
              <span>
                <Badge status="success" />
                已完成
              </span>
            )}
            {(record.buyStatus === 0 || record.sellStatus === 0) && (
              <span>
                <Badge status="warning" />
                进行中
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
            {record.buyStatus === 0 && (
              <Button
                style={{ marginRight: 8 }}
                onClick={() => {
                  this.handleChangeStatus(record.orderId)
                }}
              >
                确认收货
              </Button>
            )}
            {record.buyStatus === 1 && record.sellStatus === 0 && (
              <Button style={{ marginRight: 8 }} disabled>
                等待卖家确认
              </Button>
            )}
            {record.buyStatus === 1 && record.sellStatus === 1 && (
              <Button
                onClick={() => {
                  this.handleDelete(record.orderId)
                }}
              >
                删除
              </Button>
            )}
          </div>
        ),
      },
    ]

    const tableProps = {
      columns,
      dataSource: data,
      bordered: true,
      pagination: false,
      expandedRowRender: record => (
        <div
          style={{
            height: 40,
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <div style={{ display: 'flex' }}>
            商品价格：￥ {record.goodsPrice}
          </div>
          <div style={{ display: 'flex' }}>
            订单总计：￥ {record.goodsPrice * record.num}
          </div>
          <div style={{ display: 'flex' }}>
            {record.buyStatus === 1 && record.sellStatus === 1
              ? '此订单已完成，如有疑问请联系客服，祝您购物愉快！'
              : '卖家将会及时与您联系，请注意查看,交易完成确认无误后点击确认收货按钮。'}
          </div>
        </div>
      ),
    }

    return <Table {...tableProps} />
  }
}

export default List
