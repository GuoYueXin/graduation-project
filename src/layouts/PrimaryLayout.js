/* global window */
/* global document */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import { MyLayout } from 'components'
import { BackTop, Layout } from 'antd'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { config, pathMatchRegexp, langFromPath, getSession } from 'utils'
import Error from '../pages/404'
import styles from './PrimaryLayout.less'

const { showSilderList } = config
const { Content } = Layout
const { Header, Bread, Sider } = MyLayout

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {
  state = {
    isMobile: false,
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        })
      }
    })
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler)
  }

  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: 'app/handleCollapseChange',
      payload: collapsed,
    })
  }

  render() {
    const { app, location, dispatch, children } = this.props
    const {
      theme,
      routeList,
      collapsed,
      permissions,
      notifications,
      locationPathname,
    } = app
    const user = JSON.parse(getSession('user'))
    const { isMobile } = this.state
    const { onCollapseChange } = this

    const isShowSilder = showSilderList.includes(locationPathname.split('/')[2])

    const lang = langFromPath(location.pathname)
    const newRouteList =
      lang !== 'en'
        ? routeList.map(item => {
            const { name, ...other } = item
            return {
              ...other,
              name: (item[lang] || {}).name || name,
            }
          })
        : routeList

    // Find a route that matches the pathname.
    const currentRoute = newRouteList.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )

    // Query whether you have permission to enter this page
    const hasPermission = currentRoute
      ? permissions.visit.includes(currentRoute.id)
      : false
    // const hasPermission = true;

    // MenuParentId is equal to -1 is not a available menu.
    const menus = newRouteList.filter(_ => _.menuParentId !== '-1')

    const headerProps = {
      menus,
      collapsed,
      notifications,
      onCollapseChange,
      avatar: user.userIcon,
      username: user.username,
      fixed: config.fixedHeader,
      onAllNotificationsRead() {
        dispatch({ type: 'app/allNotificationsRead' })
      },
      onSignOut() {
        dispatch({ type: 'app/signOut' })
      },
    }

    const siderProps = {
      theme,
      menus,
      isMobile,
      collapsed,
      onCollapseChange,
      onThemeChange(theme) {
        dispatch({
          type: 'app/handleThemeChange',
          payload: theme,
        })
      },
    }

    return (
      <Fragment>
        <Layout>
          <div
            className={styles.container}
            style={{ paddingTop: config.fixedHeader ? 72 : 0 }}
            id="primaryLayout"
          >
            <Header {...headerProps} />
            <Layout>
              {isShowSilder && <Sider {...siderProps} />}
              <Content
                className={styles.content}
                style={
                  isShowSilder ? { marginLeft: 256 } : { margin: '0 150px' }
                }
              >
                {isShowSilder && <Bread routeList={newRouteList} />}
                {hasPermission ? children : <Error />}
              </Content>
            </Layout>
            <BackTop
              className={styles.backTop}
              target={() => document.querySelector('#primaryLayout')}
            />
          </div>
        </Layout>
      </Fragment>
    )
  }
}

PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default PrimaryLayout
