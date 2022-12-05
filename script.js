import { menuArray } from './data.js';

const orderDetails = document.querySelector('#order-details');
const paymentForm = document.querySelector('#payment-form');
let orderArray = [];

document.addEventListener('click', (e) => {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    removeOrder(e);
  } else if (e.target.dataset.complete) {
    document.querySelector('#module').style.display = 'block';
  } else if (e.target.dataset.pay) {
    document.querySelector('#module').style.display = 'none';
    setTimeout(() => location.reload(), 5000);
  }
});

paymentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const paymentFormData = new FormData(paymentForm);
  const name = paymentFormData.get('name');
  orderDetails.innerHTML = `
    <div class="ready-order">
      <h3> Thanks, ${name}! Your order is on its way!</h3>
    </div>
  `;
});

function handleAddClick(id) {
  const targetMenuObj = menuArray.filter((item) => item.id == id)[0];
  orderArray.push(targetMenuObj);
  orderDetails.style.display = 'block';
  render();
}

function removeOrder(e) {
  const newOrder = orderArray.filter(
    (item) => item.id != e.target.dataset.remove
  );
  console.log(newOrder);
  e.target.parentElement.remove();
  orderArray = newOrder;
  const orders = document.querySelectorAll('.orders');
  if (orders.length === 0) {
    orderDetails.style.display = 'none';
    orderArray = [];
    count = 0;
  }
  render();
}

function getMenuHtml() {
  let menuHtml = '';
  menuArray.forEach((item) => {
    menuHtml += `
    <div class="menu--item" id="${item.id}">
            <div class="item--emoji">${item.emoji}</div>
            <div class="item--info">
              <h3 class="name">${item.name}</h3>
              <p class="ingredients">${item.ingredients}</p>
              <p class="price">$${item.price}</p>
            </div>
            <!-- add id from data.js -->
            <button class="btn btn-add align-left" data-add="${item.id}">+</button>
            </div>
            <hr/>
    `;
  });
  return menuHtml;
}

function showOrderDetails() {
  let orderHtml = ``;
  const newOrderArray = orderArray.filter(
    (item, index) => orderArray.indexOf(item) === index
  );
  newOrderArray.forEach((item) => {
    orderHtml += `
    <div class="orders" >
      <h3 class="order--item">${item.name}</h3>
      <button class="btn btn-remove" data-remove="${item.id}">remove</button>
      <p class="price align-left">$${item.price}</p>
    </div>
    `;
  });
  let totalPrice = newOrderArray.reduce((acc, total) => acc + total.price, 0);
  document.querySelector('#total-price').innerText = `$${totalPrice}`;
  return orderHtml;
}

function render() {
  document.querySelector('#menu').innerHTML = getMenuHtml();
  document.querySelector('#order-list').innerHTML = showOrderDetails();
}

render();
