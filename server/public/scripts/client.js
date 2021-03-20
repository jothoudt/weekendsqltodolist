$(document).ready(readyNow);

function readyNow(){
    console.log('in JQ');
    displayTasks();
    $('#submitTaskButton').on('click', submitTask);
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
            $('#taskOutput').append(`
            <tr>
            <th>${response[i].task}</th>
            <th><button data-id=${response[i].id} class="completeTaskButton">Complete</button></th>
            <th><button data-id=${response[i].id} class="deleteTaskButton">X</button</th>
            </tr>
            `);
        }
    }).catch(function(error){
        console.log('error in GET', error);
    })
}