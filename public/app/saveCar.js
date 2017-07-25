var cars = [{Make:"BMW",Model:"i3",Name:"BMW i3"},
  {Make:"Ford",Model:"Focus EV",Name:"Ford Focus EV"},
  {Make:"Mercedes",Model:"B-Class",Name:"Mercedes B-Class"},
  {Make:"Nissan",Model:"Leaf (67)",Name:"Nissan Leaf (67)"},
  {Make:"Nissan",Model:"Leaf (83)",Name:"Nissan  Leaf (83)"},
  {Make:"Renault",Model:"Zoe",Name:"Renault Zoe"},
  {Make:"Smart",Model:"ForTwo",Name:"Smart ForTwo"},
  {Make:"Citroen",Model:"C-Zero",Name:"Citroen C-Zero"},
  {Make:"Mitsubishi",Model:"I-Miev",Name:"Mitsubishi I-Miev"},
  {Make:"VW",Model:"E-up",Name:"VW E-up"},
  {Make:"VW",Model:"E-golf",Name:"VW E-golf"},
  {Make:"Peugeot",Model:"iON",Name:"Peugeot iON"},
  {Make:"Tesla",Model:"Model S (60)",Name:"Tesla Model S (60)"},
  {Make:"Tesla",Model:"Model S (85D)",Name:"Tesla Model S (85D)"},
  {Make:"Tesla",Model:"Model S (90D)",Name:"Tesla Model S (90D)"},
  {Make:"Tesla",Model:"Model X (208)",Name:"Tesla Model X (208)"},
  {Make:"Tesla",Model:"Model X (250)",Name:"Tesla Model X (250)"},
  {Make:"Kia",Model:"Soul EV",Name:"Kia Soul EV"},
  {Make:"BYD",Model:"e6",Name:"BYD e6"},
  {Make:"Mahindra",Model:"e2o",Name:"Mahindra e2o"},
  {Make:"Renault",Model:"Zoe ZE",Name:"Renault Zoe ZE"}
]
      
// --------------------------------------------------------┤ MAKE CAR SELECT BOXES
var selMake = cars.map(function (car, index, array) {
  return car.Make; 
});

selMake.sort();
var carOptions = Array.from( new Set(selMake));
carOptions.forEach(function(c, i){
  $('#carMake').append('<option value="'+c+'">'+c+'</option>');
});

$('document').ready(function(){
  $('#saveCar').click(function(){
    thisCar.carDetails = {
          make: $('#carMake').val(),
          model: $('#carModel').val()
    };
    if(offline == true){
      saveCar(thisCar)
    }else{
      emit('setCar', thisCar);
    }
  });

  $('#carMake').change(function(){
        var tMod = $('#carMake').val();
        $('#carModel').empty().prop('disabled', false);
        $('#saveCar').prop('disabled', false);
        cars.forEach(function(c,i){
              if(c.Make == tMod){
                    $('#carModel').append('<option value="'+c.Model+'">'+c.Model+'</option>');
              }
        })
  });
});

// --------------------------------------------------------┤ LISTEN FOR SUCCESSFUL SAVE
// on('carSaved', function(car){
//     saveCar(car);
// });      

var saveCar = function(car){
    thisCar = car;
    updateDetails();
    Cookies.set('thisCar', JSON.stringify(thisCar));
    $("#car").slideUp("slow", function(){
      $("#input").slideDown("slow")
    })
    $( "body" ).animate({
      backgroundColor: "#336666",
    }, 1000 );
}