$(document).ready(readyNow);

function readyNow(){
    console.log('in JQ');
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
    }).catch(function(error){
        console.log('error in POST', error);
        alert('unable to add task')
    });
};