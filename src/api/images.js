import {get,upload} from '@/utils/request'
//上传
export const uploadImg = (data) =>{
  return upload('/mp/v1_0/user/images',data)
}

//列表
export const imgList = (data) =>{
  return get('/mp/v1_0/user/images',data)
}
