window.onload = () =>{

    const username = sessionStorage.getItem('userResult');
    console.log(`Paimta is sql: ${username}`);
    const resultObject = JSON.parse(username);
    const userName = resultObject.userName;
    const userId = resultObject.id;

    console.log(`Prisijungta kaip: ${userName}`);
        
            const header = document.querySelector('#greet');
            header.innerHTML =
            `<div id="greetings" style="position: absolute; right: 0;" > 
                <p style="text-align: center;">Ačiū, kad prisijungėte ${userName}!</p>
            </div>
        
        <style>
            #greetings {
                
                border: 2px solid rgb(15, 15, 15);
                padding: 5px auto;
                margin: 10px auto;
                max-width: 250px;
                background-color: #c5c0b3; 
            }
        </style>`;
            
                downloadToDoList(userId);
                editToDo(userId);
                deleteToDo();
                toDoAdd();


function toDoAdd(){
const task = document.getElementById('todo-add');
const taskAddButton = document.getElementById('task-sub');

if(task){
    taskAddButton.addEventListener('click', function (event) {
                    event.preventDefault();
task.innerHTML=`
<form id="todoForm">
    <div style="text-align: center;">
    <h4>Add your task</h4>    
        <label for="type">Type:</label>
        <input type="text" id="type" name="type" required>    
    <br>
        <label for="content">Content:</label>
        <input type="text" id="content" name="content" required>
    <br>
        <label for="endDate">End Date:</label>
        <br>
        <input type="date" id="endDate" name="endDate" required>
      <br>  
        <button type="submit" id="task-submit">Add Task</button>
        <button type="submit" id="add-close">Close</button> 
    </div>
</form>
<style>
    #todoForm{
        text-align: center;
        border: 2px solid rgb(15, 15, 15);
        padding: 10px;
        margin: 20px auto;
        max-width: 250px;
        background-color: #f5e2c0; 
    }        
</style>`;


document.getElementById('add-close').addEventListener('click', function (event) {
    event.preventDefault();
    location.reload();
});


const tasksubmit = document.getElementById('task-submit');
tasksubmit.addEventListener('click', function (event) {
    event.preventDefault();
                    const toDoType = document.getElementById('type');
                    const toDoContent = document.getElementById('content');
                    const toDoDate = document.getElementById('endDate');

                    const toDoTypeInput = toDoType.value;
                    const toDoContentInput = toDoContent.value;
                    const toDoDateInput = toDoDate.value;

                    if (!toDoTypeInput || !toDoContentInput || !toDoDateInput) {
                        console.log('Užpildykite visas įvestis.');
                        alert('Užpildykite visas įvestis.');
                        return;
                    }
                    const postToUpdate = {
                        userId: userId,
                        type: toDoTypeInput,
                        content: toDoContentInput,
                        endDate: toDoDateInput,
                    };

                    fetch('https://localhost:7171/api/ToDo/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(postToUpdate),
                        })
                        .then(response => response.json())
                        .then(result => {
                            console.log('Post was updated successfully');
                            location.reload();
                        })
                        .catch(error => {
                            console.log('Error updating post:', error);
                        });
                });
            });
};
};
function downloadToDoList(userId){
            fetch(`https://localhost:7171/api/ToDo`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    }                    
                })
                .then(response => response.json())
                .then(result => {
                    const todoList = document.getElementById('todo-existing');                   
            
                    for (let i = 0; i < result.length; i++) {
                        const currentItem = result[i]; 
                        console.log(`istraukiama ${result}`) ;

                       if(currentItem.userId === userId){
                        todoList.innerHTML += `
                        <div id="tasks-do">                       
                            <p id="tasks" style="position:  left: 10;"">Nr: ${currentItem.id}</p>
                             <ul>Veiksmo paskirtis:  ${currentItem.type}</ul>
                                <ul>Reikia:  ${currentItem.content}</ul>
                                <ul>Data:  ${currentItem.endDate}</ul>                               
                            
                        </div>     
                            <style>
                            #tasks{                                
                                border: 2px solid rgb(15, 15, 15);
                                padding: 5px;
                                margin: 18px auto;
                                max-width: 60px;
                                background-color: #9282b1; 
                            }     
                            #tasks-do{                                    
                                text-align: left;
                            }           
                            </style>`;
                       }
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            };
          

function editToDo(userId){

    const toDoEditInput = document.getElementById('todo-edit');
    const taskEditButton = document.getElementById('task-edit');
  
    taskEditButton.addEventListener('click', function (event) {
      event.preventDefault();
  
      toDoEditInput.innerHTML = `
          <form id='edittodo'>
            <h4>To Do Edit</h4>
          
            <label for="edit-id">Kurią užduotį norėsite pakeisti?</label>
            <input type="text" id="edit-id" required>

            <label for="edit-type">Pakeisite veiksmą?</label>
            <input type="text" id="edit-type" required>

            <label for="edit-content">Pakeisite paskirtį?</label>
            <input type="text" id="edit-content" required>

                <label for="endDate-edit">End Date:</label>
                <input type="date" id="endDate-edit" name="endDate" required>

                <button type="submit" id="edit-input">edit</button>
                <button type="submit" id="edit-close">Close</button>
            </form>
            <style>
            #edittodo{
                text-align: center;
                border: 2px solid rgb(15, 15, 15);
                padding: 10px;
                margin: 20px auto;
                max-width: 250px;
                background-color: #f5e2c0; 
            }        
        </style>
            `;

            document.getElementById('edit-close').addEventListener('click', function (event) {
                event.preventDefault();
                location.reload();
            });

document.getElementById('edit-input').addEventListener('click', () =>{ 
    const taskEditInput = document.getElementById('edit-id');
    const taskEditType = document.getElementById('edit-type');
    const taskEditContent = document.getElementById('edit-content');
    const taskEditTime = document.getElementById('endDate-edit');

    const taskEditNumber = taskEditInput.value;
    const taskEditTypeInput = taskEditType.value;
    const taskEditContentInput = taskEditContent.value;
    const taskEditTimeInput = taskEditTime.value;
    
    if (!taskEditNumber || !taskEditTypeInput || !taskEditContentInput || !taskEditTimeInput) {
        
        console.log('Užpildykite visas įvestis.');
        alert('Užpildykite visas įvestis.');
        return;
    }

     
    const postToUpdate = {
        Id: taskEditNumber,
        UserId: userId,     //paimu is sessionSelect
        type: taskEditTypeInput,
        content: taskEditContentInput,
        endDate: taskEditTimeInput
        }
     
        fetch(`https://localhost:7171/api/ToDo/` + taskEditNumber,
        {
        method: 'PUT', 
        headers: {  
            'Content-type': 'application/json'
        },
        body: JSON.stringify(postToUpdate)          //body privalomas jei nori update
        })        
        .then ()                
        .then(result => {
            console.log("post was updated successfull");
            location.reload();
        })
        .catch(error => console.log(error))
    });      

    });  
};
function deleteToDo(){
   
    const taskDeleteButton = document.getElementById('task-delete');
    const toDoDeleteInput = document.getElementById('todo-delete');

    taskDeleteButton.addEventListener('click', function (event) {
      event.preventDefault();
         
      toDoDeleteInput.innerHTML = `
      <form id='deletetodo'>
          <h4>To Do Delete</h4>
          <label for="delete-id">Kurią užduotį norėsite ištrinti?</label>
          <input type="text" id="delete-id" required>
            <button type="button" id="delete-input">Delete task</button>
            <button type="button" id="delete-close">Close</button>
       </form>     
            <style>
            #deletetodo{
                text-align: center;
                border: 2px solid rgb(15, 15, 15);
                padding: 10px;
                margin: 20px auto;
                max-width: 250px;
                background-color: #f5e2c0; 
            }        
        </style>    
            `;
            document.getElementById('delete-close').addEventListener('click', function (event) {
                event.preventDefault();
                location.reload();
            });

const deletetodo = document.getElementById('delete-input');

/*if(deletetodo){
    alert('Choose your task to delete.')
}*/
deletetodo.addEventListener('click', () =>{ 
      const taskDeleteInput = document.getElementById('delete-id');    
      const taskDeleteNumber = taskDeleteInput.value;

      fetch(`https://localhost:7171/api/ToDo/` + taskDeleteNumber,
      {
      method: 'DELETE',                          
          'Content-type': 'application/json'
      })        
      .then ()                
      .then(result => {          
          location.reload();
      })
      .catch(error => console.log(error))
  });


});



}


}; //onload