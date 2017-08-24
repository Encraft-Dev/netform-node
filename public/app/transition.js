var transition = function(fDiv, tDiv,tCol, callback){
    $("#"+fDiv).slideUp("slow", function(){
        $("#"+tDiv).slideDown("slow")
        $( "body" ).animate({
            backgroundColor: "#"+tCol,
        }, 1000, (callback ? callback() : function(){}) );
    });
}