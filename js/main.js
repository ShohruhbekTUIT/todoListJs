const elForm = document.querySelector(".form");
const elFormInput = document.querySelector(".form__input");
const elList = document.querySelector(".todo-list");

const wrapperBtns = document.querySelector(".all-btns");

const elAllBtn = document.querySelector(".all-btn");
const elComplateBtn = document.querySelector(".complate-btn");
const elUnComplateBtn = document.querySelector(".uncomplate-btn");

const elAllCount = document.querySelector(".all-count");
const elComplateCount = document.querySelector(".complate-count");
const elUnComplateCount = document.querySelector(".uncomplate-count");

const elTemplate = document.querySelector(".todo-template").content;

let localTodos = JSON.parse(window.localStorage.getItem("list"));
const todos = localTodos || [];

renderTodo(todos , elList);

elList.addEventListener("click",evt => {
  if(evt.target.matches(".todo-list__btn")){
    const btnId = evt.target.dataset.todoId;

    const findIndexArr = todos.findIndex(todo => todo.id == btnId);
    todos.splice(findIndexArr , 1);
    renderTodo(todos,elList);
    window.localStorage.setItem("list" , JSON.stringify(todos));
  }else if(evt.target.matches(".todo-list__check")){
    const inputCheckedId = Number(evt.target.dataset.todoId);

    const findElement = todos.find(todo => todo.id === inputCheckedId);
    findElement.isComplated = !findElement.isComplated;
    renderTodo(todos,elList);
    window.localStorage.setItem("list" , JSON.stringify(todos));
  }
})

function renderTodo(arr,element){
  element.innerHTML = "";

  console.log(todos);
  elAllCount.textContent = todos.length;

  elComplateCount.textContent = todos.filter(e => e.isComplated === true).length;

  elUnComplateCount.textContent = todos.filter(e => e.isComplated === false).length;

  let i = 1;
  arr.forEach(todo => {
    // const newItem = document.createElement("li");
    // const newItemDiv = document.createElement("div");
    // const newInput = document.createElement("input");
    // const newBtn = document.createElement("button");
    
    // newBtn.style.backgroundColor = "red";

    // newItem.textContent =String(i++) +" - " + todo.title;
    // newInput.type = "checkbox";
    // newBtn.textContent = "Delete";
    // newBtn.classList.add("todo-list__btn");
    // newBtn.dataset.todoId = todo.id;
    // newInput.dataset.todoId = todo.id;
    // newItemDiv.appendChild(newInput);
    // newItemDiv.appendChild(newBtn);
    // newItem.appendChild(newItemDiv);
    // newInput.classList.add("todo-list__check");

      const clonedTemplate =elTemplate.cloneNode(true);

      clonedTemplate.querySelector(".item-num").textContent = String(i++) +" - ";
      clonedTemplate.querySelector(".item-title").textContent = todo.title;
      clonedTemplate.querySelector(".todo-list__btn").textContent = "Delete";
      clonedTemplate.querySelector(".todo-list__check").dataset.todoId = todo.id;
      clonedTemplate.querySelector(".todo-list__btn").dataset.todoId = todo.id;

    if(todo.isComplated){
      clonedTemplate.querySelector(".todo-list__check").checked = true;
    }
    element.appendChild(clonedTemplate);
  });
}


elForm.addEventListener("submit" , evt =>{
  evt.preventDefault();
  const elInputVal = elFormInput.value.trim();

  if(elInputVal == isNaN(elInputVal)){
    alert("Biror narsa kiriting !");
    return 0;
  }

  const todo = {
    id:todos.length > 0 ? todos[todos.length-1].id + 1 : 1,
    title:elInputVal,
    isComplated:false
  };
  todos.push(todo);
  renderTodo(todos,elList);
  window.localStorage.setItem("list", JSON.stringify(todos));
  elFormInput.value = "";
})


wrapperBtns.addEventListener("click", evt => {

  if(evt.target.matches(".all-btn")){
    renderTodo(todos , elList);
  };

  if(evt.target.matches(".complate-btn")){

    const complateFiltered = todos.filter(e => e.isComplated === true);

    renderTodo(complateFiltered , elList);
  };

  if(evt.target.matches(".uncomplate-btn")){

    const unComplateFiltered = todos.filter(e => e.isComplated === false);

    renderTodo(unComplateFiltered , elList);
  };

})
