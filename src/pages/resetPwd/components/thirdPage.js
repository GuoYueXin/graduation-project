import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Modal } from 'antd';

const FormItem = Form.Item;
const confirm = Modal.confirm;

@Form.create()
class thirdPage extends Component {
  handleConfirm = () => {
    console.log(11111);
    const { handleReset, form } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      } else {
        const payload = {
          password: values.pwd,
        }
        handleReset(payload);
      }
    })
  }

  handleCheckout = (rules, value, cb) => {
    const { form } = this.props;
    const { getFieldValue	 } = form;
    if (getFieldValue('pwd') === value || value.length < 6 || value.length > 12) {
      cb();
    } else {
      cb('请检查密码输入是否相同！');
    }
  }

  render() {
    const { form, changeStep, password } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const showConfirm = () => {
      confirm({
        title: '您确定要返回上一步吗?',
        content: '返回上一步本次编辑将不会保留！',
        onOk() {
          changeStep({ step: 0 })
        },
        okText: '确定',
        cancelText: '取消',
      });
    }
    return (
      <Form {...formItemLayout}>
        <FormItem label="密码">
          {getFieldDecorator('pwd', {
            initialValue: password,
            rules: [
              {
                required: true,
                message: '请输入您的密码',
              },
              {
                pattern: /^\w{6,12}$/,
                message: '密码格式不正确！',
              }
            ],
          })(<Input placeholder="请输入6-20位数字、大小写英文字母或者下划线" type="password" />)}
        </FormItem>
        <FormItem label="确认密码">
          {getFieldDecorator('confirmPwd', {
            initialValue: password,
            rules: [
              {
                required: true,
                message: '请再次输入您的密码',
              },
              {
                validator: this.handleCheckout,
              }
            ],
          })(<Input placeholder="请再次输入您的密码" type="password" />)}
        </FormItem>
        <div>
          <Button type="primary" style={{ margin: '0 128px' }} onClick={this.handleConfirm}>下一步</Button>
          <Button onClick={showConfirm}>上一步</Button>
        </div>
      </Form>
    );
  }
}

thirdPage.propTypes = {
  form: PropTypes.object,
};

export default thirdPage;
