const inputBox = document.getElementById("input_box");
const listContainer = document.getElementById("list_container");
const errorMessage = document.getElementById("err_msg"); 

function addToDo() {
    const inputValue = inputBox.value.trim();
  
    if (inputValue === "") {
        msgInvalidInput();
    } 
    else if (inputValue.length > 30) {
        msgMaxChars();
    }
    else {
        errorMessage.textContent = ""; 
        const li = document.createElement("li");
        li.innerHTML = inputValue;
        listContainer.appendChild(li);

        createAllBtn(li);
        inputBox.value = "";
    }
  
    saveData();
  }
  
  
function createAllBtn(li){
        let removeBtn = document.createElement("button");
        removeBtn.setAttribute("id","remove_btn");
        removeBtn.setAttribute("class","fa fa-close");
        li.appendChild(removeBtn);

        let upButton = document.createElement("button");
        upButton.setAttribute("id","up_btn");
        upButton.setAttribute("class","fa fa-arrow-up");
        li.appendChild(upButton);

        let downButton = document.createElement("button");
        downButton.setAttribute("id","down_btn");
        downButton.setAttribute("class","fa fa-arrow-down");
        li.appendChild(downButton);

        let editButton = document.createElement("button");
        editButton.setAttribute("id","edit_btn");
        editButton.setAttribute("class","fa fa-edit");
        li.appendChild(editButton);
        
        removeBtn.addEventListener("click", () => removeTask(li));
        upButton.addEventListener("click", () => moveUp(li));
        downButton.addEventListener("click", () => moveDown(li));
        editButton.addEventListener("click", ()=> editTask(li));
}


listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);

function removeTask(item){
    item.remove();
    saveData();
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function clearAll(){
    if (confirm("Are you sure you want to delete all your todo?")) {
        listContainer.innerHTML = "";
        saveData();
    }
    else
        return;
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    let liElements = listContainer.getElementsByTagName("li");
    for (let i = 0; i < liElements.length; i++) {
        let li = liElements[i];
        let upButton = li.querySelector("#up_btn");
        let downButton = li.querySelector("#down_btn");
        let editButton = li.querySelector("#edit_btn");
        let removeBtn = li.querySelector("#remove_btn");

        removeBtn.addEventListener("click", () => removeTask(li));
        upButton.addEventListener("click", () => moveUp(li));
        downButton.addEventListener("click", () => moveDown(li));
        editButton.addEventListener("click", ()=> editTask(li));
    }
}

function moveUp(item) {
    let previousItem = item.previousElementSibling;
    if (previousItem) {
        listContainer.insertBefore(item, previousItem);
        saveData();
    }
}

function moveDown(item) {
    let nextItem = item.nextElementSibling;
    if (nextItem) {
        listContainer.insertBefore(nextItem, item);
        saveData();
    }
}

function editTask(item) {
    const originalValue = item.innerText.trim();
    const newInput = document.createElement("input");
    const todoApp = document.getElementById("todo_app");
    newInput.value = originalValue;
  
    item.innerHTML = "";
    item.appendChild(newInput);
  
    newInput.focus();    
    todoApp.style.pointerEvents = "none";

    let isEditing = true;
  
    newInput.addEventListener("blur", function() {
      if (isEditing) {
        const trimmedValue = newInput.value.trim();
        if (trimmedValue === "") {
            msgInvalidInput();
            newInput.focus();
        } 
        else if (trimmedValue.length > 30) {
            msgMaxChars();
            newInput.focus();
        } 
        else {
            item.innerHTML = trimmedValue;
            createAllBtn(item);
            saveData();
            isEditing = false;
  
            todoApp.style.pointerEvents = "auto";
        }
      }
    });
  }
  
function msgInvalidInput(){
    errorMessage.textContent = "You must write something!";
    errorMessage.style.color = "red";
}

function msgMaxChars(){
    errorMessage.textContent = "You are allowed to write 30 characters maximum";
    errorMessage.style.color = "red";
}

showTask();