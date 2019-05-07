export default {
  queryRouteList: '/routes',

  queryUserInfo: '/api/v1/user',
  logoutUser: '/api/v1/user/logout',
  loginUser: 'POST /user/login',
  sendMsg: 'POST /user/sendCode',
  verifyCode: 'POST /user/verifyCode',
  register: 'POST /user/register',
  resetPwd: 'POST /user/updatePwd',

  // goods
  addGoods: 'POST /goods/addGoods',
  queryGoods: '/goods/queryGoods',

  queryGoodsDetail: '/goods/queryGoodsDetial',

  // cart
  addCart: 'POST /cart/add',

  // collect
  addCollect: 'POST /collect/add',
  queryIsCollect: 'POST /collect/queryIsCollect',
  cancelCollect: 'POST /collect/cancel',

  // order
  addOrder: 'POST /order/add',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',
}
