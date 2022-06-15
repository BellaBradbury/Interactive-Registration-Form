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
