// FOCUS ON FIRST FIELD BY DEFAULT
const defaultFocus = document.getElementById('name').focus();

// FOCUS STATE ON ACTIVITY CHECKBOXES
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach((checkbox, i) => {
  checkbox.addEventListener('focus', (event) => {
    event.target.parentElement.classList.add('focus');
  });

  checkbox.addEventListener('blur', (event) => {
    event.target.parentElement.classList.remove('focus');
  });
});


// DISPLAYS 'OTHER' JOB ROLE INPUT
const jobRoles = document.getElementById('title');
const otherRole = document.getElementById('other-job-role');

otherRole.style.display = 'none';

jobRoles.addEventListener('change', (event) => {
  if (event.target.value === 'other') {
    otherRole.style.display = 'block';
  } else {
    otherRole.style.display = 'none';
  }
});

// ALLOWS USER TO CHOOSE A COLOR OPTION BASED ON THEIR DESIGN CHOICE
const colorList = document.getElementById('color');
const colors = document.querySelectorAll('#color option');
const designList = document.getElementById('design');

colorList.disabled = true;

designList.addEventListener('change', (event) => {
  colorList.disabled = false;

  colors.forEach( color => {
    if (designList.value === color.getAttribute('data-theme')) {
      color.style.display = 'block';
    } else {
      color.style.display = 'none';
    }

    if (designList.value === 'js puns') {
      colors[1].selected = true;
    } else if (designList.value === 'heart js') {
      colors[4].selected = true;
    }
  });
});

// PREVENTS DOUBLE BOOKING & TOTALS COST OF ACTIVITIES
const activities = document.getElementById('activities');
const costElement = document.getElementById('activities-cost');

let totalCost = 0;

function handleActivities(e, status) {
  for(const element of checkboxes) {
    const dateAndTime = element.getAttribute('data-day-and-time');
    if (e.target.getAttribute('data-day-and-time') === dateAndTime) {
      if (e.target.name !== element.name) {
        element.disabled = status;
      }
    }
  }
}

activities.addEventListener('change', (event) => {
  const eventCost = +event.target.getAttribute('data-cost');

  if (event.target.checked) {
    totalCost = totalCost + eventCost;

    handleActivities(event, true);
  } else if (!event.target.checked) {
    totalCost = totalCost - eventCost;

    handleActivities(event, false);
  }

  costElement.innerHTML = `Total: $${totalCost}`;
});

// ALLOWS USERS TO SELECT A PAYMENT OPTION
const paymentOptions = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitCoin = document.getElementById('bitcoin');

paymentOptions.value = 'credit-card';

paypal.style.display = 'none';
bitCoin.style.display = 'none';

paymentOptions.addEventListener('change', (event) => {
  if (event.target.value === 'credit-card') {
    creditCard.style.display = 'block';
    paypal.style.display = 'none';
    bitCoin.style.display = 'none';
  } else if (event.target.value === 'paypal') {
    paypal.style.display = 'block';
    creditCard.style.display = 'none';
    bitCoin.style.display = 'none';
  } else if (event.target.value === 'bitcoin') {
    bitCoin.style.display = 'block';
    paypal.style.display = 'none';
    creditCard.style.display = 'none';
  }
});

// EMAIL VALIDATION 'HELPER'
const emailInput = document.getElementById('email');
const emailAt = '@';

function emailValidator() {
  const emailValue = emailInput.value;
  const validEmail = /^[^@]+@[^@.]+\.[a-z]+$/.test(emailValue);
  return validEmail;
}

// FORM VALIDATION
const form = document.querySelector('form');

const nameInput = document.getElementById('name');

const creditInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');

form.addEventListener('submit', (event) => {

  // Function to Check the Validity of a Section
  function checkField(field, regexp) {
    const input = field.value;
    const valid = regexp.test(input);

    if (valid) {
      field.parentElement.classList.add('valid');
      field.parentElement.classList.remove('not-valid');
      field.parentElement.lastElementChild.style.display = 'none';
    } else {
      event.preventDefault();
      field.parentElement.classList.add('not-valid');
      field.parentElement.classList.remove('valid');
      field.parentElement.lastElementChild.style.display = 'block';
    }
  }

  // Basic Info Section
  checkField(nameInput, /^.+$/);
  if (emailValidator()) {
    emailInput.parentElement.classList.add('valid');
    emailInput.parentElement.classList.remove('not-valid');
    emailInput.parentElement.lastElementChild.style.display = 'none';
  } else {
    event.preventDefault();
    emailInput.parentElement.classList.add('not-valid');
    emailInput.parentElement.classList.remove('valid');
    emailInput.parentElement.lastElementChild.innerHTML = 'Please enter a valid email address';

    if (!emailInput.value.includes(emailAt)) {
      emailInput.parentElement.lastElementChild.innerHTML = 'Email must contain one @';
    }

    emailInput.parentElement.lastElementChild.style.display = 'block';
  }

  // Activities Section
  if (totalCost === 0) {
    activities.classList.add('not-valid');
    activities.classList.remove('valid');
  } else {
    activities.classList.add('valid');
    activities.classList.remove('not-valid');
  }

  // Payment Section
  if (paymentOptions.value === 'credit-card') {
    checkField(creditInput, /^\d{13,16}$/);
    checkField(zipInput, /^\d{5}$/);
    checkField(cvvInput, /^\d{3}$/);
  } else {
    activities.classList.add('valid');
    activities.classList.remove('not-valid');
  }
});

// REAL TIME EMAIL VALIDATION
emailInput.addEventListener('keyup', () => {
  if (emailValidator()) {
    emailInput.parentElement.classList.add('valid');
    emailInput.parentElement.classList.remove('not-valid');
    emailInput.parentElement.lastElementChild.style.display = 'none';
  } else {
    event.preventDefault();
    emailInput.parentElement.classList.add('not-valid');
    emailInput.parentElement.classList.remove('valid');
    emailInput.parentElement.lastElementChild.innerHTML = 'Please enter a valid email address';

    if (!emailInput.value.includes(emailAt)) {
      emailInput.parentElement.lastElementChild.innerHTML = 'Email must contain one @';
    }

    emailInput.parentElement.lastElementChild.style.display = 'block';
  }
});
