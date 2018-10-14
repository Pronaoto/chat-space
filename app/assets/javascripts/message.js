$(document).on('turbolinks:load', function() {
$(function(){
  function buildHTML(message){
    // console.log(message.id);
    var image = "";

    image = (message.image) ? `<img class="lower-message__image" src="${ message.image }">`: "";

    var html =
                    `<div class='chatroom__body-message clearfix' data-message-id="${message.id}">
                        <div class='chatroom__body--message-name'>
                            ${message.name}
                        </div>
                        <div class='chatroom__body--message-time'>
                            ${message.created_at}
                        </div>
                        <div class='chatroom__body--message-body'>
                            <p>${message.content}</p>
                            ${image}
                        </div>
                    </div>`
      return html;
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();

    var formData = new FormData($(this).get(0));
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chatroom__body').append(html).animate({scrollTop: $('.chatroom__body')[0].scrollHeight}, 'fast');
      $('#message_content').val('');
      $('input').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    });
  });

 function autoUpdate(){
      var message_id = $('.chatroom__body-message:last').data('message-id') || 0;
      // console.log(message_id);

    $.ajax({
      url: location.href,
      type: 'GET',
      data: { message: {id: message_id} },
      dataType: 'json'
    })
    .done(function(data) {
      var insertHTML = '';
      data.forEach(function(message) {
          // #新しいmessageのみbuilidHTMLで作成、次にinsertHTMLに代入
          if (message.id > message_id) {
          insertHTML += buildHTML(message);
          // #buildHTMLに加えていく
        }
      });
      $('.chatroom__body').append(insertHTML);
      $('.chatroom__body').animate({scrollTop: $('.chatroom__body')[0].scrollHeight}, 'fast');
      // .chatroom__bodyに追加
    })
    .fail(function(data){
      alert('自動更新に失敗しました。')
    })
  }

  var interval = setInterval(function(){
    // console.log($('.chatroom__body-message').length);
     if (window.location.href.match(/\/groups\/\d+\/messages/)){
       autoUpdate();
     } else {
       clearInterval(interval);
     }
    }, 5000)
  });
});
