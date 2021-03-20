$(document).ready(readyNow);

function readyNow(){
    console.log('in JQ');
    displayTasks();
    $('#submitTaskButton').on('click', submitTask);
    $('#taskOutput').on('click', '.completeTaskButton', completeTask);
    $('#taskOutput').on('click', '.deleteTaskButton', deleteTask);
};

function submitTask(){
    let newTask={
        task:$('#taskToDO').val(),
        completed: false
    }

    $.ajax({
        method: 'POST',
        url: '/listofthings',
        data: newTask
    }).then(function(response){
        console.log('response from server', response)
        displayTasks();
    }).catch(function(error){
        console.log('error in POST', error);
        alert('unable to add task')
    });
};

function displayTasks(){
    $.ajax({
        method: 'GET',
        url: '/listofthings'
    }).then(function(response){
        $('#taskOutput').empty();
        console.log('response from server', response);
        for(let i=0; i<response.length; i++ ){
            let completedHTML=`<button data-id=${response[i].id} class="completeTaskButton">Complete</button>`
            let classCss=`<tr class="white">`
            let thClass=`<th>`
            if(response[i].completed === true){
            completedHTML=`<span class="check">&#10003;</span>`;
             classCss= `<tr class="green">`
             thClass= `<th class="crossedOut">`
            }
            $('#taskOutput').append(`
            ${classCss}
            ${thClass}${response[i].task}</th>
            <th>${completedHTML}</th>
            <button data-id=${response[i].id} class="completeTaskButton">Complete</button>
            <th><button data-id=${response[i].id} class="deleteTaskButton">X</button></th>
            </tr>
            `);
        }
    }).catch(function(error){
        console.log('error in GET', error);
    })
}

function deleteTask(){
    console.log('in delete task');
    let taskId= $(this).data('id');
    $.ajax({
        method: 'DELETE',
        url: '/listofthings/' + taskId,
    }).then(function(response){
        console.log('back from Delete', response)
        displayTasks();
    }).catch(function(response){
        console.log(err);
        alert('did not delete')
    })
}

function completeTask(){
    console.log('in completeTask');
    let completeId= $(this).data('id');
    $(this).addClass('green')
    $.ajax({
        method: 'PUT',
        url: '/listofthings/' + completeId
    }).then(function(response){
        console.log('back from PUT:', response);
        displayTasks();
    }).catch(function(err){
        console.log(err);
        alert('did not update');
    })
}