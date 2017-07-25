$('document').ready(function(){
  $('#loginBtn').click(function(e){
    e.preventDefault();
    thisCar.email = $('#email1').val();
    thisCar.phone = $('#phone1').val();
  //   if(!thisCar.id){
  //     if(offline == true){
  //       setCar(thisCar);
  //     }else{
  //       emit('login', thisCar);
  //     }
	// }else{
  //   if(offline == true){
  //       setCar(thisCar);
  //     }else{
	// 	    emit('updateUser', thisCar);
  //     }
	// }
    login();
  });
});

// --------------------------------------------------------┤ LISTEN FOR SUCCESSFUL LOGIN
// socket.on('userSetup', function(car){
//   setCar(car)
// });
var proms = [];
var login = function(){
  if(!thisCar.id){
    proms.push(
      emit('user/generateId', {email: thisCar.email})
      .then(function(results){
        thisCar.id = results.guid;
      })
  );
  }else{
    proms.push(emptyProm(thisCar.id));
  }

  var items = Promise.all(proms);
	items.then(function(results){
    Cookies.set('thisCar', JSON.stringify(thisCar));
    (!thisCar.carDetails ? transition('login', 'car', '478e8e') : transition('login','input', '336666'));
  }).catch(e => {
    console.log(e);
  });
}