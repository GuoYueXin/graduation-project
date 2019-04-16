import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'umi/link'
import { Menu, Icon, Layout, Avatar, Popover, Badge, List } from 'antd'
import { Ellipsis } from 'ant-design-pro'
import { Trans, withI18n } from '@lingui/react'
import { setLocale } from 'utils'
import moment from 'moment'
import classnames from 'classnames'
import config from 'config'
import styles from './Header.less'

const { SubMenu } = Menu
const MenuItem = Menu.Item

@withI18n()
class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
  }
  render() {
    const {
      i18n,
      fixed,
      avatar,
      username,
      // notifications,
      // onAllNotificationsRead,
    } = this.props

    const leftContent = [
      <Menu mode="horizontal">
        <MenuItem key="home">
          <Link to="/home">首页</Link>
        </MenuItem>
        <MenuItem key="publish">
          <Link to="/releaseIdle">发布闲置</Link>
        </MenuItem>
        <MenuItem key="myIdle">
          <Link to="#">我的闲置</Link>
        </MenuItem>
        <MenuItem key="myStore">
          <Link to="#">我的店铺</Link>
        </MenuItem>
      </Menu>,
    ]

    const rightContent = [
      <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
        <SubMenu
          title={
            <Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>
                <Trans>Hi,</Trans>
              </span>
              <span>{username ? username : '请登录'}</span>
              <Avatar style={{ marginLeft: 8 }} src={avatar} />
            </Fragment>
          }
        >
          {username && (
            <Menu.Item key="SignOut">
              <Trans>退出登录</Trans>
            </Menu.Item>
          )}
        </SubMenu>
      </Menu>,
    ]

    if (config.i18n) {
      const { languages } = config.i18n
      const currentLanguage = languages.find(
        item => item.key === i18n._language
      )

      rightContent.unshift(
        <Menu
          key="language"
          selectedKeys={[currentLanguage.key]}
          onClick={data => {
            setLocale(data.key)
          }}
          mode="horizontal"
        >
          <SubMenu title={<Avatar size="small" src={currentLanguage.flag} />}>
            {languages.map(item => (
              <Menu.Item key={item.key}>
                <Avatar
                  size="small"
                  style={{ marginRight: 8 }}
                  src={item.flag}
                />
                {item.title}
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      )
    }

    rightContent.unshift(
      <Menu mode="horizontal">
        <MenuItem key="collect">
          <Link to="#">收藏</Link>
        </MenuItem>
        <MenuItem key="message">
          <Link to="#">消息中心</Link>
        </MenuItem>
        <MenuItem key="buyCart">
          <Link to="#">购物车</Link>
        </MenuItem>
        <MenuItem key="service">
          <Link to="#">联系客服</Link>
        </MenuItem>
      </Menu>
    )

    return (
      <Layout.Header
        className={classnames(styles.header, {
          [styles.fixed]: fixed,
        })}
        id="layoutHeader"
      >
        <div className={styles.logo} />
        <div className={styles.leftContainer}>{leftContent}</div>
        <div className={styles.rightContainer}>{rightContent}</div>
      </Layout.Header>
    )
  }
}

Header.propTypes = {
  fixed: PropTypes.bool,
  user: PropTypes.object,
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  onSignOut: PropTypes.func,
  notifications: PropTypes.array,
  onCollapseChange: PropTypes.func,
  onAllNotificationsRead: PropTypes.func,
}

export default Header
