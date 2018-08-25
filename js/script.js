var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl =
  "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var prefix = "https://cors-anywhere.herokuapp.com/";

// $.ajax({
//     dataType: "json",
//     url: quoteUrl,
//     data: null,
//     success: createTweet
// });

$(document).ready(function() {
  getQuote();
  $(".trigger").click(function() {
    getQuote();
  });
});

function getQuote() {
  cursor_wait();
  $.getJSON(prefix + quoteUrl, createTweet)
}

function createTweet(input) {
  var data = input[0];

  var quoteText = $(data.content)
    .text()
    .trim();
  var quoteAuthor = data.title;
  var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

  if (!quoteAuthor.length) {
    quoteAuthor = "Unknown author";
  }

  if (tweetText.length > 140) {
    getQuote();
  } else {
    var tweet = tweetLink + encodeURIComponent(tweetText);
    $(".quote").text(quoteText);
    $(".author").text("Author: " + quoteAuthor);
    $(".tweet").attr("href", tweet);

    remove_cursor_wait();
  }
}

cursor_wait = function() {
  var elements = $(":hover");
  if (elements.length) {
    elements.last().addClass("cursor-wait");
  }
  $("html")
    .off("mouseover.cursorwait")
    .on("mouseover.cursorwait", function(e) {
      $(e.target).addClass("cursor-wait");
    });
};

remove_cursor_wait = function() {
  $("html").off("mouseover.cursorwait");
  $(".cursor-wait").removeClass("cursor-wait");
};
