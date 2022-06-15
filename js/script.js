// FOCUS ON FIRST FIELD BY DEFAULT
const defaultFocus = document.getElementById('name').focus();

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
    if (event.target.value === color.getAttribute('data-theme')) {
      color.style.display = 'block';
    } else {
      color.style.display = 'none';
    }
  });
});
