import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input, Button, Modal } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

@Form.create()
class secondPage extends Component {

  handleConfirm = (num) => {
    const { changeStep, form } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      } else {
        const payload = {
          step: num,
          question1: values.question1,
          answer1: values.answer1,
          question2: values.question2,
          answer2: values.answer2
        }
        changeStep(payload);
      }
    })
  }

  render() {
    const { form, question1, question2, answer1, answer2, changeStep } = this.props;
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
    const options = [
      <Option value="0">您的母亲的名字是什么？</Option>,
      <Option value="1">您的父亲的名字是什么？</Option>,
      <Option value="2">您的第一个老师是谁？</Option>,
      <Option value="3">您的第一所学校在哪？</Option>,
      <Option value="4">您的关系最好的发小是谁？</Option>,
    ];
    return (
      <Form {...formItemLayout}>
        <FormItem label="密保问题1">
          {getFieldDecorator('question1', {
            initialValue: question1,
            rules: [
              {
                required: true,
                message: '请选择一个问题',
              },
            ],
          })(<Select placeholder="请选择一个问题">
            {options}
          </Select>)}
        </FormItem>
        <FormItem label="答案">
          {getFieldDecorator('answer1', {
            initialValue: answer1,
            rules: [
              {
                required: true,
                message: '请输入问题1的答案',
              },
            ],
          })(<Input placeholder="请输入问题1的答案" />)}
        </FormItem>
        <FormItem label="密保问题2">
          {getFieldDecorator('question2', {
            initialValue: question2,
            rules: [
              {
                required: true,
                message: '请选择一个问题',
              },
            ],
          })(<Select placeholder="请选择一个问题">
            {options}
          </Select>)}
        </FormItem>
        <FormItem label="答案">
          {getFieldDecorator('answer2', {
            initialValue: answer2,
            rules: [
              {
                required: true,
                message: '请输入问题2的答案',
              },
            ],
          })(<Input placeholder="请输入问题2的答案" />)}
        </FormItem>
        <div>
          <Button type="primary" style={{ margin: '0 128px' }} onClick={() => this.handleConfirm(2)}>下一步</Button>
          <Button onClick={showConfirm}>上一步</Button>
        </div>
      </Form>
    );
  }
}

secondPage.propTypes = {
  form: PropTypes.object,
};

export default secondPage;