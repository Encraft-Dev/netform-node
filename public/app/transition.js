var transition = function(fDiv, tDiv,tCol){
    $("#"+fDiv).slideUp("slow", function(){
        $("#"+tDiv).slideDown("slow")
        $( "body" ).animate({
            backgroundColor: "#"+tCol,
        }, 1000 );
    });
}