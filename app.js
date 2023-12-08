let todos = []

$(function() {

  $('#btn-1').on('click', function() {
    $('.box-1').fadeOut()
  })
  
  $('#btn-2').on('click', function() {
    $('.box-1').fadeIn()
  })
  
  $('#btn-3').on('click', function() {
    $('.box-1').fadeToggle()
  })

  $('#btn-4').on('click', function() {
    $('.box-3').animate({
      left: '100px',
      backgroundColor: 'red'
    }, 1000)
  })

  $('#btn-5').on('click', function() {
    $('.box-2').slideUp()
  })

  $('#btn-6').on('click', function() {
    $('.box-2').slideDown()
  })

  $('#btn-7').on('click', function() {
    $('.box-2').slideToggle()
  })

  $('#btn-fetch').on('click', function() {
    $.ajax({
      url: 'https://dummyjson.com/todos',
      type: 'GET',
      success: function(response) {
        todos = response.todos
        buildList()
      },
      error: function(error) {
        console.error(error)
      }
    })
  })

  $('#taskForm').on('submit', function(event) {
    event.preventDefault()

    console.log($('#taskInput').val())

    $.ajax({
      url: 'https://dummyjson.com/todos/add',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        todo: $('#taskInput').val(),
        completed: false,
        userId: 26
      }),
      success: function(response) {
      
        $('.todo-list').prepend(`<li>${response.todo}</li>`)

      },
      error: function(error) {
        console.error(error)
      }
    })
  })

})

const handleDelete = (id) => {
  $.ajax({
    url: `https://dummyjson.com/todos/${id}`,
    type: 'DELETE',
    success: function(response) {
      todos = todos.filter(todo => todo.id !== response.id)
      buildList()
    },
    error: function(error) {
      console.error(error)
    }
  })
}

const buildList = () => {
  let listHtml = ''
  todos.forEach(item => {
    listHtml += `
      <li>${item.todo} <button onClick="handleDelete(${item.id})">DELETE</button></li>
    `
  })
  $('.todo-list').html(listHtml)
}