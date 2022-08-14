import axios from "axios"

const baseURL = "/api/persons"

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data)
}

const create = (newEntry) => {
  return axios.post(baseURL, newEntry).then((response) => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((response) => response.data)
}

const update = (id, newEntry) => {
  return axios
    .put(`${baseURL}/${id}`, newEntry)
    .then((response) => response.data)
}

const numbersService = { getAll, create, remove, update }

export default numbersService
