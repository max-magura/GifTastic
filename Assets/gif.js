var movies = ["The Big Lebowski", "The Matrix", "American Gangster", "Fight Club", "Fantastic Mr. Fox", "Arrival", "Step Brothers", "Best In Show", "Zoolander", "This Is Spinal Tap", "Coraline"];

function displayGifs() {

  var movie = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=4RYLhNo1kwAIzsO1ZHpws7JcHSBrencb&rating=pg-13&limit=10";

  $("#gifSection").empty()

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {

      var gifDiv = $("<div>");
      var rating = results[i].rating;
      var rating = $("<p>").text("Rating: " + rating);
 
      var movieGif = $("<img>");

      movieGif.attr("src", results[i].images.fixed_height_still.url);
      movieGif.attr("class", "gif");
      movieGif.attr("data-state","still")

      gifDiv.append(movieGif);
      gifDiv.append(rating);

      $("#gifSection").prepend(gifDiv)
      
    }

    $(".gif").on("click", function() {
      var state = $(this).attr("data-state");
        for (var i = 0; i < results.length; i++) {
          if (state === "still") {
            $(this).attr("src", results[i].images.fixed_height.url);
            $(this).attr("data-state", "animate");
          }
          else {
            $(this).attr("src", results[i].images.fixed_height_still.url);
            $(this).attr("data-state", "still"); 
        }
      }
    })

  });
}

/* $(".gif").on("click", function() {
  console.log("butt")
     if (state === "still") {
    $(this).attr("src", results[i].images.fixed_height.url);
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", results[i].images.fixed_height_still.url);
    $(this).attr("data-state", "still"); 
  } 
}); */


function renderButtons() {
  $("#movieButtons").empty();
  for (var i = 0; i < movies.length; i++) {
    var a = $("<button>");
    a.addClass("movie");
    a.attr("data-name", movies[i]);
    a.text(movies[i]);
    $("#movieButtons").append(a);
  }
}

$("#movieSearchSubmit").on("click", function(event) {
  event.preventDefault();
  var movie = $("#movieInput").val().trim();
  movies.push(movie);
  renderButtons();
  $("#form").trigger('reset');
});

$(document).on("click", ".movie", displayGifs);

renderButtons();
