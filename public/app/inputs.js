$('document').ready(function(){
	// updateDetails();
	$('#saveInputs').click(function(){
		if(!thisCar.current){
			thisCar.current = {
				arrDate : new Date().toISOString()
			};

		}
		if(thisCar.current.depDate != $('#returnTime').val() || thisCar.current.chargePerc != $('#chargePerc').val()){
			thisCar.current.depDate = (new Date($('#returnTime').val())).toISOString()
			thisCar.current.chargePerc = $('#chargePerc').val();
			updateDetails(function(){
				transition('results', 'inputs', '333');
			});
		}else{
			transition('results', 'inputs', '333');
		}

	});

	$('#editInputs').click(function(){
		transition('results', 'inputs', '336666');
	});

	$('#editCar').click(function(){
		transition('input', 'car', '478e8e');
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

function updateDetails(callback){
	if(!offline){
	// --------------------------------------------------------┤ THE USER HAS UPDATED AN ALREADY RUNNING JOURNEY
	}else{
		// --------------------------------------------------------┤ THIS IS A NEW JOURNEY
		emit('user/updateActivity',thisCar).then(function(res){
			callback();
		})
	}
	// $('#resDate').html($('#returnTime').val());
	// $('#resCharge').html($('#chargePerc').val()+'%');
	// $('#resCost').html('< £'+$('#costSel').val());
	// $('#thisCar').html(thisCar.carDetails.make +' ' +thisCar.carDetails.model);
	// updateChart();
}