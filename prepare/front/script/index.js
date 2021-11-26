import axios from 'axios';
const BASE_URL = 'http://localhost:8000/';
const $ = (selecter) => document.querySelector(selecter);
$('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name').value;
    const temperature = $('#temperature').value;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('temperature', temperature);
    if (name && temperature) {
        const result = axios
            .post(`${BASE_URL}`, formData)
            .then((res) => {
            console.log(res);
            return res;
        })
            .catch((err) => {
            console.error(err);
        });
    }
});
