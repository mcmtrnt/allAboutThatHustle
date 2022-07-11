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
      Email.send({
        Host: "smtp.gmail.com",
        Username : "alpinexcemail@gmail.com",
        Password : "qdqmdjraboftcbbu", //AlpineXC1$
        To : 'mcmtrnt3@gmail.com',  
        From : "alpinexcemail@gmail.com",
        Subject : "All About That Hustle Newsletter Signup",
        Body : document.getElementById('email-input').value + "     From: " + document.getElementById('email-input').value ,
      })
      .then(function(message){
          document.getElementById('email-input').value = "";
          document.getElementById('signup-error').style.display = "none";
          signupoff();
          // window.location.href = "confirmation.html";
      });
  
    }
    else {
        // signupoff();
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