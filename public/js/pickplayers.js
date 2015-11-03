// (function(){
// $.getJSON( "http://localhost:7000/api/playerRoutes", function( data ) {
// var items = [];
// $.each( data, function(key, val ){
// 	items.push("<li><a>" + val.handle + "</a></li>");
// });

// // var HandleArray = [];

// //  for (var i = 0; i < data.length; i++) {
// //  	HandleArray.push(data[i].handle)
// //  };
// //  console.log(HandleArray);
// //  document.getElementById("playerList").innerHTML = HandleArray;
 

//  $("<ul/>", {
//  	"class": "players",
//  	html: items.join("")
// 	}).appendTo("#playerList");

// });
// })();
var activeArray = [];
var allPlayers = [];


$('#guys').on('change', function(event) {
	var printOut = document.getElementById('selectedPlayers');
	activeArray.push(event.target.value);
	var active = activeArray.map(function(e){
			var selected = '<li>' + e + '</li>';
			// selected += '<li>' + e + '</li>';
			return selected;

		})

		var runningList = active.join('');
		printOut.innerHTML = runningList;


});

// var playerPicker = function(event){
// 	console.log(event.value);
// };

(function(){
	var list = document.getElementById("guys");
	
	

	$.getJSON( "http://localhost:7000/api/playerRoutes", function( data ) {
		
		var players = '<option>Choose a guy for your game</option>';
		

		for (var i = 0; i < data.length; i++) {
			players += '<option value="' + data[i].handle + '">' + data[i].handle + '</option>';
			
			allPlayers.push(data[i].handle);
		}

		

		



		
		list.innerHTML = players;


	});
	

})();

