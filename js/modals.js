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
		});

	});
}
openModal();

function closeModal() {
	modalOverlay.addEventListener('click', (e) => {

		modalClose.forEach((close) => {
			if (e.target == modalOverlay || e.target == close) {
				modalOverlay.classList.remove('modal-overlay__visible');

				renderModal();

				modals.forEach((el) => {
					el.classList.remove('modal__visible');
				});
			}

		})

	});
}
closeModal();

const modalValidation = document.querySelectorAll('.modal__validation');
const promoInput = document.querySelectorAll('.modal__input');
const addPromo = document.querySelectorAll('.modal__add-promo'); //кнопка применения скидки
const modalPriceEdit = document.querySelectorAll('.modal__price_edit');

const modalBtns = document.querySelectorAll('.modal__btn');
const urls = ['https://www.google.com/', 'https://vk.com/'];

function makeDisount() {

	addPromo.forEach((promo) => {
		promo.addEventListener("click", () => {

			promoInput.forEach((el) => {

				if (el.value == '1' || el.value == '2') {
					modalPriceEdit.forEach((price) => {
						price.innerHTML = '300р'
					});
					modalValidation.forEach((el) => {
						el.classList.add('_done')
						el.classList.remove('_error')
						el.innerHTML = 'Промокод применён';
					});
				} else if (el.value != '' && el.value != '1' && el.value != '2') {
					modalValidation.forEach((el) => {
						el.classList.add('_error');
						el.classList.remove('_done');
						el.innerHTML = 'Такого промокода не существует';
					});
				}

			})

		});
	})
}
makeDisount();

function changeUrl() {
	promoInput.forEach((el, index) => {
		const promoValue = el.value.trim();

		let selectedUrl;
		if (promoValue == '1') {
			selectedUrl = urls[0];
		} else if (promoValue == '2') {
			selectedUrl = urls[1];
		} else if (promoValue == '' || promoValue != '1' || promoValue != '2') {
			// Промокод не равен '1' или '2', подставляем случайную ссылку
			const randomNumber = Math.floor(Math.random() * 2);
			selectedUrl = urls[randomNumber];
		}

		// Перенаправляем пользователя на выбранный URL для соответствующей кнопки
		modalBtns[index].href = selectedUrl;
	});
}

modalBtns.forEach((el) => {
	el.addEventListener('click', changeUrl);
});

function renderModal() {
	promoInput.forEach((el) => {
		el.value = '';
	});
	modalPriceEdit.forEach((el) => {
		el.innerHTML = '500';
	});
	modalValidation.forEach((el) => {
		el.innerHTML = '';
	})
}
