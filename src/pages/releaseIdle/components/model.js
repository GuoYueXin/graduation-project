import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Input, Button, Upload, Icon, Modal } from 'antd'
import styles from './model.less'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

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
    const { form, onHandleConfirm } = this.props
    const { validateFieldsAndScroll, resetFields } = form
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        onHandleConfirm(values)
        resetFields()
        this.setState({
          fileList: [],
        })
      }
    })
  }

  render() {
    const { form } = this.props
    const { previewVisible, previewImage, fileList, priceValue } = this.state
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
        <FormItem label="商品名称">
          {getFieldDecorator('goodsName', {
            rules: [
              {
                required: true,
                message: '请输入商品名称',
              },
            ],
          })(<Input placeholder="请输入商品名称" />)}
        </FormItem>
        <FormItem label="商品类别">
          {getFieldDecorator('goodsType', {
            rules: [
              {
                required: true,
                message: '请选择商品类别',
              },
            ],
          })(
            <Select placeholder="请选择商品类别">
              <Option value={1}>学习用品</Option>
              <Option value={2}>生活用品</Option>
              <Option value={3}>娱乐用品</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="商品价格">
          {getFieldDecorator('goodsPrice', {
            rules: [
              {
                required: true,
                message: '请输入商品价格',
              },
            ],
          })(<Input placeholder="请输入商品价格" />)}
        </FormItem>
        <FormItem label="商品库存">
          {getFieldDecorator('goodsNum', {
            rules: [
              {
                required: true,
                message: '请输入商品库存',
              },
            ],
          })(<Input placeholder="请输入商品库存" />)}
        </FormItem>
        <FormItem label="商品图片">
          {getFieldDecorator('goodsPic', {
            rules: [
              {
                required: true,
                message: '请上传商品图片',
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
                {fileList.length >= 6 ? null : uploadButton}
              </Upload>
              <div>仅支持jpg、jpeg、png格式，大小限5MB，最多6张图</div>
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
        <FormItem label="商品描述">
          {getFieldDecorator('goodsDesc', {
            rules: [
              {
                required: true,
                message: '请输入商品描述',
              },
            ],
          })(
            <TextArea
              placeholder="请输入商品描述"
              autosize={{ minRows: 4, maxRows: 6 }}
            />
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
            发布
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
