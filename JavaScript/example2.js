import { go, pipe, map, filter, reduce, curry } from "./fn.js";

const log = console.log;

const products = [
  { name: "반팔티", price: 15000, quantity: 1, is_selected: true },
  { name: "긴팔티", price: 20000, quantity: 2, is_selected: false },
  { name: "핸드폰케이스", price: 15000, quantity: 3, is_selected: false },
  { name: "후드티", price: 30000, quantity: 4, is_selected: true },
  { name: "바지", price: 25000, quantity: 5, is_selected: true },
];

const add = (a, b) => a + b;

const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

// 총 수량
const total_quantity = sum((p) => p.quantity);

// 총 비용
const total_price = sum((p) => p.price * p.quantity);

document.querySelector(".cart").innerHTML = `
  <table>
    <tr>
      <th>T</th>
      <th>상품 이름</th>
      <th>가격</th>
      <th>수량</th>
      <th>총 가격</th>
    </tr>
    <tr>
      ${go(
        products,
        sum(
          (p) => `
            <tr>
              <td><input type="checkbox" ${p.is_selected ? "checked" : ""}></td>
              <td>${p.name}</td>
              <td>${p.price}</td>
              <td><input type="number" value="${p.quantity}"</td>
              <td>${p.price * p.quantity}</td>
            </tr>`
        )
      )}
    </tr>
    <tr>
      <td colspan="3">합계</td>
      <td>${total_quantity(filter((p) => p.is_selected, products))}</td>
      <td>${total_price(filter((p) => p.is_selected, products))}</td>
      <td></td>
    </tr>
  </table>

`;
