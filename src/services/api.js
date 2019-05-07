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
  queryByUserId: '/goods/queryByUserId',
  queryGoodsDetail: '/goods/queryGoodsDetial',
  updateStatus: 'POST /goods/updateStatus',
  updateGoodsNum: 'POST /goods/updateGoodsNum',

  // cart
  addCart: 'POST /cart/add',

  // collect
  addCollect: 'POST /collect/add',
  queryIsCollect: 'POST /collect/queryIsCollect',
  cancelCollect: 'POST /collect/cancel',
  queryCollect: '/collect/query',

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
