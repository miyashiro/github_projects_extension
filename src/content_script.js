//----------------------
$(function () {
  const target = document.getElementsByClassName('js-project-card-details')[0];
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      $.get(mutation.target.getAttribute('data-issue-url'), function(data){
        var result = data.match(/(?<=div[^\<]+)<a[^\<]+data-hovercard-type="issue"[\s\S]+?(<\/div>)[\s\S]+?(<\/div>)/g);
        var parents = data.match(/(?<=<a[^\<]+class="issue-link js-issue-link"[^\<]+href="[^"]+)\/[^\/]+\/\d+(?="[^\<]+#\d+<\/a>)/g);
        $('.js-project-issue-details-container').removeAttr('style');
        if (result) { 
          var childrenDiv = $.parseHTML('<div id="target-children" style="padding: 20px;" class="border-top">')[0];
          childrenDiv.append($.parseHTML('<div style="font-weight: bold;">子issue</div>')[0]);
          $.each(result, function(i, txt) {
            var textPart = $.parseHTML(txt)[0];
            var statusPart = $.parseHTML(txt)[2];
            statusPart.setAttribute("style", "float: right; transform: scale(0.5, 0.5);");
            var textPartDiv = $.parseHTML('<div>')[0];
            textPart.setAttribute("style", "font-size: 10px!important;");
            textPartDiv.append(textPart);
            textPartDiv.append(statusPart);
            childrenDiv.append(textPartDiv);
            var card = $('a[href*="' + textPart.getAttribute('href') + '"].js-project-card-issue-link');
            if (card.length > 0) {
              card[0].parentElement.setAttribute("style", "background-color: #FFFF99;");
            }
          });
          $('.project-comment-title-hover').after(childrenDiv);
        };
        if (parents) { 
          $.each(parents, function(i, txt) {
            var card = $('a[href*="' + txt + '"].js-project-card-issue-link');
            if (card.length > 0) {
              card[0].parentElement.setAttribute("style", "background-color: #CCFFCC;");
            }
          });
        };
        console.log(parents);
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
