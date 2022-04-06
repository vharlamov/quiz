import axios from 'axios'

export default axios.create({
  baseURL: 'https://quiz-on-react-default-rtdb.firebaseio.com/'
})