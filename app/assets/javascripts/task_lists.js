$(document).ready(function() {
  $('#new_task_list').on('submit', function (event) {
    event.preventDefault();
    var task = $('#task_list_task').val();
    var status = false;
    var form = $(this);

    $.ajax({
      url: form.attr('action'),
      method: form.attr('method'),
      data: {
        "task_list": {
          "task": task,
          "status": status
        }
      },
      dataType: "json",
      success: function (task) {
        var taskContainer = $('#uncompleted ol');
        var theCheckbox = $('<input type="checkbox">');
        var theText = $('<span>' + task.task + '</span>');
        var deleteButton = $('<button>Delete</button>');
        var taskList = $('<li data-id="' + task.id + '"></li>');
        theCheckbox.appendTo(taskList);
        theText.appendTo(taskList);
        deleteButton.appendTo(taskList);

        taskList.appendTo(taskContainer);
      },
    });
  });

function completeTask() {
  console.log("complete");
  var taskList = $(this).parent('li');
  var id = taskList.attr('data-id');
  $.ajax({
    url: "/task_lists/" + id,
    method: "put",
    data: {
      "task_list": {
        "status": true
      }
    },
    dataType: "json",
    success: function (completed_task) {
      var taskListCopy = taskList.clone(true, true);
      taskList.hide();
      taskListCopy.children('input[type=checkbox]').prop("checked", true);
      taskListCopy.appendTo($('#ch'));
    },
  });
}

function uncompleteTask() {
  console.log("uncomplete");
  var taskList = $(this).parent('li');
  var id = taskList.attr('data-id');
  $.ajax({
    url: "/task_lists/" + id,
    method: "put",
    data: {
      "task_list": {
        "status": false
      }
    },
    dataType: "json",
    success: function (uncompleted_task) {
      var taskListCopy = taskList.clone(false, false);
      taskList.hide();
      taskListCopy.appendTo($('#uncompleted ol'));
    },
  });
}

function deleteTask() {
  console.log("delete");
  var taskList = $(this).parent('li');
  var id = taskList.attr('data-id');
  $.ajax({
    url: "/task_lists/" + id,
    method: "delete",
    dataType: "json",
    success: function (deleted_task) {
      taskList.remove();
    },
  });
}

  $("#main-block").on("click", "#completed li input[type=checkbox]", uncompleteTask);
  $("#main-block").on("click", "#uncompleted li button, #completed li button", deleteTask);
  $("#main-block").on("click", "#uncompleted li input[type=checkbox]", completeTask);

});
