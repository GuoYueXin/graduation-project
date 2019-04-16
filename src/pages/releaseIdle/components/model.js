import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import { Form, Select, Input, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class model extends Component {

  handleConfirm(num) {
    const { changeStep, form } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      } else {
        const payload = {
          step: num,
          school: values.school,
          username: values.username,
          phoneNumber: values.phoneNumber,
        }
        changeStep(payload);
      }

    })

  }

  render() {
    const { form } = this.props;
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
    return (
      <Form {...formItemLayout} style={{ width: 450, margin: '0 auto' }}>
        <FormItem label="商品名称">
          {getFieldDecorator('goodName', {
            rules: [
              {
                required: true,
                message: '请输入商品名称',
              },
            ],
          })(<Input placeholder="请输入商品名称" />)}
        </FormItem>
        <FormItem label="商品价格">
          {getFieldDecorator('goodPrice', {
            rules: [
              {
                required: true,
                message: '请输入商品价格',
              },
            ],
          })(<Input placeholder="请输入商品价格" />)}
        </FormItem>
        <FormItem label="商品描述">
          {getFieldDecorator('goodDesc', {
            rules: [
              {
                required: true,
                message: '请输入商品描述',
              },
            ],
          })(<Input placeholder="请输入商品描述" />)}
        </FormItem>
        <div>
          <Button type="primary" style={{ width: 200, margin: "0 auto", display: "inherit" }}>发布</Button>
        </div>
      </Form>
    );
  }
}

model.propTypes = {
  form: PropTypes.object,
};

export default model;
