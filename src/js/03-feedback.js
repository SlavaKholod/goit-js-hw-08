import trottle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const inputEl = formEl.elements;

formEl.addEventListener('input', trottle(formInput, 500));
formEl.addEventListener('submit', formSubmit);

const FEEDBACK = 'feedback-form-state';
updateInput();

function formInput() {
  let email = inputEl['email'].value;
  let message = inputEl['message'].value;
  localStorage.setItem(
    FEEDBACK,
    JSON.stringify({ email: email, message: message })
  );
}

function formSubmit(evt) {
  evt.preventDefault();
  const formObj = JSON.parse(localStorage.getItem(FEEDBACK));
  console.log(formObj);
  localStorage.clear();
  formEl.reset();
}

function updateInput() {
  if (localStorage.getItem(FEEDBACK)) {
    const feedback = JSON.parse(localStorage.getItem(FEEDBACK));
    inputEl['email'].value = feedback.email;
    inputEl['message'].value = feedback.message;
  }
}
