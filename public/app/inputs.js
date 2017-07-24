$('document').ready(function(){
	// updateDetails();
	$('#saveInputs').click(function(){
		updateDetails();
		$('#inputs').hide('slide',{direction:'up'});
		$( "body" ).animate({
	      backgroundColor: "#333",
	    }, 1000 );
	});

	$('#editInputs').click(function(){
		$('#inputs').show('slide',{direction:'up'});
		$( "body" ).animate({
	      backgroundColor: "#336666",
	    }, 1000 );
	});

	$('#editCar').click(function(){
		$("#input").slideUp("slow", function(){
	      $("#car").slideDown("slow")
	    })
	    $( "body" ).animate({
	      backgroundColor: "#478e8e",
	    }, 1000 );
	})
});

// --------------------------------------------------------┤ DRAW CHART

function updateChart(){
	$('#graph').html(' <canvas id="myChart" height="200" width="300" style="display:block;"></canvas>');
	var ctx = document.getElementById('myChart').getContext('2d');
	var chart = new Chart(ctx, {
	type: 'bar',
	responsive: true,
    maintainAspectRatio: false,
	data: {
	    labels: ['Charge (%)', 'Cost (£)'],
	    datasets: [
	      {
	        type: 'bar',
	        label: 'Target',
	        backgroundColor: "#336666",
	        data: [65, 0],
	      }, {
	        type: 'bar',
	        label: 'Projected',
	        backgroundColor: "#66cccc",
	        data: [40, 10]
	      },
	      {
	        type: 'bar',
	        label: 'Current',
	        backgroundColor: "rgba(255,255,255,1)",
	        data: [20, 2]
	      }
	    ]
	  },
	  options: {
	    scales: {
	      xAxes: [{
	        stacked: false
	      }],
	      yAxes: [{
	        stacked: false
	      }]
	    }
	  }
	});  
}

function updateDetails(){
	$('#resDate').html($('#returnTime').val());
	$('#resCharge').html($('#chargePerc').val()+'%');
	$('#resCost').html('< £'+$('#costSel').val());
	$('#thisCar').html(thisCar.carDetails.make +' ' +thisCar.carDetails.model);
	updateChart();
}