window.onload = lataus;

var rootURL = "https://kitten-rater-vilperi.c9users.io/kitten_rater"
var cat;
/**
 * Lisää eventlistenerit kuvian arvostelutähtiin.
 * Lisää keypress eventlistenerin, jolla enteriä painamalla lähetetään kirjoitettu kommentti.
 */
document.getElementById("star-5").addEventListener("click", function() {arvostele("5");});
document.getElementById("star-4").addEventListener("click", function() {arvostele("4");});
document.getElementById("star-3").addEventListener("click", function() {arvostele("3");});
document.getElementById("star-2").addEventListener("click", function() {arvostele("2");});
document.getElementById("star-1").addEventListener("click", function() {arvostele("1");});
document.getElementById("comment").addEventListener("click", function() {comment();});
document.getElementById("commentfield").addEventListener('keypress', function (e) {
    //alert(document.getElementById("kommentti").value);
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
   if (document.getElementById("kommentti").value != "" && document.getElementById("nimi").value != ""){
      comment();
    }else {
        $("kommentti").prop('required',true);
        $("nimi").prop('required',true);
        document.getElementById("kommentti").title("Can't be empty");
        document.getElementById("nimi").title("Can't be empty");
    }
}
});
/** 
 * Asetetaan elementit haluttuun tilaan sivu avattaessa tai uudelleen ladattaessa. 
 Kutsutaan window.onloadissa
 */
function lataus(){
    document.getElementById('everything').style.display = 'none';
	document.getElementById('commentfield').style.display = '';
	document.getElementById('ratingfield').style.display = '';
	document.getElementById('kommentti').value = '';
	document.getElementById('nimi').value = '';
	getNewCat();
	getBestCats();
}
/** 
 * Asettaa sivun haluttuun tilaan käyttäjän pyyhkäistäessä
    tai nuolinäppäimellä uuteen kuvaan siirtyessä. 
    Asettaa arvostelutähdet nollaan, sekä kommentit/rating laatikon piiloon. 
 Hakee uuden kissan.
 */
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

/** Mahdollistaa kissojen selauksen vasemmalla ja oikealla nuolinäppäimellä
  */
$(document).keydown(function(e) {
    switch(e.which) {
       case 37: // left
     		if (!$("#nimi").is(':focus')){
     		    if(!$("#kommentti").is(':focus')){
     		        swipeload();
     		    }
    			
			}
        break;

        case 39: // right
        if (!$("#nimi").is(':focus')) {
            if(!$("#kommentti").is(':focus')){
     		        swipeload();
            }
        }
        break;


        default: return; // exit this handler for other keys
    }
});
/** Pyyhkäisyn käyttö uuden kissakuvan lataamiseksi
*/
var element = document.getElementById("catimage");
var mc = Hammer(element).on("swipeleft", function() {
    swipeload();
});

/** 
 * Lähettää ajaxin avulla tiedon PHP:lle, joka hakee tiedon tietokannasta. 
 * Palauttaa kissan ID:n mukaan
*/
function getCatById() {
    $.ajax({
        type: 'GET',
        url: rootURL + '/cat/',
        dataType: "json",
        data: {id:cat.ID}, 
        
        success: function(data){
          	cat = data;
          	$("#ratingfield").html("The average rating for this cute pussy is: " + cat.avg + " stars!");
		parseComments(cat);
            
        }
        
    });
    
}
/**
 * Hakee viikon viiden parhaan kissan arvostelut ja lisätään ne sivulle
 */
function getBestCats() {
    $.ajax({
        type: 'GET',
        url: rootURL + '/cats/',
        dataType: "json",
        data: {}, 
        success: function(data){
          	var cats = data;
          	for(var i =0;i<cats.length;i++){
          	    $("#bestPussies").append('<div id="'+i+'" class="col-md-2"></div>');
          	    $("#"+i).append('<div class="row">');
          	    $("#"+i).append('<img id="cat" class="img-responsive" src="../../Cats/' + cats[i].ID + '.jpg"/>');
          	    $("#"+i).append('<p class="prating">' + cats[i].avg + '/5 stars</p>');
          	    $("#"+i).append('</div>');
          	}

        },
        error: function(jqXHR, textStatus, errorThrown){
            alert( textStatus);
        }
    });
}

/** Hakee tietokannasta satunnaisen uuden kissan
*/
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
           	

           	$("#ratingfield").html("The average rating for this cute pussy is: " + cat.avg + " stars!");
           	document.getElementById('ratingfield').innerHTML = "The average rating for this cute pussy is: " + cat.avg + " stars!";
			
        }
    });
}
/** 
 * Hakee tietokannasta nimimerkin ja sillä annetun kommentin
 * @param {string} kitty = kaikki kissan tiedot (kommentit, rating, id) json muodossa
*/
function parseComments(kitty){
	var row, rows;
	if (kitty.comments === undefined) {
		document.getElementById("comments").innerHTML = "No comments yet. Be the first one!";
	}
	else {
		
		rows ="";
		for(var com in kitty.comments){
		        rows = rows + kitty.comments[com].nick + " said: " + kitty.comments[com].comment + "<br>";
		}
		document.getElementById("comments").innerHTML = rows;
	}
	
}
/** 
 * Tähtiä antaessa paljastaa käyttäjälle kommenttikentän. 
 * Hakee tiedot kissalle getCatById:n kautta.
 * @param {int} a = tähtien määrä
*/
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
}
/** Käyttäjän kirjoittama kommentti tallennetaan tietokantaan ja sille päivitetään tiedot
*/
function comment(){
    if (document.getElementById("kommentti").value != "" && document.getElementById("nimi").value != ""){
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
)}else {
        $("kommentti").prop('required',true);
        $("nimi").prop('required',true);
        document.getElementById("kommentti").setCustomValidity("Can't be empty");
        document.getElementById("nimi").setCustomValidity("Can't be empty");
    }
};
	

/** Ajaxilla lähetetään käyttäjän lisäämä kuva tietokantaan
 * @param {string} data = käyttäjän lataaman kuvan tiedot 
*/
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



/** Kommentti- ja ratingkenttien näykyvyys ja liikkuminen niiden välillä.
*/

    document.querySelector('nav > ul > li:nth-child(1)').onclick = function() {
	document.getElementById('commentfield').style.display = '';
	document.getElementById('ratingfield').style.display = 'none';
};

    document.querySelector('nav > ul > li:nth-child(2)').onclick = function() {
	document.getElementById('commentfield').style.display = 'none';
	document.getElementById('ratingfield').style.display = '';
};

/** Funktio, jolla käyttäjän lataama kuva haetaan käyttäjän koneelta ja
    lisätään tietokantaan appendToBackend -funktiolla.
*/
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
