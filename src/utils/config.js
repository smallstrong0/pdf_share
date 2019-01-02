const cookieName = {
  uid: 'user_id',
  token: 'token',
}

const HOSTS = () => {
  return 'https://smallstrong.site/api'
}

const API_HOST = HOSTS()


const API_PATH = `${API_HOST}/pdf_api/app`

module.exports = {
  cookieName,
  API_PATH,
  HOSTS,
}
