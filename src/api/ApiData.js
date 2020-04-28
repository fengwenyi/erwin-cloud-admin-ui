import request from '@/libs/request'

// 登录
export const login = (username, password) => {
  const data = {
    username,
    password
  }
  return request({
    url: '/api-index/auth/login',
    method: 'post',
    data: data
  })
}

// 退出登录
export const logout = () => {
  const data = {}
  return request({
    url: '/api-user/auth/logout',
    method: 'get',
    data: data
  })
}

//----- 角色 ---------------------------------------------------------------

// 添加角色
export const apiRoleAdd = (data) => {
  return request({
    url: '/api-admin/role',
    method: 'post',
    data: data
  })
}

// 角色列表
export const apiRoleGet = (data) => {
  return request({
    url: '/api-admin/role',
    method: 'get',
    data: {},
    params: data
  })
}

// 角色 修改发布状态
export const apiRoleUpdateRelease = (id, data) => {
  return request({
    url: '/api-admin/role/' + id + '/release',
    method: 'put',
    data: {},
    params: data
  })
}

// 角色 修改
export const apiRoleUpdate = (id, data) => {
  return request({
    url: '/api-admin/role/' + id,
    method: 'patch',
    data: data
  })
}

// 角色 逻辑删除
export const apiRoleDelete = (id) => {
  return request({
    url: '/api-admin/role/' + id,
    method: 'delete',
    data: {}
  })
}

//----- 用户 ---------------------------------------------------------------

// 用户列表
export const apiUserGet = (data) => {
  return request({
    url: '/api-admin/user',
    method: 'get',
    data: {},
    params: data
  })
}

// 用户 修改发布状态
export const apiUserUpdateReleaseStatus = (id, data) => {
  return request({
    url: '/api-admin/user/' + id + '/release',
    method: 'put',
    data: {},
    params: data
  })
}

// 用户 修改锁定状态
export const apiUserUpdateLockStatus = (id, data) => {
  return request({
    url: '/api-admin/user/' + id + '/lock',
    method: 'put',
    data: {},
    params: data
  })
}

// 用户 修改
export const apiUserUpdate = (id, data) => {
  return request({
    url: '/api-admin/user/' + id,
    method: 'patch',
    data: data
  })
}

// 用户 逻辑删除
export const apiUserDelete = (id) => {
  return request({
    url: '/api-admin/user/' + id,
    method: 'delete',
    data: {}
  })
}

//----- 博客系统 start ---------------------------------------------------------------

// 博客系统：分页查询分类列表
export const apiBlogSystemCategoryGetPageList = (currentPage) => {
  return request({
    url: '/erwin-cloud-blog/api-admin/category/page/' + currentPage,
    method: 'get',
    data: {}
  })
}

// 博客系统：根据ID修改分类
export const apiBlogSystemCategoryUpdateById = (id, data) => {
  return request({
    url: '/erwin-cloud-blog/api-admin/category/' + id,
    method: 'put',
    data: {},
    params: data
  })
}

// 博客系统：添加分类
export const apiBlogSystemCategoryAdd = (data) => {
  return request({
    url: '/erwin-cloud-blog/api-admin/category',
    method: 'post',
    data: data
  })
}


//----- 博客系统 end -----------------------------------------------------------------
