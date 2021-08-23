import {post} from '@/utils/request'

export const login = (data) =>{
  return post('/mp/v1_0/authorizations',data)
}
