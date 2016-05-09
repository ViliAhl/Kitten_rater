window.onload = lataus;

var rootURL = "https://kitten-rater-vilperi.c9users.io/kitten_rater"
var cat;
document.getElementById("star-5").addEventListener("click", function() {arvostele("5");});
document.getElementById("star-4").addEventListener("click", function() {arvostele("4");});
document.getElementById("star-3").addEventListener("click", function() {arvostele("3");});
document.getElementById("star-2").addEventListener("click", function() {arvostele("2");});
document.getElementById("star-1").addEventListener("click", function() {arvostele("1");});
document.getElementById("comment").addEventListener("click", function() {comment();});
document.getElementById("commentfield").addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      comment();
    }
});

function lataus(){
    document.getElementById('everything').style.display = 'none';
	document.getElementById('commentfield').style.display = '';
	document.getElementById('ratingfield').style.display = '';
	document.getElementById('kommentti').value = '';
	document.getElementById('nimi').value = '';
	getNewCat();
}
function swipeload(){
	$("#star-5").prop("disabled",false);
 	$("#star-4").prop("disabled",false);
 	$("#star-3").prop("disabled",false);
 	$("#star-2").prop("disabled",false);
 	$("#star-1").prop("disabled",false);
	document.getElementById('ratingfield').style.display = '';
	document.getElementById('everything').style.display = 'none';
	document.getElementById('commentfield').style.display = '';
	document.getElementById('kommentti').value = '';
	document.getElementById('nimi').value = '';
	getNewCat();
	$("input:radio").attr("checked", false);
}
//EEBENPUU
/*window.onkeypress = function(event) {
   if (event.keyCode == 97 || event.keyCode == 100) {
     swipeload();
   }
}*/

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        if()
        swipeload();
        break;

        case 38: // up
        break;

        case 39: // right
        swipeload();
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

var element = document.getElementById("catimage");
var mc = Hammer(element).on("swipeleft", function() {
    swipeload();
});





function getCatById() {
    $.ajax({
        type: 'GET',
        url: rootURL + '/cat/',
        dataType: "json",
        data: {id:cat.ID}, 
        
        success: function(data){
          	cat = data;
          	$("#ratingfield").html("The average rating for this cute pussy is: " + cat.stars / cat.rates + " stars!");
			//$("#comments").html(cat.comments);
		//document.getElementById("comments").innerHTML = cat.comments;
		//document.getElementById("comments").innerHTML = cat.comments;
		parseComments(cat);

        }
    });
}
function getNewCat() {
    $.ajax({
        type: 'GET',
        url: rootURL + '/' + "newcat",
        dataType: "json",
        success: function(data){
        	cat = data;
        	//JEE TOIMII!! LINUX TO THE RESQUE:3
        	$("#catimage").attr("src","../../Cats/" + cat.ID + ".jpg");
           	//$("#comments").html(cat.comments);
           	parseComments(cat);
           	

           	$("#ratingfield").html("The average rating for this cute pussy is: " + cat.stars +" "+ cat.rates + " stars!");
           	document.getElementById('ratingfield').innerHTML = "The average rating for this cute pussy is: " + cat.stars / cat.rates + " stars!";
			
        }
    });
}

function parseComments(kitty){
	var row, rows;
	if (kitty.comments === undefined) {
		document.getElementById("comments").innerHTML = "No comments yet. Be the first one!";
	}
	else {
		
		rows ="";
		for(var com in kitty.comments){
		    /*row = "";
		    for (var c in kitty.comments[com]){
		        row = row + kitty.comments[com][c] + c;
		        if (c==0){
		        row =row + " says: "
		        }
		    }*/
			   //rows = rows +row + ;
		        rows = rows + kitty.comments[com].nick + " says: " + kitty.comments[com].comment + "<br>";
		}
		document.getElementById("comments").innerHTML = rows;
	}
	
}
function arvostele(a) {
 	 document.getElementById('everything').style.display = '';
 	$("#star-5").prop("disabled",true);
 	$("#star-4").prop("disabled",true);
 	$("#star-3").prop("disabled",true);
 	$("#star-2").prop("disabled",true);
 	$("#star-1").prop("disabled",true);
    $.ajax({
        type: 'POST',
        //contentType: 'application/json',
        url: rootURL + "/cat/star/",
        //dataType: "json",
        data: {id: cat.ID, star: a},
        success: function(data, textStatus, jqXHR){
        	getCatById();

        },
        error: function(jqXHR, textStatus, errorThrown){
            alert( textStatus);
        }
    });
     //document.getElementById('tahti').style.display = 'none';
     
}
function comment(){
	var kom = document.getElementById('kommentti').value;
	document.getElementById('kommentti').value = '';
	var nimi = document.getElementById('nimi').value;
	$.ajax({
		type: 'POST',
		url: rootURL + "/cat/comment/",
	//	dataType: "json",
		data: {id: cat.ID, comment: kom, nick: nimi},
		success: function(data, textStatus, jqXHR){
			getCatById();
	},
	error: function(jqXHR, textStatus, errorThrown){
            alert( textStatus);
        }
	}
)};
	


function appendToBackend(data){
	$.ajax({
		type: 'POST',
		url: rootURL + "/cat/img/",
		dataType: "json",
		data: {img: data},
		success: function(data){
       	console.log('Success');
}
}
	)};




    document.querySelector('nav > ul > li:nth-child(1)').onclick = function() {
	document.getElementById('commentfield').style.display = '';
	document.getElementById('ratingfield').style.display = 'none';
};

    document.querySelector('nav > ul > li:nth-child(2)').onclick = function() {
	document.getElementById('commentfield').style.display = 'none';
	document.getElementById('ratingfield').style.display = '';
};
	

function previewFile(){
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();
       
       

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
       
      document.getElementById('upload').appendToBackend(reader.result);
  }

  previewFile();  //calls the function named previewFile()
