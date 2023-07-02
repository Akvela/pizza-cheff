const popupPhoto = document.querySelector('#popup-image'); 
const popupSubmit = document.querySelector('#popup-submit'); 
const popupUrl = document.querySelector('.popup__image'); 
const popupName = document.querySelector('.popup__name'); 
let activePopup = document.querySelector('.popup_opened'); 
const buttonEscKeyCode = 27; 
const formSubmit = document.querySelector('[name="popupSubmit"]');
const links = document.querySelectorAll('a[href^="#"]');

function showPhoto(event) { 
  popupUrl.src = event.target.src; 
  popupUrl.alt = event.target.alt; 
  popupName.textContent = event.target.alt; 
  openPopup(popupPhoto); 
}; 

const images = document.querySelectorAll('.card__photo');
images.forEach((item) => {
  item.addEventListener('click', showPhoto); 
})

function closePopup(popup) { 
  document.removeEventListener('keydown', handleEscUp); 
  popup.removeEventListener('click', handleClickOverlay); 
  popup.classList.remove('popup_opened'); 
};

const handleEscUp = (evt) => { 
  if (evt.keyCode == buttonEscKeyCode) { 
    evt.preventDefault(); 
    closePopup(activePopup); 
  }; 
}; 

const handleClickOverlay = (evt) => { 
  activePopup = document.querySelector('.popup_opened'); 

  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__exit-button')) { 
    closePopup(activePopup); 
  }; 
}; 

function openPopup(popup) { 
  popup.classList.add('popup_opened'); 
  document.addEventListener('keydown', handleEscUp); 
  popup.addEventListener('click', handleClickOverlay); 
}; 

function sendMail(e) {
  e.preventDefault()
  const name = document.getElementById('name').value
  const adress = document.getElementById('adress').value
  const phone = document.getElementById('phone').value

  fetch('https://example.com',
    {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        adress: adress,
        phone: phone
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
    })
    .catch(() => console.log('ошибка отправления'));

    openPopup(popupSubmit);
    formSubmit.reset();
}

formSubmit.addEventListener('submit', sendMail); 

links.forEach(item => item.addEventListener('click',
 function(e) {
	e.preventDefault();
	const id = item.getAttribute('href').slice(1);

	document.getElementById(id).scrollIntoView({
		behavior: 'smooth',
		block: 'start'
	});
}));
