import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Input, Button, Upload, Icon, Modal } from 'antd'
import styles from './FormMain.less'

const FormItem = Form.Item

@Form.create()
class model extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    }
  }

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handleChange = info => {
    const { onChange } = this.props
    onChange(info)
    const { fileList } = info
    this.setState({ fileList })
  }

  handleConfirm() {
    const { form, onSubmit } = this.props
    const { validateFieldsAndScroll, resetFields } = form
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        onSubmit(values)
        resetFields()
        this.setState({
          fileList: [],
        })
      }
    })
  }

  render() {
    const { form, username, address, QQ, phoneNumber, userIcon } = this.props
    const { previewVisible, previewImage, fileList } = this.state
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }

    const uploadButton = (
      <div className={styles.uploadWrap}>
        <Icon type="plus" style={{ fontSize: 32, marginTop: 16 }} />
        <div style={{ fontSize: 16 }}>上传图片</div>
      </div>
    )
    return (
      <Form {...formItemLayout} style={{ width: 550, margin: '0 auto' }}>
        <FormItem label="用户名">
          {getFieldDecorator('username', {
            initialValue: username,
            rules: [
              {
                required: true,
                message: '请输入用户名',
              },
            ],
          })(<Input placeholder="请输入用户名" />)}
        </FormItem>
        <FormItem label="手机号">
          {getFieldDecorator('phoneNumber', {
            initialValue: phoneNumber,
          })(<Input disabled={true} />)}
        </FormItem>
        <FormItem label="联系地址">
          {getFieldDecorator('address', {
            initialValue: address,
            rules: [
              {
                required: true,
                message: '请输入联系地址',
              },
            ],
          })(<Input placeholder="请输入联系地址" />)}
        </FormItem>
        <FormItem label="QQ">
          {getFieldDecorator('QQ', {
            initialValue: QQ,
          })(<Input placeholder="请输入QQ" />)}
        </FormItem>
        <FormItem label="用户头像">
          {getFieldDecorator('userIcon', {
            rules: [
              {
                required: !userIcon ? true : false,
                message: '请上传用户头像',
              },
            ],
          })(
            <div>
              <Upload
                action="/uploadFile"
                listType="picture-card"
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                fileList={fileList}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewImage}
                />
              </Modal>
            </div>
          )}
        </FormItem>
        <div>
          <Button
            type="primary"
            style={{ width: 200, margin: '0 auto', display: 'inherit' }}
            onClick={() => {
              this.handleConfirm()
            }}
          >
            修改
          </Button>
        </div>
      </Form>
    )
  }
}

model.propTypes = {
  form: PropTypes.object,
}

export default model
