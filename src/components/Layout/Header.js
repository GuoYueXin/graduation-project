import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'umi/link'
import { Menu, Layout, Avatar } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { setLocale, getSession } from 'utils'
import classnames from 'classnames'
import router from 'umi/router'
import config from 'config'
import styles from './Header.less'

const { SubMenu } = Menu
const MenuItem = Menu.Item
// const isLogin = getSession('isLogin');

@withI18n()
class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
    e.key === 'userCenter' && router.push('/userCenter')
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
        {getSession('isLogin') === 'yes' && (
          <MenuItem key="publish">
            <Link to="/releaseIdle">发布闲置</Link>
          </MenuItem>
        )}
        {getSession('isLogin') === 'yes' && (
          <MenuItem key="myIdle">
            <Link to="/myGoods">我的闲置</Link>
          </MenuItem>
        )}
        {getSession('isLogin') === 'yes' && (
          <MenuItem key="myStore">
            <Link to="/buyOrder">订单中心</Link>
          </MenuItem>
        )}
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
              <span>
                {username ? username : <Link to="/login">请登录</Link>}
              </span>
              <Avatar
                style={{ marginLeft: 8 }}
                src={`http://127.0.0.1:7777/imgs/${avatar}`}
              />
            </Fragment>
          }
        >
          {username && (
            <Menu.Item key="SignOut">
              <Trans>退出登录</Trans>
            </Menu.Item>
          )}
          {username && <Menu.Item key="userCenter">用户中心</Menu.Item>}
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
        />
      )
    }

    getSession('isLogin') === 'yes' &&
      rightContent.unshift(
        <Menu mode="horizontal">
          <MenuItem key="collect">
            <Link to="/collect">收藏</Link>
          </MenuItem>
          <MenuItem key="buyCart">
            <Link to="/shopCart">购物车</Link>
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
