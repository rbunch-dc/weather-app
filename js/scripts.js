$(document).ready(function(){

	var apiKey = 'e312dbeb8840e51f92334498a261ca1d';
	var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid='+apiKey;

	$.getJSON(weatherURL, function(weatherData){
		// console.log(weatherData);
		//we want the temperature for starters. The temperature in their JSON is at:
		//weatherData.main.temp
		var currTemp = weatherData.main.temp;
		// console.log(currTemp);

		var canvas = $('#current-temp');
		var context = canvas[0].getContext('2d');

		//Set up our circle and styling
		//Set up our color based on temp (colder = bluer, hotter = redder)
		var currPerc = 0;

		var shadeColor;
		if(currTemp < 32){
			shadeColor = '#D4F0FF';
		}else if((currTemp >= 32) && (currTemp < 59)){
			shadeColor = "#129793";
		}else if((currTemp >= 59) && (currTemp < 75)){
			shadeColor = "#7cfc00";
		}else if((currTemp >= 75) && (currTemp < 90)){
			shadeColor = "#FF6600";
		}else{
			shadeColor = '#E3170D';
		}

		//set up an animate function.
		//update the appropriate variables.

		function animate(current){
		//Draw the inner circle
			context.fillStyle = "#ccc";
			context.beginPath();
			context.arc(155,75,65,0,2*Math.PI);
			context.closePath();
			context.fill();

		//Draw the outter arc/line
			//Set the linewidth
			context.lineWidth = 10;
			//Set the line color
			context.strokeStyle = shadeColor;
			//Tell JS we are ready to draw
			context.beginPath();
			//Center of the circle at 155, 75
			//Radius of the circle is 70px
			//Start the draw at -Math.PI/2
			//Draw to the full circle * % we are at, and add 1.5PI, so that we start at 12:00
			context.arc(155, 75, 70, Math.PI*1.5, (Math.PI*2 * current) + Math.PI*1.5 );
			//Draw! 
			context.stroke();

			//Set the font of our temperature
			context.font = "48px Myriad Pro";
			//Set the font color of our temp to blue
			context.fillStyle = "#0000ff";
			context.textBaseLine = "bottom";
			context.fillText(currTemp, 175-70, (85-70)*6);
			//Increase from 0 to 1% the first time
			currPerc++;
			if(currPerc < currTemp){
				requestAnimationFrame(function(){
					animate(currPerc / 100);
				});
			}
		}
		animate();
	});
});










