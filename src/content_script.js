//----------------------
$(function () {
  const target = document.getElementsByClassName('js-project-card-details')[0];
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      $.get(mutation.target.getAttribute('data-issue-url'), function(data){
        var result = data.match( /<[^<]+data-hovercard-type="issue"[^>]+>[^>]+>/g );
        if (result) { 
          var childrenDiv = $.parseHTML('<div id="target-children" style="padding: 20px;" class="border-top">')[0];
          childrenDiv.append($.parseHTML('<div style="font-weight: bold;">子issue</div>')[0]);
          $.each(result, function(i, txt) {
            var textPart = $.parseHTML(txt)[0];
            var textPartDiv = $.parseHTML('<div>')[0];
            textPart.setAttribute("style", "font-size: 10px!important;");
            textPartDiv.append(textPart);
            childrenDiv.append(textPartDiv);
          });
          $('.project-comment-title-hover').after(childrenDiv);
        };
        console.log(result);
      });
    });
  });

  // オブザーバの設定
  const config = {
    attributes: true
  };

  // 対象ノードとオブザーバの設定を渡す
  observer.observe(target, config);
});
