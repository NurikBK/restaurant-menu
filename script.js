import { menuArray } from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const menu = document.querySelector('#menu');

document.addEventListener('click', e =>{
  console.log(e.target.dataset.add)
})


function handleAddClick(id) {
  const targetMenuObj = menuArray.filter(item => {
    item.id = id
  })[0]
}

// <div class="menu" id="menu">
//           <div class="menu--item" id="1">
//             <div class="item--emoji">🍕</div>
//             <div class="item--info">
//               <h3 class="name">Pizza</h3>
//               <p class="ingredients">pepperoni,mushrom,mozarella</p>
//               <p class="price">$14</p>
//             </div>
//             <!-- add id from data.js -->
//             <button class="btn btn-add align-left" data-add="id">+</button>
//           </div>
//         </div>
//         <hr />
