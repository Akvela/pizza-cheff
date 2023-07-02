const initialCards = [ 
  { name: 'Мясная Делюкс', composition : 'Пепперони, лук, бекон, томатная паста, колбаски, перец, грибы, соус чили, ананасы' }, 
  { name: 'Морская Премиум', composition : 'Перец, сыр, креветки, кальмары, мидии, лосось' },
  { name: 'Бекон и Сосиски', composition : 'Бекон, сыр, сосиски, ананас, томатная паста' },
  { name: 'Куриная Делюкс', composition : 'Курица, ананас, сыр Пепперони, соус для пиццы, томатная паста' },
  { name: 'Барбекю Премиум', composition : 'Свинина BBQ, соус Барбкею, сыр, курица, соус для пиццы, соус чили' },
  { name: 'Пепперони Дабл', composition : 'Пепперони, сыр, колбаса 2 видов: обжаренная и вареная' },
  { name: 'Куриное трио', composition : 'Жареная курица, Тушеная курица, Куриные наггетсы, перец, сыр, грибы, соус для пиццы' },
  { name: 'Сырная', composition : 'Сыр Джюгас, Сыр с плесенью, Сыр Моцарелла, Сыр секретный' },
];

const cardsContainer = document.querySelector('.cards__gallery'); 
const cardTemplate = document.querySelector('#card').content; 
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

function createCard(name, composition, index) { 
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  
  const cardPhoto = cardElement.querySelector('.card__photo'); 
  const cardName = cardElement.querySelector('.card__name'); 
  const cardInfo = cardElement.querySelector('.card__composition'); 
  
  cardPhoto.src = `../images/layer-${index}.png`; 
  cardPhoto.alt = 'Пицца ' + name; 
  cardName.textContent = name; 
  cardInfo.textContent = composition;
  
  cardPhoto.addEventListener('click', showPhoto); 
  
  return cardElement; 
}; 

const newCards = initialCards.map(function(item, index) { 
  return createCard(item.name, item.composition, index+2); 
}); 
cardsContainer.prepend(...newCards); 

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
