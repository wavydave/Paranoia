(function(){
$.getJSON( "http://localhost:7000/api/playerRoutes", function( data ) {
var items = [];
$.each( data, function(key, val ){
	items.push("<li><a>" + val.handle + "</a></li>");
});

// var HandleArray = [];

//  for (var i = 0; i < data.length; i++) {
//  	HandleArray.push(data[i].handle)
//  };
//  console.log(HandleArray);
//  document.getElementById("playerList").innerHTML = HandleArray;
 

 $("<ul/>", {
 	"class": "players",
 	html: items.join("")
	}).appendTo("#playerList");

});
})();