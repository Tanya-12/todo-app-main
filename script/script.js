function loadedPage() {
    const newTodo = document.querySelector("input[type='text']");
    const createdTodo = document.querySelector("ul.list-todo");
    let backColor = document.getElementById('back');
    let backImg = document.querySelector(".wrapper");
    let allTasks = [];


    function createTodo() {
        const element = document.createElement('li');
        // const textSpan = document.createElement('span');
        element.classList.add("style-todo");
        element.classList.add("active");
        const createdElement = newTodo.value;
        element.append(createdElement);
        const button = document.createElement('button');
        button.classList.add("style-button");
        // button.src = 'images/icon-cross.svg';
        createdTodo.appendChild(element).append(button);
        newTodo.value = "";
        listenDeleteTodo(button);
        let item = Array.from(document.querySelectorAll('.style-todo'));
        allTasks.push(item[item.length-1])

    }
    newTodo.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            createTodo();
            reminder();
        }
    });
    function listenDeleteTodo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove();
            reminder()
        });
    }

    function onClickTodo(event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("active");
            event.target.classList.toggle("checked");
            reminder()
        }
    }

    function reminder() {
        let resultWrapper = document.querySelector('.remainder-info');
        let tasks = document.querySelectorAll('.style-todo');
        let complitedTask = document.querySelectorAll('.checked');
        let result = `${tasks.length - complitedTask.length} tasks left`;
        resultWrapper.innerHTML = '';
        resultWrapper.insertAdjacentHTML("afterBegin", result);
    }
    document.querySelector('.clear-btn').addEventListener('click', function(e) {
        let complitedTask = document.querySelectorAll('.checked');
        let item = Array.from(document.querySelectorAll('.style-todo'));
        allTasks  = [];
        allTasks.push(item[item.length-1])
        if(complitedTask.length > 0) {
            for(let i = 0; i < complitedTask.length; i++) {
                complitedTask[i].remove();
            };
        };
    });
    function findTasks(settings) {
        console.log(
            'findTasks'
        )
        console.log(settings.taskAraay)
        let tasksArray = settings.taskAraay;
        let triggerClass = settings.triggerClass;
        let result = [];
         tasksArray.forEach( (item,i) => {
            if(item.classList.contains(`${triggerClass}`)) {
                result.push(item)
            }
        })
        return result
    }

    function filtration() {
        let filtersContainer = document.querySelector('.filter-list');
        // let allTasks =  document.querySelectorAll('.style-todo');


        filtersContainer.addEventListener('click', function(e) {
            let tasksWrapper =  document.querySelector('.list-todo');
            let target = e.target;
            let parameterName = target.getAttribute('data-parameter')
            if(parameterName == 'all') {
                tasksWrapper.innerHTML  = '';
                allTasks.forEach((item) => {
                    tasksWrapper.insertAdjacentHTML("beforeend", item.outerHTML);
                })
            }else if(parameterName == 'active'){
                let activeTask = findTasks({
                    taskAraay:allTasks,
                    triggerClass: 'active'
                });
                tasksWrapper.innerHTML  = '';
                activeTask.forEach((item) => {
                    tasksWrapper.insertAdjacentHTML("beforeend",  item.outerHTML);
                })
            }else if(parameterName == 'completed') {
                let checkedTasks = findTasks({
                    taskAraay:allTasks,
                    triggerClass: 'checked'
                });
                tasksWrapper.innerHTML  = '';
                checkedTasks.forEach((item) => {
                    tasksWrapper.insertAdjacentHTML("beforeend",  item.outerHTML);
                })
            }

        })
    }
    filtration(allTasks);


    createdTodo.addEventListener("click", onClickTodo);

    backColor.onclick = function onClickSun() {
           document.body.classList.toggle('white');
           backImg.classList.toggle('wrapper-sun');
           document.getElementById("back").src="images/icon-moon.svg";
    }

}

document.addEventListener("DOMContentLoaded", loadedPage);