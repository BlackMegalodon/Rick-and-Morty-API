import axios from "axios";

const Axios = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/character',
})

export default Axios;