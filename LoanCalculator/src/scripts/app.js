//listen for submit
const form = document.getElementById('loan-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';

    setTimeout(calculateInterest, 1000);

});


function calculateInterest(e) {
    // e.preventDefault();
    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthly_payment = document.getElementById('monthly-payment');
    const total_interest = document.getElementById('total-interest');
    const total_payment = document.getElementById('total-payment');

    //Calculations
    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principle * x * calculatedInterest) / (x - 1);
    if (isFinite(monthly)) {
        monthly_payment.value = monthly.toFixed(3);
        total_payment.value = (monthly * calculatedPayment).toFixed(3);
        total_interest.value = ((monthly * calculatedPayment) - principle).toFixed(3);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';


    } else {
        showError("Please Check your numbers");
        console.log('please check the numbers');
    }
    console.log("In calcuale method");

}


function showError(pleaseCheckYourNumbers) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'none';

//    Get elements
    const card = document.querySelector('.card');
    const header = document.querySelector('.heading');
//    Create div element
    const div = document.createElement('div');
    div.className = 'alert alert-danger';
    div.textContent = pleaseCheckYourNumbers;
    card.insertBefore(div, header);

    //Do this after 3 seconds
    setTimeout(disapperDiv, 3000);


}

function disapperDiv() {
    const divElement = document.querySelector(".alert");
    divElement.remove();
}

