$(document).ready(readyNow);

function readyNow(){
    console.log('in JQ');
    displayTasks();
    $('#submitTaskButton').on('click', submitTask);
    $('#taskOutput').on('click', '.completeTaskButton', completeTask);
    $('#taskOutput').on('click', '.deleteTaskButton', deleteTask);
};//end readyNow

function completeTask(){
    console.log('in completeTask');
    let completeId= $(this).data('id');
    let time= new Date().toLocaleTimeString([],{hour:'2-digit', minute:'2-digit'});
    let date =new Date().toLocaleDateString();
    let stamp = time + ' ' + date;
    console.log(stamp);
    let newObject={
        completeTime: stamp
    }
    console.log(newObject.completeTime);
    $(this).addClass('green')
    //ajax put
    $.ajax({
        method: 'PUT',
        url: '/listofthings/' + completeId,
        data: newObject
    }).then(function(response){
        console.log('back from PUT:', response);
        displayTasks();
    }).catch(function(err){
        console.log(err);
        alert('did not update');
    })//end ajax call
}//end completeTask

function deleteTask(){
    console.log('in delete task');
    let taskId= $(this).data('id');
    swal({
        title: "WARNING",
        text: "Are you sure you want to delete this task?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then((deleteTask)=>{
        if (deleteTask) {
          swal("Your task has been deleted.",{
            icon: "success",
          });
          //ajax DELETE call
          $.ajax({
          method: 'DELETE',
          url: '/listofthings/' + taskId,
          }).then(function(response){
          console.log('back from Delete', response)
          displayTasks();
          }).catch(function(response){
          console.log(err);
          alert('did not delete');
          })//end ajax delete
        }else{
         swal("Your task has not been deleted");
        }
        });
    }//end deleteTask

function displayTasks(){
    //ajax GET call
    $.ajax({
        method: 'GET',
        url: '/listofthings'
    }).then(function(response){
        //empty before appending
        $('#taskOutput').empty();
        console.log('response from server', response);
        //loop through tasks
        for(let i=0; i<response.length; i++ ){
            let timeHtml= 'INCOMPLETE'
            //variable to display complete button or check mark
            let completedHTML=`<button data-id=${response[i].id} class="completeTaskButton">Complete</button>`
            //variable to set the class of tr
            let classCss=`<tr class="white">`
            //variable to number each task
            let count=  Number([i])+1
            console.log(count);
            let thClass=`<th>`
            if(response[i].completed === true){
            completedHTML=`<span class="check">&#10003;</span>`;
             classCss= `<tr class="green">`
             thClass= `<th class="crossedOut">`
             timeHtml= `${response[i].completeTime}`
            }//end if
            $('#taskOutput').append(`
            ${classCss}
            ${thClass}${count}. ${response[i].task}</th>
            <th>${completedHTML}</th>
            <th>${timeHtml}<th>
            <button data-id=${response[i].id} class="deleteTaskButton">X</button>
            </tr>
            `);//end append
        }//end for
    }).catch(function(error){
        console.log('error in GET', error);
    })//end ajax
}//end displayTasks

function submitTask(){
    //create a variable to send to server
    let newTask={
        task:$('#taskToDO').val(),
        completed: false,
        completeTime: null
    }
    //ajax POST
    $.ajax({
        method: 'POST',
        url: '/listofthings',
        data: newTask
    }).then(function(response){
        console.log('response from server', response)
        $('#taskToDO').val('');
        $('#taskToDO').empty();
        displayTasks();
    }).catch(function(error){
        console.log('error in POST', error);
        alert('unable to add task')
    });//end ajax
};//end submitTask
