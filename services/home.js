import { http } from '@/utils/http'

export const getAnswerAPI = () => {
  return http({
    method: 'GET',
    url: '/167060050'
  })
}
