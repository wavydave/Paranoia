(function(){
$.getJSON( "http://localhost:7000/api/gameRoutes", function( data ) {
 var name = data[0].gameName;
 var moderator = data[0].moderator;
 var startTime = data[0].startTime;
 var endTime = data[0].endTime;
 var location = data[0].location;

 console.log(data[0].gameName);
 document.getElementById("pleasework").innerHTML = name;
 document.getElementById("moderator").innerHTML = moderator;
 document.getElementById("startTime").innerHTML = startTime;
 document.getElementById("endTime").innerHTML = endTime;
 document.getElementById("location").innerHTML = location;
});
})();