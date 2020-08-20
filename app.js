// Getting UL
let taskList = document.getElementById("task");

// Function to add tasks
function addTask(e) {
  e.preventDefault();

  // Getting task value from input field
  var task = document.getElementById("item");

  if (task.value === "") {
    task.style.borderColor = "red";
    task.style.color = "red";
    task.value = "Input Field Is Empty";
  } else {
    if (task.value === "Input Field Is Empty") {
    } else {
      task.style.borderColor = "rgba(0,0,0,.125)";
      task.style.color = "#495057";
      // Generating a random Numbers
      let key = (Math.random() * 121212).toFixed();

      let tasks = {
        key: key,
        task: task.value,
      };

      //Adding Data to Firebase Database
      firebase
        .database()
        .ref("task/" + key)
        .set(tasks);

      taskList.innerHTML = "";

      //Calling function to Display Data
      displayData();

      //Reseting Input value
      task.value = "";

      //making undisable to delete all button
      document.getElementById("delall").disabled = false;
    }
  }
}

// Function to getting data from database and display on the screen
function displayData() {
  //Getting data from database
  let taskToAdd = firebase.database().ref("task/");

  //Displaying data on the screen
  taskToAdd.on("child_added", function (data) {
    let tasksValue = data.val();
    taskList.innerHTML += `
   <li class="list-group-item" style="margin-bottom: 5px;">${tasksValue.task}<img class="rounded float-right del" src="images/delete.png" onclick="deleteTask(${tasksValue.key})"></li>
    `;
  });
}

// Function To delete Task
function deleteTask(key) {
  //Getting task to delete
  let taskToDelete = firebase.database().ref("task/" + key);
  taskToDelete.remove();
  //Calling Function To display Updated Data
  taskList.innerHTML = "";
  displayData();
}

// Function to delete all data
function deleteAll() {
  firebase.database().ref("task").remove();

  //Calling Function To display Updated Data
  taskList.innerHTML = "";
  displayData();

  // Making Delete-All Button to disable
  document.getElementById("delall").disabled = true;
}
