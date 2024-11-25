/**
 * @author Valeria Molina Recinos
 */

import axios from 'axios'
import config from '@/config'

const SERVER = config.SERVER

export async function submitDupe(firstPolishId, secondPolishId) {
  try {
    const dupeRequest = axios.create({
      baseURL: SERVER,
      method: 'post',
      withCredentials: true
    })
    const response = await dupeRequest.post(`/submit/dupe`, {
      polishId: firstPolishId,
      dupeId: secondPolishId
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getDupeSubmissions() {
  try {
    const getDupes = axios.create({
      baseURL: SERVER,
      method: 'get',
      withCredentials: true
    })
    const response = await getDupes.get('/submissions/dupes')
    return response.data
  } catch (error) {
    throw error
  }
}
