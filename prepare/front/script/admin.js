var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { $ } from './utils/dom.js';
import { BASE_URL } from './utils/api.js';
const render = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetch(`${BASE_URL}/admin`)
            .then((res) => res.json())
            .catch((error) => console.error(error));
        console.log(data);
        $('#root').innerHTML = data
            .map((v, i) => {
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
    }
    catch (error) {
        console.error(error);
    }
});
render();
