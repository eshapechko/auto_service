import { fetchData } from './fetchData.js';

const form = document.querySelector('form');
const formBtnPrev = document.querySelector('.form__btn_prev');
const formBtnNext = document.querySelector('.form__btn_next');
const formBtnSubmit = document.querySelector('.form__btn_submit');
const formTime = document.querySelector('.form__time');
const formFieldsetType = document.querySelector('.form__fieldset_type');
const formFieldsetDate = document.querySelector('.form__fieldset_date');
const formFieldsetClient = document.querySelector('.form__fieldset_client');
const formFieldsets = [formFieldsetType, formFieldsetDate, formFieldsetClient];
const typeRadioWrapper = document.querySelector('.form__radio-wrapper_type');
const dayRadioWrapper = document.querySelector('.form__radio-wrapper_day');
const timeRadioWrapper = document.querySelector('.form__radio-wrapper_time');
const formMonthsWrapper = document.querySelector('.form__months');
const formInfoType = document.querySelector('.form__info_type');
const formInfoData = document.querySelector('.form__info-data');
const currentMonth = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(
  new Date(),
);
let month = currentMonth;

let currentStep = 0;
const data = await fetchData();
console.log('data: ', data);
const dataToWrite = {
  dataType: {},
  day: '',
  time: '',
};

const createRadioBtns = (wrapper, name, data) => {
  wrapper.textContent = '';

  data.forEach((item) => {
    const radioDiv = document.createElement('div');
    radioDiv.className = 'radio';

    const radioInput = document.createElement('input');
    radioInput.className = 'radio__input';
    radioInput.type = 'radio';
    radioInput.name = name;
    radioInput.id = item.value;
    radioInput.value = item.value;

    const radioLabel = document.createElement('label');
    radioLabel.className = 'radio__label';
    radioLabel.htmlFor = item.value;
    radioLabel.textContent = item.title;

    radioDiv.append(radioInput, radioLabel);
    wrapper.append(radioDiv);
  });
};

const allMonth = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

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

const createFormTime = () => {
  formTime.style.display = 'block';
};

const handleInputForm = ({ currentTarget, target }) => {
  if (currentTarget.type.value && currentStep === 0) {
    formBtnNext.disabled = false;
  }

  if (currentStep === 1) {
    if (currentTarget.day.value && target.name === 'day') {
      createFormTime();
    }

    if (
      currentTarget.day.value &&
      currentTarget.time.value &&
      target.name === 'time'
    ) {
      formBtnNext.disabled = false;
    } else {
      formBtnNext.disabled = true;
    }
  }

  if (currentStep === 2) {
    const inputs = formFieldsetClient.querySelectorAll('.form__input');

    let allFilled = true;

    inputs.forEach((input) => {
      if (input.value.trim() === '') {
        allFilled = false;
      }
    });

    formBtnSubmit.disabled = !allFilled;
  }
};

const renderTypeFieldset = () => {
  const typeData = data.map((item) => ({
    value: item.type,
    title: item.title,
  }));

  createRadioBtns(typeRadioWrapper, 'type', typeData);
};

const init = () => {
  formBtnNext.disabled = true;

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

  form.addEventListener('input', handleInputForm);

  updateFieldsetVisibility();
  renderTypeFieldset();
};

init();
