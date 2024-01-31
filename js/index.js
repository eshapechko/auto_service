const form = document.querySelector('form');
const formFieldsets = document.querySelectorAll('.form__fieldset');
const formBtnPrev = document.querySelector('.form__btn_prev');
const formBtnNext = document.querySelector('.form__btn_next');
const formBtnSubmit = document.querySelector('.form__btn_submit');

const URL = 'https://gelatinous-meadow-shrimp.glitch.me/api';

let currentStep = 0;

const updateFieldsetVisibility = () => {
  formFieldsets.forEach((item, i) => {
    if (currentStep === i) {
      item.classList.add('form__fieldset_active');
    } else {
      item.classList.remove('form__fieldset_active');
    }
  });

  if (currentStep === 0) {
    formBtnPrev.style.display = 'none';
    formBtnNext.style.display = '';
    formBtnSubmit.style.display = 'none';
  } else if (currentStep === formFieldsets.length - 1) {
    formBtnPrev.style.display = '';
    formBtnNext.style.display = 'none';
    formBtnSubmit.style.display = '';
  } else {
    formBtnPrev.style.display = '';
    formBtnNext.style.display = '';
    formBtnSubmit.style.display = 'none';
  }
};

const init = () => {
  formBtnNext.addEventListener('click', () => {
    if (currentStep < formFieldsets.length - 1) {
      currentStep += 1;
      updateFieldsetVisibility();
      formBtnNext.disabled = true;
      formBtnSubmit.disabled = true;
    }
  });

  formBtnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep -= 1;
      updateFieldsetVisibility();
      formBtnNext.disabled = false;
    }
  });

  updateFieldsetVisibility();

  formBtnSubmit.addEventListener('click', () => {});
};

init();
