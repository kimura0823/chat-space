$(function(){
  function buildHTML(message){
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
            ${message.date}
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
          ${message.date}
        </div>
      </div>`
      return html;
      };
    }
  $('.submit-btn').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      
      var html = buildHTML(data);
      $('.main-message').append(html);
      $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })
});