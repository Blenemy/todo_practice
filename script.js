'use strict'

const root = document.querySelector('.todoapp');
const newTodo = root.querySelector('.new-todo');
const todoList = root.querySelector('.todo-list');
const toggleAll = root.querySelector('.toggle-all');
const clearCompleted = root.querySelector('.clear-completed');
const filters = root.querySelector('.filters');
const footer = root.querySelector('footer');

function updateInfo() {
  const notCompleted = root.querySelectorAll('.toggle:not(:checked)')
  const todoCount = root.querySelector('.todo-count');
  const allCompleted = root.querySelectorAll('.completed');

  todoCount.innerHTML = `${notCompleted.length} items left`
  toggleAll.checked = notCompleted.length === 0;
  clearCompleted.hidden = allCompleted.length === 0;
  footer.hidden = [...todoList.children].length === 0;
  toggleAll.nextElementSibling.hidden = [...todoList.children].length === 0;
}

newTodo.addEventListener('keydown', e => {
  if (e.key !== 'Enter') {
    return;
  }

  const list = root.querySelector('.todo-list');
  const id = +new Date();

  list.insertAdjacentHTML('beforeend', `
    <li>
      <input id="${id}" class="toggle" type="checkbox">
      <label for="${id}">${newTodo.value}</label>
      <button class="destroy"></button>
    </li>
  `)

  newTodo.value = '';
  updateInfo();
})

todoList.addEventListener('click', e => {
  if (!e.target.classList.contains('destroy')) {
    return;
  }

  e.target.parentNode.remove();
  updateInfo();
})

todoList.addEventListener('change', e => {
  if (!e.target.classList.contains('toggle')) {
    return;
  }

  e.target.parentNode.classList.toggle('completed');
  updateInfo();
})

toggleAll.addEventListener('change', e => {
    const togglers = root.querySelectorAll('.toggle');

    for (const toggle of togglers) {
      toggle.checked = toggleAll.checked;
      toggle.parentNode.classList.toggle('completed', toggleAll.checked);
    };

  updateInfo();
});

clearCompleted.addEventListener('click', e => {
  const allCompleted = root.querySelectorAll('.completed');
  
  for (const input of allCompleted) {
    input.remove();
  }

  updateInfo();
})

filters.addEventListener('click', e => {
  if (!e.target.dataset.filter) {
    return;
  }

  const buttons = root.querySelectorAll('[data-filter]')
  
  for (const button of buttons) {
    button.classList.toggle('selected', e.target === button);
  }

  const togglers = root.querySelectorAll('.toggle');

  for (const toggler of togglers) {
    switch(e.target.dataset.filter) {
      case 'all': toggler.parentNode.hidden = false; 
        break;
    
      case 'active': toggler.parentNode.hidden = toggler.checked; 
        break;
  
      case 'completed': toggler.parentNode.hidden = !toggler.checked; 
        break;
    }
  }
})


