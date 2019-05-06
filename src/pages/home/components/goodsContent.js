import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'umi/link'
import { Card, Row, Col, Pagination } from 'antd'
import styles from './goodsContent.less'

const { Meta } = Card

class goodsContent extends Component {
  render() {
    const { data, pageOption, onChangePage } = this.props
    const pageProps = {
      ...pageOption,
      onChange: onChangePage,
    }
    const renderContent = data.map(ele => {
      return (
        <Link to={`/goodsDetial?id=${ele.goodsId}`}>
          <Col md={8} xxl={6} className={styles.item}>
            <Card
              hoverable
              style={{ width: 220 }}
              cover={
                <img
                  alt={ele.goodsName}
                  src={`http://127.0.0.1:7777/imgs/${
                    ele.goodsPic.split('|')[0]
                  }`}
                  style={{ width: '100%', height: 240 }}
                />
              }
            >
              <Meta
                title={ele.goodsName}
                description={`${ele.goodsDesc.slice(0, 10)}...`}
              />
            </Card>
          </Col>
        </Link>
      )
    })
    return (
      <div>
        <Row gutter={16} className={styles.wrap}>
          {renderContent}
        </Row>
        <Pagination
          {...pageProps}
          style={{ float: 'right', marginBottom: 30 }}
        />
      </div>
    )
  }
}

goodsContent.propTypes = {}

export default goodsContent
