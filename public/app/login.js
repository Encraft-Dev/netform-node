$('document').ready(function(){
  $('#loginBtn').click(function(e){
    e.preventDefault();
    thisCar.email = $('#email1').val();
    thisCar.phone = $('#phone1').val();
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
      emit('user/generateId', {email: thisCar.email, phone: thisCar.phone})
      .then(function(results){
        thisCar = results;
        if(thisCar.car.make){
          $('#carMake').val(thisCar.car.make)
          filterModels(thisCar.car.make)
          $('#carModel').val(thisCar.car.id)
        }
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

var clearData = function(){
  Cookies.remove('thisCar');
}