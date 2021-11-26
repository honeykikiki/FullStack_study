import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:8000/';

const $ = (selecter: string): HTMLElement | null =>
  document.querySelector(selecter);

($('#form') as HTMLFormElement).addEventListener('submit', (e: Event) => {
  e.preventDefault();

  const name = ($('#name') as HTMLInputElement).value;
  const temperature = ($('#temperature') as HTMLInputElement).value;

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
