const cookieName = {
  uid: 'user_id',
  token: 'token',
}

const HOSTS = () => {
  return 'http://132.232.87.186/api'
}

const API_HOST = HOSTS()


const API_PATH = `${API_HOST}/pdf_api/app`

module.exports = {
  cookieName,
  API_PATH,
  HOSTS,
}
