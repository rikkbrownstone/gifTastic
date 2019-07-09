var giphys = ["matrix", "avengers", "american sniper", "rocky", "x-men"];
var numberOfGif = 10;
var rating ="PG";

function renderButtons() {

     // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

// Looping through the array of movies
   for (var i= 0; i < giphys.length; i++){
// Then dynamicaly generating buttons for each movie in the array
    var a = $("<button>");
// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)       
    a.addClass("btn");
// Adding a class of movie-btn to our button
    a.addClass("giphy-btn");
// Adding a data-attribute
    a.attr("data-name", giphys[i]);
// Providing the initial button text
    a.text(giphys[i]);
 // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
}
  
    
  // This function handles events where a movie button is clicked
  $(".giphy-btn").on("click", function() {
    $("#giphy-view").empty();
    $("#giphy-view").removeClass("border");
    displayGiphy($(this).text());
});
}

//function to add buttons on empty div
function addButton(here){
  //if the value of array is not found indexOf() == -1
 if (giphys.indexOf(here) == -1){
   //use .push to push the added button here
     giphys.push(here);
  //place were the added buttons will be place
     $("#buttons-view").empty();
     renderButtons();
 }
}
 
//functions to display the gif
function displayGiphy(_here){




$.ajax({
url: "https://api.giphy.com/v1/gifs/search?q=" + _here + 
"&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" + rating + "&limit=" + numberOfGif,
method: "GET"
}).then(function(response){
  response.data.forEach(function(moving){
  newDiv = $("<div>");
  newDiv.addClass("new-gif-container");
  newDiv.append("<p>Rating:" + moving.rating.toUpperCase() + "</p>")
  var newImage = $("<img src = " + moving.images.fixed_height_still.url + ">");
  newImage.addClass("gif-image");
  newImage.attr("state", "still");
  newImage.attr("still-data", moving.images.fixed_height_still.url);
  newImage.attr("animated-data", moving.images.fixed_height.url);
  newDiv.append(newImage);
  $("#giphy-view").append(newDiv); 
  
  
});
//loop and attributes for still and animated gif
$("#giphy-view").addClass("border");
$(".gif-image").unbind("click");
$(".gif-image").on("click",function(){
  //for gif to be still and animated
 if ($(this).attr("state") === "still"){
     $(this).attr("state", "animated");
     $(this).attr("src", $(this).attr("animated-data"));
}
else{
   $(this).attr("state", "still");
   $(this).attr("src", $(this).attr("still-data"));
}
});
});
}

//function for submit button 
$(document).ready(function(){
 renderButtons();
 $("#submit").on("click", function(){
    event.preventDefault();
    addButton($("#giphy-input").val().trim());
    $("#giphy-input").val("");
 });
});

