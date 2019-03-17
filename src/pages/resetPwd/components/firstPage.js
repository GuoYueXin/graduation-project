import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

@Form.create()
class firstPage extends Component {

  handleConfirm = (num) => {
    const { changeStep, form } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      } else {
        const payload = {
          step: num,
          phoneNumber: values.phoneNumber,
        }
        changeStep(payload);
      }

    })
  }

  render() {
    const { form, phoneNumber } = this.props;
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
      <Form {...formItemLayout}>
        <FormItem label="手机号">
          {getFieldDecorator('phoneNumber', {
            initialValue: phoneNumber,
            rules: [
              {
                required: true,
                message: '请输入手机号'
              },
              {
                pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                message: '请输入正确的手机号'
              }
            ],
          })(<Input placeholder="请输入手机号" />)}
        </FormItem>
        <div>
          <Button type="primary" style={{ margin: '0 130px' }} onClick={() => this.handleConfirm(1)}>下一步</Button>
          <Link to="/login">返回登录页</Link>
        </div>
      </Form>
    );
  }
}

firstPage.propTypes = {
  form: PropTypes.object,
};

export default firstPage;