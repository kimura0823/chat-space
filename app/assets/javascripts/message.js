$(function(){
  function buildHTML(message){
    var last_message_id = $('.message:last').data("message-id");
    console.log(last_message_id);
    if ( message.image ) {
      var html =
        `<div class="main-message__top" data-message-id=${message.id}>
          <div class="main-message__top__name">
            ${message.user_name}
            <div class="main-message__top__name__coment">
              ${message.content}
            </div>
              <img src = ${message.image} >
          </div>
          <div class="main-message__top__time">
            ${message.created_at}
          </div>
        </div>`
    return html;
    } else {
      var html =
      `<div class="main-message__top" data-message-id=${message.id}>
        <div class="main-message__top__name">
          ${message.user_name}
            <div class="main-message__top__name__coment">
              ${message.content}
            </div>
        </div>
        <div class="main-message__top__time">
          ${message.created_at}
        </div>
      </div>`
      return html;
      };
    }

    $('.new_message').on('submit', function(e){
      console.log("aaa")
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
      })
      .done(function(data){
        console.log("aaa")
        var html = buildHTML(data);
        $('.main-message').append(html);
        $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
        $('form')[0].reset();
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      })
      .always(function() {
        $(".submit-btn").prop('disabled', false);
      });
    });

    var reloadMessages = function () {
        var last_message_id = $('.main-message__top:last').data("message-id"); 
        
        $.ajax({ 
          url: "api/messages", 
          type: 'get', 
          dataType: 'json', 
          data: {last_id: last_message_id} 
        })
      .done(function(messages) {
        console.log("messages")
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.main-message').append(insertHTML);
          $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
        }
        })
        .fail(function() {
          alert('error');
        });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)){
      setInterval(reloadMessages, 7000);
    }
  });