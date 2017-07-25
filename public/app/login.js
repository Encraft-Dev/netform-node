$('document').ready(function(){
  $('#loginBtn').click(function(e){
    e.preventDefault();
    thisCar.email = $('#email1').val();
    thisCar.phone = $('#phone1').val();
    if(!thisCar.id){
      if(offline == true){
        setCar(thisCar);
      }else{
        emit('login', thisCar);
      }
	}else{
    if(offline == true){
        setCar(thisCar);
      }else{
		    emit('updateUser', thisCar);
      }
	}
    
  });
});

// --------------------------------------------------------┤ LISTEN FOR SUCCESSFUL LOGIN
// socket.on('userSetup', function(car){
//   setCar(car)
// });

var setCar = function(car){
  thisCar = car;
  Cookies.set('thisCar', JSON.stringify(thisCar));
  $("#login").slideUp("slow", function(){
    if(!thisCar.carDetails){
        $("#car").slideDown("slow")
        $( "body" ).animate({
          backgroundColor: "#478e8e",
        }, 1000 );
    }else{
        $("#input").slideDown("slow")
        $( "body" ).animate({
          backgroundColor: "#336666",
        }, 1000 );
    }
  }); 
}