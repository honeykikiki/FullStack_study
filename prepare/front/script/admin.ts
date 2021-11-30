import { $ } from './utils/dom.js';
import { BASE_URL } from './utils/api.js';

import { dataInterface } from './types/type';
import axios from 'axios';

const da = axios.get(`${BASE_URL}/admin`);
console.log(da);

// const App = async () => {
//   const render = async () => {
//     const data = await fetch(`${BASE_URL}/admin`)
//       .then((res) => res.json())
//       .catch((error) => console.error(error));

//     $('#root')!.innerHTML = data
//       .map((v: dataInterface, i: number) => {
//         return `
//             <ul data-list-id="${v.id}" data-score="${v.score}" id="list">
//               <li>${i}</li>
//               <li>${v.name}</li>
//               <li class="point">${v.score}</li>
//               <li>
//                 <button class="plus">증가</button>
//                 <button class="minus">차감</button>
//               </li>
//             </ul>
//           `;
//       })
//       .join('');
//   };

//   $('#root')?.addEventListener('click', async (e: Event) => {
//     const target = e.target as HTMLElement;
//     const selected = $('#point') as HTMLSelectElement;
//     const selectedPoint: number = Number(
//       selected.options[selected.selectedIndex].value,
//     );
//     const prevScore: number = Number(target.closest('ul')!.dataset.score);
//     const nameId = target.closest('ul')!.dataset.listId;

//     if (target.classList.contains('plus')) {
//       const score = selectedPoint + prevScore;

//       await fetch(`${BASE_URL}/admin/plus`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ nameId, score }),
//       })
//         .then((res) => {})
//         .catch((err) => console.error(err));
//     }

//     if (target.classList.contains('minus')) {
//       const score = prevScore - selectedPoint;
//       await fetch(`${BASE_URL}/admin/minus`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ nameId, score }),
//       })
//         .then((res) => {})
//         .catch((err) => console.error(err));
//     }
//     render();
//   });

//   $('#rank-draw')?.addEventListener('click', async (e: Event) => {
//     const rank = await fetch(`${BASE_URL}/admin/draw`)
//       .then((res) => {
//         return res.json();
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//     console.log(rank, 'rank');
//     $('#rank')!.innerHTML = rank
//       .map((v: dataInterface, i: number) => {
//         return `<div>${i + 1}등 ${v.name} </div>`;
//       })
//       .join('');
//   });

//   render();
// };

// App();
