import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/user'

export async function signIn(userData, error) {
  try {
    const data = await axios.post(API_URL + '/login', userData, {
      headers: {
        'Content-Type': '',
      },
    })

    return data.data.user
  } catch (err) {
    error.value = err
  }
}

export async function signUp(userData, error) {
  try {
    const data = await axios.post(API_URL, userData, {
      headers: {
        'Content-Type': '',
      },
    })
    return data.data.user
  } catch (err) {
    error.value = err
  }
}
