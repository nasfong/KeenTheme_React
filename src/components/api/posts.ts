import axios from 'axios';
export function getPosts() {
  return axios 
    .get('/posts', { params: { _sort: 'title' } })
    .then(res => res.data)
}