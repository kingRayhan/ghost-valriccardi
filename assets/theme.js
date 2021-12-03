var pathname = window.location.pathname;

$(function () {
  "use strict";
  loadMore();
  mobileMenu();
  socialShareButtons();
  //   darkMode();
});

function loadMore() {
  const button = $("#loadmore");
  const buttonLabel = $("#loadmore").text();
  var nextPageUrl = `${pageUrl}/page/${next_page}`;

  if (button.length) {
    button.click(function () {
      $.ajax({
        url: nextPageUrl,
        type: "GET",
        dataType: "html",

        beforeSend: function () {
          button.text("Loading...");
        },
      }).done(function (data) {
        var $data = $(data);
        $("#posts").append($data.find("#posts").html());

        if (total_pages > next_page) {
          button.text(buttonLabel);
          next_page++;
          nextPageUrl = `/page/${next_page}`;
        } else {
          button.remove();
        }
      });
    });
  }
}

function mobileMenu() {
  var menu = $("#mobile-menu");
  var button = $("#hamburger");
  var cross = $(".mobile-menu__cross");

  cross.click(function () {
    menu.removeClass("mobile-menu--active");
  });

  button.click(function () {
    menu.addClass("mobile-menu--active");
  });
}

function socialShareButtons() {
  const button = $("[data-social-share-button]");
  if (!button.length) return;

  const shareLinks = {
    FACEBOOK: "https://www.facebook.com/sharer/sharer.php?u=$URL$",
    TWITTER: "https://twitter.com/intent/tweet?url=$URL$",
    LINKEDIN: "https://www.linkedin.com/shareArticle?mini=true&url=$URL$",
    PINTEREST: "https://pinterest.com/pin/create/button/?url=$URL$",
  };

  button.click(function (e) {
    e.preventDefault();
    const url = $(this).data("url");
    const provider = $(this).data("social-provider");

    shareLinks[provider] = shareLinks[provider].replace("$URL$", url);

    window.open(shareLinks[provider], provider, "width=500,height=500");
    return false;
  });
}

// function darkMode() {
//   const button = $("[data-dark-mode-button]");
//   const html = $("html");
//   if (!button.length) return;

//   button.click(function () {
//     if (html.hasClass("dark")) {
//       html.removeClass("dark");
//       localStorage.setItem("minima_dark", false);
//     } else {
//       html.addClass("dark");
//       localStorage.setItem("minima_dark", true);
//     }
//   });
// }
