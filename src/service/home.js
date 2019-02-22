import request from '../utils/request'
import { API_PATH } from '../utils/config'

/**
 * list
 */
export async function list(params) {
    return request({
        url: `${API_PATH}/search/list`,
        method: 'get',
        sig: true,
        params,
    })
}

/**
 * recommend
 */
export async function recommend(params) {
    return request({
        url: `${API_PATH}/recommend/info`,
        method: 'get',
        sig: true,
        params,
    })
}

