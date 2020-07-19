//To get Ul 
var tasklists=document.getElementById('task');

//To make disable delete all button
document.getElementById("delall").disabled = true;

//add task function
function addTask(event){
    event.preventDefault();

    //checking for input field is empty or not
    if(document.getElementById('item').value===''){
        alert("Input Field is Empty!");
    }
    else{
        //Create Element
    var li=document.createElement('li');

    //adding class to li
    li.className='list-group-item';

    var textNode=document.createTextNode(document.getElementById('item').value);

    //appending textNode to li
    li.appendChild(textNode);

    //creating delete img
    var image=document.createElement('img');

    //adding class to delete img
    image.className='rounded float-right del';

    //adding image path to tag
    image.src='images/delete.png';

    //adding attribute to delete image
    image.setAttribute('onclick','deleteTask(this)');

    //appending image to li
    li.appendChild(image);

    //applying style to li
    li.style.marginBottom='5px'

    //appending li to ul
    tasklists.appendChild(li);

    //reseting input field
    document.getElementById('item').value='';

    //making undisable to delete all button
    document.getElementById("delall").disabled = false;
    }
}

//function to delete task
function deleteTask(e){

    //geting parent of delete button
    var li=e.parentNode;

    //removing li from ul
    tasklists.removeChild(li);
}

//function to delete all
function deleteAll(){
    tasklists.innerHTML='';
    document.getElementById("delall").disabled = true;
}