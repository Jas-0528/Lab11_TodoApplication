const taskData = [
    {
        title: "First task",
        description: "Just an example task. The description contains text.",
        dueDate: "2024-01-01",
        completed: false
    },
    {
        title: "Task (overdue)",
        description: "This task is overdue (due in the past)",
        dueDate: "2023-11-10",
        completed: false
    },
    {
        title: "Another task (completed)",
        description: "This task has the property completed: true",
        dueDate: "2023-10-10",
        completed: true
    },
    {
        title: "Another completed task",
        description: "This task is completed but the due date was before the other one",
        dueDate: "2023-06-01",
        completed: true
    }
]

document.addEventListener('DOMContentLoaded', function () {

    let add_task = document.getElementById("add_task");
    let new_task = document.getElementById("modal_form");
    let close_modal = document.getElementById("close_modal");
    const list_container = document.getElementById("task_list")
    const new_title = document.getElementById("new_task_title");
    const new_desc = document.getElementById("new_task_description");
    const new_date = document.getElementById("new_task_due_date");
    const save_task = document.getElementById("save_task");
    let total_tasks = document.getElementById("count");


    add_task.addEventListener("click", show_addtask);
    close_modal.addEventListener("click", close_addtask);
    document.getElementById("modal_form").addEventListener("click", (event) => {
        if (event.target.id === "modal_form") {
            close_addtask()
        }
    });
    window.addEventListener("load", print_tasks)
    save_task.addEventListener("click", add_newtasks)


    function add_newtasks() {
        if (new_title.value === "" || new_desc.value === "" || new_date.value === "") {
            alert("all fields must be filled to add task");
        }

        else {
            let one_task = {};
            one_task.title = new_title.value;
            one_task.description = new_desc.value;
            one_task.dueDate = new_date.value;
            one_task.completed = false;
            let index = (taskData.length);
            taskData[index] = one_task;

            print_tasks()

            }

            close_addtask()
        }
    

    function show_addtask() {
        new_task = document.getElementById("modal_form").style.display = "block";
    }

    function close_addtask() {
        new_task = document.getElementById("modal_form").style.display = "none";
        new_title.value = ""
        new_desc.value = ""
        new_date.value = ""
    }

    function print_tasks() {
        let parent = document.querySelector("ul");
        let child = parent.lastElementChild;
        while(child){
            parent.removeChild(child);
            child = parent.lastElementChild;
        }

        for (element in taskData) {
            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("class", "checks");
            let li = document.createElement("li");
            let label = document.createElement("label");
            let p = document.createElement("p");
            let p2 = document.createElement("p");
            let p3 = document.createElement("p");
            p3.setAttribute("class", "task_actions");
            let button = document.createElement("button");
            button.setAttribute("class", "edit_task");
            let button2 = document.createElement("button");
            button2.setAttribute("class", "delete_task");
            list_container.appendChild(li);
            li.appendChild(checkbox);
            li.appendChild(label);
            label.innerHTML = taskData[element]["title"];
            li.appendChild(p);
            p.innerHTML = taskData[element]["description"];
            li.appendChild(p2);
            p2.innerHTML = "Due: " + taskData[element]["dueDate"];
            li.appendChild(p3);
            p3.appendChild(button);
            p3.appendChild(button2);
            button.innerHTML = "Edit";
            button2.innerHTML = "Delete";

            button2.onclick = () => {
                p3.parentNode.remove();
            }

            const edit_buttons = document.querySelectorAll(".edit_task");
            edit_buttons.forEach((editbtn, count) => {
                editbtn.onclick = (e) => {
                    show_addtask();
                    document.getElementById("new_task_title").value = taskData[count]["title"];
                    document.getElementById("new_task_description").value = taskData[count]["description"];
                    document.getElementById("new_task_due_date").value = taskData[count]["dueDate"];

                }

            })


        }
        let count = 0;
        document.querySelectorAll(".checks").forEach(function (item) {
            if (taskData[count]["completed"] == true) {
                (item).checked = true;
            }
            count = count + 1;
        });

    for (element in taskData) {
        console.log(element + ":" + taskData[element]["title"], taskData[element]["description"], taskData[element]["dueDate"])
        total_tasks.innerHTML = taskData.length;
    }
    }
});
