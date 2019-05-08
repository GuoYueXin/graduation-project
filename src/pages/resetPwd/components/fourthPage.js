import React, { Component } from 'react'
import Link from 'umi/link'
import { Button, Icon } from 'antd'

class fourthPage extends Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 700 }}>
          <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />{' '}
          修改密码成功，您现在可以登录【校园闲鱼】进行交易啦^_^
        </div>
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Link to={'/login'}>
            <Button type="primary" size="large" style={{ width: 150 }}>
              前往登录
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

fourthPage.propTypes = {}

export default fourthPage
