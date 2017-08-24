$('document').ready(function(){
	// updateDetails();
	$('#saveInputs').click(function(){
		if(!thisCar.current){
			thisCar.current = {
				arrDate : new Date().toISOString()
			};

		}
		if(thisCar.current.retDate != $('#returnTime').val() || thisCar.current.chargePerc != $('#chargePerc').val()){
			thisCar.current.retDate = (new Date($('#returnTime').val())).toISOString()
			thisCar.current.chargePerc = $('#chargePerc').val();
			$('#resDate').html(moment(thisCar.current.retDate).format('HH:mm dd DD/MM/YYYY'))
			$('#resCharge').html(thisCar.current.chargePerc+'%')
			$('#thisCar').html(thisCar.car.make + ' ' + thisCar.car.model);
			if(!chartData.target.charge || !chartData.predicted.charge){
				$('#chartLoading').show();
				$('#myChart').hide();
			}else{
				$('#chartLoading').hide();
				$('#myChart').show();
			}
			currData = null;
			updateDetails(function(){
				transition('inputs', 'results', '333');
			});
		}else{
			transition('inputs', 'results', '333');
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
var chart
function updateChart(){
	if(!chartData.target.charge || !chartData.predicted.charge){
		$('#chartLoading').show();
		$('#myChart').hide();
		return false;
	}else{
		$('#chartLoading').hide();
		$('#myChart').show();
	}
	// console.log(chartData)
	// $('#graph').html('');
	var ctx = document.getElementById('myChart').getContext('2d');
	if(!chart){
		// console.log('new chart')
		chart = new Chart(ctx, {
			type: 'bar',
			responsive: true,
				maintainAspectRatio: false,
			data: {
					labels: ['Charge (%)'],
					datasets: [
						{
							type: 'bar',
							label: 'Target',
							backgroundColor: "#336666",
							data: [chartData.target.charge],
						}, {
							type: 'bar',
							label: 'Projected',
							backgroundColor: "#66cccc",
							data: [chartData.predicted.charge]
						},
						{
							type: 'bar',
							label: 'Current',
							backgroundColor: "rgba(255,255,255,1)",
							data: [chartData.current.charge]
						}
					]
				},
				options: {
					scales: {
						xAxes: [{
							stacked: false
						}],
						yAxes: [{
							stacked: false,
							ticks: {
								suggestedMin: 0,
								suggestedMax: 100
						}
						}]
					}
				}
			});  
		}else{
			// console.log(chart.data)
			chart.data.datasets[0].data[0] = chartData.target.charge*1
			chart.data.datasets[1].data[0] = chartData.predicted.charge*1
			chart.data.datasets[2].data[0] = chartData.current.charge*1
			chart.update();
			// console.log(chart.data)
		}
}

function updateDetails(callback){
	if(!offline){
	// --------------------------------------------------------┤ THE USER HAS UPDATED AN ALREADY RUNNING JOURNEY
	}else{
		// --------------------------------------------------------┤ THIS IS A NEW JOURNEY
		emit('user/updateActivity',thisCar).then(function(res){
			setInterval(checkUpdate, 20000);
			callback();
		})
	}
	// $('#resDate').html($('#returnTime').val());
	// $('#resCharge').html($('#chargePerc').val()+'%');
	// $('#resCost').html('< £'+$('#costSel').val());
	// $('#thisCar').html(thisCar.carDetails.make +' ' +thisCar.carDetails.model);
	// updateChart();
}