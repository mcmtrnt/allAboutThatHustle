emailjs.init('LlEjWseFWWSRQTKr-');

function onMouseOut(event) {
    // If the mouse is near the top of the window, show the popup
    // Also, do NOT trigger when hovering or clicking on selects
    if (
      event.clientY < 50 &&
      event.relatedTarget == null &&
      event.target.nodeName.toLowerCase() !== 'select') {
      // Remove this event listener
      document.removeEventListener("mouseout", onMouseOut);
  
      // Show the popup
      document.getElementById("signup-modal").style.display = "block";
    }
  }
  
  document.addEventListener("mouseout", onMouseOut);

function signup() {
    console.log(document.getElementById('email-input').value);
    if (isValidEmail(document.getElementById('email-input').value) && isNonEmpty(document.getElementById('email-input'))) {
      console.log('test');
      
      var templateParams = {
        message: document.getElementById('email-input').value
      };

      emailjs.send('service_gntorr9', 'template_2y4riql', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById('email-input').value = "";
        document.getElementById('signup-error').style.display = "none";
        signupoff();
      }, function(error) {
        console.log('FAILED...', error);
        document.getElementById('email-input').value = "";
        document.getElementById('signup-error').style.display = "none";
        signupoff();
      });
  
    }
    else {
        document.getElementById('signup-error').style.display = "block";
        document.getElementById('email-input').style.border = "1px solid rgb(189, 1, 1)";
        document.getElementById('email-input').style.borderRadius = "3px";
    }
  }
  
  function closeSignupModal() {
    document.getElementById('signup-modal').style.display = "none";
  }

  function isValidEmail(text) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 
     return re.test(text);
     }

function isNonEmpty(text) {
    if (text.length == 0 || !text || text == null || text == undefined) {
        return false;
    }
    else {
        return true;
    }
}

function signupon() {
  document.getElementById("signup-modal").style.display = "none";
}
  
function signupoff() {
  document.getElementById("signup-modal").style.display = "none";
}

function calculateFrontEndDti(){
  var mortPmt = document.getElementById('mortgage-pmt').value;
  var hoaFee = document.getElementById('hoa-fee').value;
  var income = document.getElementById('income').value;

  var frontEndDti = ((parseInt(mortPmt) + parseInt(hoaFee)) / income) * 100;

  if (frontEndDti > 0 && frontEndDti != Infinity)
  {
    document.getElementById('front-end-dti-result').innerHTML = Math.round(frontEndDti, 2) + "%";
  }
  else
  {
    document.getElementById('front-end-dti-result').innerHTML = "";
  }
}

function calculateBackEndDti(){
  var mortPmt = document.getElementById('mortgage-pmt').value;
  var hoaFee = document.getElementById('hoa-fee').value;
  var ccPmt = document.getElementById('cc-pmt').value;
  var carPmt = document.getElementById('car-pmt').value;
  var studentLoan = document.getElementById('student-loan').value;
  var childSupport = document.getElementById('child-support').value;
  var income = document.getElementById('income').value;
  var totalDebt = 0

  if (parseInt(mortPmt) > 0) totalDebt += parseInt(mortPmt);
  if (parseInt(hoaFee) > 0) totalDebt += parseInt(hoaFee);
  if (parseInt(ccPmt) > 0) totalDebt += parseInt(ccPmt);
  if (parseInt(carPmt) > 0) totalDebt += parseInt(carPmt);
  if (parseInt(studentLoan) > 0) totalDebt += parseInt(studentLoan);
  if (parseInt(childSupport) > 0) totalDebt += parseInt(childSupport);

  var backEndDti = ((totalDebt) / income) * 100;
  if (backEndDti > 0 && backEndDti != Infinity)
  {
    document.getElementById('back-end-dti-result').innerHTML = Math.round(backEndDti, 2) + "%";
  }
  else
  {
    document.getElementById('back-end-dti-result').innerHTML = "";
  }
}

function calculateDirectCapMethod()
{
  var noi = document.getElementById('noi').value;
  var capRate = document.getElementById('cap-rate').value;

  var propertyValue = parseInt(noi) / parseFloat(capRate / 100);
  if (propertyValue > 0 && propertyValue != Infinity)
  {
    document.getElementById('direct-capitalization-result').innerHTML = "$" + Math.round(propertyValue, 2).toLocaleString('en-US');
  }
  else
  {
    document.getElementById('direct-capitalization-result').innerHTML = "";
  }
}

function calculateCapRate()
{
  var capRateNoi = document.getElementById('cap-rate-noi').value;
  var salesPrice = document.getElementById('sales-price').value;

  var capRate = (parseInt(capRateNoi) / parseInt(salesPrice)) * 100;
  if (capRate > 0 && capRate != Infinity)
  {
    document.getElementById('cap-rate-result').innerHTML = parseFloat(capRate).toFixed(2) + "%";
  }
  else
  {
    document.getElementById('cap-rate-result').innerHTML = "";
  }
}

function calculateInterestPayment()
{
  var mortgageBalance = document.getElementById('mortgage-balance').value;
  var annIntRate = document.getElementById('ann-int-rate').value;

  var interestPmt = parseInt(mortgageBalance) * ((annIntRate / 100) / 12);
  if (interestPmt > 0 && interestPmt != Infinity)
  {
    document.getElementById('interest-payment-result').innerHTML = "$" + parseFloat(interestPmt).toLocaleString('en-US');
  }
  else
  {
    document.getElementById('interest-payment-result').innerHTML = "";
  }
}

function calculateMonthlyPayment()
{
  var loanAmt = document.getElementById('loan-amt').value;
  var loanTerm = (document.getElementById('loan-term').value * 12);
  var monthlyIntRate = ((document.getElementById('annual-int-rate').value / 100) / 12);


  var monthlyPayment = (parseFloat(monthlyIntRate) * parseInt(loanAmt)) / (1 - ((1+parseFloat(monthlyIntRate))**(-parseInt(loanTerm))));
  
  console.log(((1+parseFloat(monthlyIntRate))**(-parseInt(loanTerm))));

  if (isNaN(monthlyPayment) == false && monthlyPayment != Infinity)
  {
    document.getElementById('monthly-payment-result').innerHTML = "$" + parseFloat(monthlyPayment).toLocaleString('en-US');
  }
  else
  {
    document.getElementById('monthly-payment-result').innerHTML = "";
  }
}

