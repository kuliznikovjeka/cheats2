'use strict';

const btns = document.querySelectorAll('.content-box__item-subscribe');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal');
const modalClose = document.querySelectorAll('.modal__close');

function openModal() {
	btns.forEach((btn) => {

		btn.addEventListener('click', (e) => {
			let path = e.currentTarget.getAttribute('data-path');

			modals.forEach((el) => {
				el.classList.remove('modal__visible');
			})

			document.querySelector(`[data-target="${path}"]`).classList.add('modal__visible');
			modalOverlay.classList.add('modal-overlay__visible');
			renderModal(path);
		});

	});
}
openModal();

function closeModal() {
	modalOverlay.addEventListener('click', (e) => {

		modalClose.forEach((close) => {
			if (e.target == modalOverlay || e.target == close) {
				modalOverlay.classList.remove('modal-overlay__visible');

				// Удаляем созданные параграфы
				createdParagraphs.forEach(paragraph => {
					if (paragraph && paragraph.parentNode) {
						paragraph.parentNode.removeChild(paragraph);
					}
				});


				modals.forEach((el) => {
					el.classList.remove('modal__visible');
				});

				modalBtnsClicked = false;
			}

		})

	});
}
closeModal();

const modalValidation = document.querySelectorAll('.modal__validation');
const promoInput = document.querySelectorAll('.modal__input');
const addPromo = document.querySelectorAll('.modal__add-promo'); //кнопка применения скидки
const modalPriceEdit = document.querySelectorAll('.modal__price_edit');

const modalBtns = document.querySelectorAll('.modal__btn'); // Кнопка "купить" в popap

const promoOne = 'edsdiscount';
const salesmanOne = 'itsyaboied_';
const discountOne = 0.90;

const promoTwo = 'Poutune';
const salesmanTwo = 'lovusk';
const discountTwo = 0.95;

const gratitude = 'Cпасибо за покупку!'

function makeDisount() {

	btns.forEach((btn) => {

		btn.addEventListener('click', (e) => {
			let path = e.currentTarget.getAttribute('data-path');
			let currentprice = document.querySelector(`[data-price="${path}"]`).innerHTML;
			addPromo.forEach((promo) => {
				promo.addEventListener("click", (e) => {

					promoInput.forEach((el) => {

						if (el.value == promoOne) {
							modalPriceEdit.forEach((price) => {
								let totalPrice = +currentprice * discountOne;
								price.innerHTML = totalPrice.toFixed(2) + ' €';
							});

							modalValidation.forEach((el) => {
								el.classList.add('_done')
								el.classList.remove('_error')
								el.innerHTML = 'Промокод применён';
							});

						} else if (el.value == promoTwo) {
							modalPriceEdit.forEach((price) => {
								let totalPrice = +currentprice * discountTwo;
								price.innerHTML = totalPrice.toFixed(2) + ' €';
							});

							modalValidation.forEach((el) => {
								el.classList.add('_done')
								el.classList.remove('_error')
								el.innerHTML = 'Промокод применён';
							});
						} else if (el.value != '' && el.value != promoOne && el.value != promoTwo) {
							modalValidation.forEach((el) => {
								el.classList.add('_error');
								el.classList.remove('_done');
								el.innerHTML = 'Такого промокода не существует';
							});
						}

					})

				});
			})

		});

	});


}
makeDisount();

let createdParagraphs = [];  // Массив для хранения созданных параграфов
let modalBtnsClicked = false; // Флаг для отслеживания кликов

function showGratitudeMessage() {
	if (!modalBtnsClicked) {
		modalBtnsClicked = true;

		modalBtns.forEach((btn, index) => {
			const promoValue = promoInput[index].value.trim();
			let gratitudeText;

			if (promoValue === promoOne) {
				gratitudeText = `<span style=" display: inline-block; margin-top: 15px; font-size: 18px; font-weight: 700; color: #6efdfa;">${salesmanOne}</span> - аккаунт Discord для оплаты/связи`;
			} else if (promoValue === promoTwo) {
				gratitudeText = `<span style=" display: inline-block; margin-top: 15px; font-size: 18px; font-weight: 700; color: #6efdfa;">${salesmanTwo}</span> - аккаунт Discord для оплаты/связи`;
			} else {
				let randomPromo;
				if (Math.random() < 0.5) {
					randomPromo = salesmanOne;
				} else {
					randomPromo = salesmanTwo;
				}
				gratitudeText = `<span style=" display: inline-block; margin-top: 15px; font-size: 18px; font-weight: 700; color: #6efdfa;">${randomPromo} </span> - аккаунт Discord для оплаты/связи`;
			}

			// Создаем два параграфа с текстом "спасибо"
			const p1 = document.createElement('p');
			p1.textContent = 'Спасибо за покупку!';
			p1.style.cssText = `display: inline-block; margin-top: 10px; font-size: 14px;`

			const p2 = document.createElement('p');
			p2.innerHTML = gratitudeText;

			// Вставляем параграфы после кнопок внутри соответствующего модального окна
			const modal = modals[index];
			modalBtns[index].insertAdjacentElement('afterend', p1);
			modalBtns[index].insertAdjacentElement('afterend', p2);

			// Добавляем созданные параграфы в массив
			createdParagraphs.push(p1, p2);
		});
	}
}

modalBtns.forEach((el) => {
	el.addEventListener('click', showGratitudeMessage);
});


function renderModal(price) {
	promoInput.forEach((el) => {
		el.value = '';
	});

	let modalPrice = document.querySelector(`[data-price="${price}"]`).innerHTML;

	modalPriceEdit.forEach((el) => {
		el.innerHTML = modalPrice + '€';
	})

	modalValidation.forEach((el) => {
		el.innerHTML = '';
	})
}
