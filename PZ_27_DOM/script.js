"use strict";
// ПЗ 27. Допишите код, используя DOM API.
// 1. Найдите #page-title, #task-form, #task-input, #task-list, #stats, #error.
// 2. Измените заголовок через textContent; назначьте data-id исходным карточкам.
// 3. Реализуйте updateStats() для общего числа, выполненных и оставшихся.
// 4. Реализуйте createTask(text): createElement, textContent и append.
// 5. Обработайте submit формы и проверку trim().
// 6. Делегируйте click от #task-list: toggle / up / remove.
// 7. Вызовите updateStats() после любых изменений.
console.log("ПЗ 27: стартовый проект подключён");

const title = document.querySelector("#page-title");
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const stats = document.querySelector("#stats");
const error = document.querySelector("#error");

console.log("Исходных задач:", document.querySelectorAll(".task").length);

title.textContent = "Мой список задач";

let nextId = 1;
const cards = document.querySelectorAll(".task");
cards.forEach((card) => {
  card.setAttribute("data-id", nextId);
  nextId++;
});


function updateStats() {
  const all = list.querySelectorAll(".task").length;
  const done = list.querySelectorAll(".task.done").length;
  stats.textContent = `Всего: ${all} · Выполнено: ${done} · Осталось: ${all - done}`;
}

function createTask(text) {
  const item = document.createElement("li");
  item.className = "task";
  item.setAttribute("data-id", nextId);
  nextId++;

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  const actions = document.createElement("div");
  actions.className = "actions";

  const btnDone = document.createElement("button");
  btnDone.type = "button";
  btnDone.textContent = "Готово";
  btnDone.setAttribute("data-action", "toggle");

  const btnUp = document.createElement("button");
  btnUp.type = "button";
  btnUp.textContent = "Наверх";
  btnUp.setAttribute("data-action", "up");

  const btnDel = document.createElement("button");
  btnDel.type = "button";
  btnDel.textContent = "Удалить";
  btnDel.setAttribute("data-action", "remove");

  actions.append(btnDone, btnUp, btnDel);
  item.append(span, actions);
  list.append(item);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") {
    error.textContent = "Напишите текст задачи, пустую добавить нельзя";
    return;
  }
  error.textContent = "";
  createTask(text);
  input.value = "";
  updateStats();
});

list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const task = button.closest(".task");
  if (!task) return;

  if (button.closest('[data-action="toggle"]')) {
    task.classList.toggle("done");
  }
  if (button.closest('[data-action="up"]')) {
      list.prepend(task);
  }
  if (button.closest('[data-action="remove"]')) {
    task.remove();
  }
  updateStats();
});

updateStats();
