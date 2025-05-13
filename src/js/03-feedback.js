import throttle from 'lodash.throttle';

const form = document.querySelector('form.feedback-form');
const emailEL = form.elements.email;
const messageEL = form.elements.message;

const STORAGE_KEY = 'feedback-form-state';

onPageReload();

function onPageReload() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    emailEL.value = savedMessage.email || '';
    messageEL.value = savedMessage.message || '';
  }
}

function onFormInput() {
  const email = emailEL.value;
  const message = messageEL.value;

  const formData = {
    email,
    message,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e) {
  e.preventDefault();

  const email = emailEL.value.trim();
  const message = messageEL.value.trim();

  if (email === '' || message === '') {
    alert('Please enter both email and message.');
    return;
  }

  console.log({ email, message });
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
}
form.addEventListener('submit', onFormSubmit);
