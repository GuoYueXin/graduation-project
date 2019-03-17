import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';


class fourthPage extends Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 700 }}>
          <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> 注册成功
        </div>
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Button type="primary" size="large" style={{ width: 150 }} href="/login">前往登录</Button>
        </div>
      </div>
    );
  }
}

fourthPage.propTypes = {
  
};

export default fourthPage;