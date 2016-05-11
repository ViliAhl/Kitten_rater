var kissa = (function(){
    var rootURL = "https://kitten-rater-vilperi.c9users.io/kitten_rater";
    var cat;
    return {
        getNewCat: function () {
    $.ajax({
        type: 'GET',
        url: rootURL + '/' + "newcat",
        dataType: "json",
        success: function(data){
        	cat = data;
        	
        }
    });
    if (cat!=null){
  	    return false;
    }else return true;
},
        
        
        
        
        getCatById: function() {
    $.ajax({
        type: 'GET',
        url: rootURL + '/cat/',
        dataType: "json",
        data: {id:13}, 
        
        success: function(data){
          	cat = data;
        }
    });
    if (cat!=null){
          	    return false;
          	}else return true;
    
}
    }
}());


/*
var notes = (function() {
    var list = [];

    return {
        add: function(note) {
            if (note && note.replace(/\s/g, "").length>0) {
                var item = {timestamp: Date.now(), text: note};
                list.push(item);
                return true;
            }
            return false;
        },
        remove: function(index) {
            if (list.length>index){
                list.splice(index,1)
                return true;
            }
            return false;
        },
        count: function() {
            return list.length;
        },
        list: function() {},
        find: function(str) {
            for (var i =0;i< list.length; i++){
                if(list[i].text.indexOf(str)>-1){
                    return true;
                }
                
            }
            return false;
            
        },
        clear: function() {
            list.splice(0, list.length);
        }

    }
}());
*/