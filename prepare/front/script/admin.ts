import { $ } from './utils/dom.js';
import { BASE_URL } from './utils/api.js';

import { dataInterface } from './types/type';

const render = async () => {
  try {
    const data = await fetch(`${BASE_URL}/admin`)
      .then((res) => res.json())
      .catch((error) => console.error(error));
    console.log(data);

    $('#root')!.innerHTML = data
      .map((v: dataInterface, i: number) => {
        return `
            <ul data-name-id="${v.id}" id="list">
              <li>${i}</li>
              <li>${v.name}</li>
              <li>${v.score}</li>
              <li>
                <button id="plus">증가</button>
                <button id="minus">차감</button>
              </li>
            </ul>
          `;
      })
      .join('');
  } catch (error) {
    console.error(error);
  }
};

render();
