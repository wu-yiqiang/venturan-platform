
import requestes from '@/network/request'
import { AdminItem, AdminSearch } from '@/types/admin'
import { RoleItem, RoleSearch } from '@/types/role'
import { MenuSearch } from '@/types/menu'

// 用户管理
export const getUsersLists = async (data: AdminSearch): Promise<any> => {
  return await requestes.Post(`/admin/page`, data)
}
export const postUser = async (data: AdminItem): Promise<any> => {
  return await requestes.Post(`/admin/create`, data)
}

export const getUserDetail = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Get(`/admin/detail/${id}`)
}

export const updateUserDetail = async (data: AdminItem): Promise<any> => {
  if (!data?.id) return
  return await requestes.Put(`/admin/update`, data)
}
export const updateUserPassword = async (data: AdminItem): Promise<any> => {
  if (!data?.id) return
  return await requestes.Post(`/admin/update/password`, data)
}
export const updateUserAvatar = async (data: AdminItem): Promise<any> => {
  if (!data?.id) return
  return await requestes.Post(`/admin/update_avatar`, data)
}

export const deleteUserItem = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Delete(`/admin/delete/${id}`)
}

// 角色管理
export const getRolesLists = async (data: RoleSearch): Promise<any> => {
  return await requestes.Post(`/role/page`, data)
}

export const postRoleItem = async (data: RoleItem): Promise<any> => {
  return await requestes.Post(`/role/create`, data)
}

export const getRoleOptions = async (): Promise<any> => {
  return await requestes.Get(`/role/lists`)
}

export const getRoleDetails = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Post(`/role/detail/${id}`)
}

export const putRoleItem = async (data: RoleItem): Promise<any> => {
  if (!data?.id) return
  return await requestes.Post(`/role/update`, data)
}

export const deleteRoleItem = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Delete(`/role/delete/${id}`)
}

// 菜单管理
export const getMenuTreeLists = async (): Promise<any> => {
  return await requestes.Get('/menu/treeLists')
}

export const postMenuItem = async (data: any): Promise<any> => {
  return await requestes.Post('/menu/create', data)
}

export const getMenusLists = async (data: MenuSearch): Promise<any> => {
  return await requestes.Post('/menu/page', data)
}

export const deleteMenuItem = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Delete(`/menu/delete/${id}`)
}

export const updateMenuItem = async (data: any): Promise<any> => {
  return await requestes.Post('/menu/update', data)
}

export const getMenuItem = async (id: number): Promise<any> => {
  return await requestes.Get(`/menu/detail/${id}`)
}

// 按钮管理
export const getButtonsLists = async (data: MenuSearch):Promise<any> => {
  return  await requestes.Post('/button/page', data)
}
export const getButtonsOpts = async (): Promise<any> => {
  return await requestes.Post('/button/lists')
}

export const postButtonItem = async (data: any): Promise<any> => {
  return await requestes.Post('/button/create', data)
}

export const deleteButtonItem = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Delete(`/button/delete/${id}`)
}

export const updateButtonItem = async (data: any): Promise<any> => {
  return await requestes.Post(`/button/update`, data)
}

export const getButtonItem = async (id: number): Promise<any> => {
  return await requestes.Post(`/button/detail/${id}`)
}

// 接口管理
export const getIntefacesPage = async (data: MenuSearch): Promise<any> => {
  return await requestes.Post('/inteface/page', data)
}

export const getIntefacesList = async (): Promise<any> => {
  return await requestes.Post('/inteface/lists')
}

export const postIntefaceItem = async (data: any): Promise<any> => {
  return await requestes.Post('/inteface/create', data)
}

export const deleteIntefaceItem = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Delete(`/inteface/delete/${id}`)
}

export const updateIntefaceItem = async (data: any): Promise<any> => {
  return await requestes.Post(`/inteface/update`, data)
}

export const getIntefaceItem = async (id: number): Promise<any> => {
  return await requestes.Get(`/inteface/detail/${id}`)
}


// 字典管理
export const getDictionaryLists = async (data: MenuSearch): Promise<any> => {
  return await requestes.Post('/mapping/page', data)
}

export const postDictionaryItem = async (data: any): Promise<any> => {
  return await requestes.Post('/mapping/create', data)
}

export const deleteDictionaryItem = async (id: number): Promise<any> => {
  if (!id) return
  return await requestes.Delete(`/mapping/delete/${id}`)
}

export const updateDictionaryItem = async (data: any): Promise<any> => {
  return await requestes.Post(`/mapping/update`, data)
}

export const getDictionaryItem = async (id: number): Promise<any> => {
  return await requestes.Get(`/mapping/details/${id}`)
}

export const getDictionaryItemByType = async (type: string): Promise<any> => {
  return await requestes.Post(`/mapping/types`, { mappingType: type })
}