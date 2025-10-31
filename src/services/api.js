import axios from 'axios'
const API_URL = 'https://wedev-api.sky.pro/api/kanban/'
// Эта переменная содержит базовый URL для запросов к нашему серверу
async function fetchWords({ token }) {
  try {
    // Здесь начинается попытка сделать запрос
    const data = await axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    })

    return data.data
  } catch (error) {
    throw new Error(error)
  }
}
export const getTasks = async (tasks, error) => {
  try {
    const data = await fetchWords({
      token: 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token,
    })

    if (data) tasks.value = data.tasks
  } catch (err) {
    error.value = err
  }
}
export async function postTask(task, error) {
  try {
    const data = await axios.post(API_URL, task, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token,
        'Content-Type': '',
      },
    })
    return data.data.words
  } catch (err) {
    error.value = err
  }
}

export async function editTask(id, task, error) {
  try {
    const data = await axios.put(API_URL + id, task, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token,
        'Content-Type': '',
      },
    })
    return data.data.words
  } catch (err) {
    error.value = err
  }
}

export async function deleteTask(id, error) {
  try {
    const data = await axios.delete(API_URL + id, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token,
        'Content-Type': '',
      },
    })

    return data.data.words
  } catch (err) {
    error.value = err
  }
}
