import axios from "axios";

const REST_API_URL = 'http://localhost:8080/api/employees'

export const listEmployeesFromApi = () => {
    return axios.get(REST_API_URL)
}