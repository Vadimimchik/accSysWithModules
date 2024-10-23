function setCurrentDateTime() {
	const now = new Date();
	const dateOptions = { year: "numeric", month: "long", day: "numeric" };
	const currentDate = now.toLocaleDateString(undefined, dateOptions);

	const timeOptions = { 
		hour: "2-digit", 
		minute: "2-digit", 
		hour12: false
	};
	const currentTime = now.toLocaleTimeString(undefined, timeOptions);

	const currentDateElement = document.getElementById("currentDateTime");
	currentDateElement.textContent = `${currentDate} ${currentTime}`;
}

// // показати календар(не запрацювало)
// document.getElementById("dateHeader").addEventListener("click", function() {
// 	$("#dateInput").focus();
// });
