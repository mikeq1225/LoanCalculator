document.getElementById("loan-form").addEventListener("submit", function (e) {
	e.preventDefault()
	// Hide results
	document.getElementById("results").style.display = "none"

	// Show loading gif
	document.getElementById("loading").style.display = "block"
	setTimeout(calcResults, 2000)
})

function calcResults(e) {
	const amount = document.getElementById("amount")
	const interest = document.getElementById("interest")
	const years = document.getElementById("years")
	const monthlyPayment = document.getElementById("monthly-payment")
	const total = document.getElementById("total-payment")
	const totalInterest = document.getElementById("total-interest")

	const principle = parseFloat(amount.value)
	const calculatedInterest = parseFloat(interest.value) / 100 / 12
	const calculatedPayments = parseFloat(years.value) * 12

	// Monthly payments
	const x = Math.pow(1 + calculatedInterest, calculatedPayments)
	const monthly = (principle * x * calculatedInterest) / (x - 1)

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2)
		total.value = (monthly * calculatedPayments).toFixed(2)
		totalInterest.value = (monthly * calculatedPayments - principle).toFixed(2)
		document.getElementById("results").style.display = "block" // Show results
		document.getElementById("loading").style.display = "none" // Hides loading gif
	} else {
		showError("Please Check your numbers")
	}
}

function showError(error) {
	document.getElementById("results").style.display = "none" // Hides results during error
	document.getElementById("loading").style.display = "none" // Hides loading gif during error
	const errorDiv = document.createElement("div")
	errorDiv.className = "alert alert-danger" // Adds red error classes
	errorDiv.appendChild(document.createTextNode(error)) // Creates text node to append to errorDiv
	const card = document.querySelector(".card")
	const heading = document.querySelector(".heading")
	card.insertBefore(errorDiv, heading) //Inserts error above heading
	setTimeout(() => {
		document.querySelector(".alert").remove()
	}, 3000)
}
