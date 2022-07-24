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
