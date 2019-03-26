import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'umi/link'
import { Card, Row, Col } from 'antd'
import styles from './goodsContent.less'

const { Meta } = Card

class goodsContent extends Component {
  render() {
    return (
      <Row gutter={16} className={styles.wrap}>
        <Link to="/register">
          <Col md={8} lg={6} className={styles.item}>
            <Card
              hoverable
              style={{ width: 220 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
        </Link>
      </Row>
    )
  }
}

goodsContent.propTypes = {}

export default goodsContent
