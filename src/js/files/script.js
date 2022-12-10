// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


//head 

document.addEventListener('click', e => {
	const target = e.target

	if (window.innerWidth < 991.98) {
		const iconMenu = document.querySelector('.iconMenu');
		if (target.closest('.menu__arrow')) {
			//console.log('123312');
			target.closest('.menu__item').classList.toggle('_active')
			e.preventDefault()
		}
		if (!target.closest('.menu__arrow') && !target.closest('.submenu')) {
			const menuItems = document.querySelectorAll('.menu__item');
			menuItems.forEach(item => {
				item.classList.remove('_active')
			})
			e.preventDefault()
		}
	}


	if (e.target.closest('.search-header__button')) {
		document.querySelector('.search-header__form').classList.toggle('_active')
	}

	if (!e.target.closest('.search-header__form') && !e.target.closest('.search-header__button')) {
		document.querySelector('.search-header__form').classList.remove('_active')
	}

	if (target.closest('.products-page__button')) {
		const cardId = target.closest('.products-page__item').dataset.id;
		//console.log(cartId);
		addToCart(target, cardId)
	}

	if (target.closest('.cart')) {
		if (document.querySelector('.cart__list').children.length > 0) {
			document.querySelector('.cart__list').classList.add('_active')
		}

	} else if (!target.closest('.cart') && !target.closest('.products-page__button')) {
		document.querySelector('.cart__list').classList.remove('_active')
	}

	if (target.closest('.list-cart__delete')) {
		const dataProduct = target.closest('.list-cart__item').dataset.cartPid
		updateCart(target, dataProduct, false)
		console.log('123');
	}
})



function addToCart(productButton, targetId) {
	if (!productButton.classList.contains('_hold')) {
		productButton.classList.add('_hold')
		productButton.classList.add('_fly')

		const cart = document.querySelector('.cart__icon');
		const product = document.querySelector(`[data-id="${targetId}"]`);
		const productImg = product.querySelector('.products-page__image');

		const productImgClone = productImg.cloneNode(true)

		const productImgCloneWidth = productImg.offsetWidth;
		const productImgCloneHight = productImg.offsetHeight;
		const productImgCloneLeft = productImg.getBoundingClientRect().left;
		const productImgCloneTop = productImg.getBoundingClientRect().top;

		productImgClone.setAttribute('class', 'flyImage products-page__image');

		productImgClone.style.cssText = `
		width: ${productImgCloneWidth}px;
		height: ${productImgCloneHight}px;
		left: ${productImgCloneLeft}px;
		top: ${productImgCloneTop}px;
		`;
		document.body.append(productImgClone)

		const cartleft = cart.getBoundingClientRect().left
		const cartTop = cart.getBoundingClientRect().top

		productImgClone.style.cssText = `
		left: ${cartleft}px;
		top: ${cartTop}px;
		width: 0px;
		height: 0px;
		opacity: 0; 
		`;

		productImgClone.addEventListener('transitionend', () => {
			if (productButton.classList.contains('_fly')) {
				productImgClone.remove()
				updateCart(productButton, targetId)
				productButton.classList.remove('_fly')

			}
		})
	}
}

function updateCart(productButton, targetId, productAdd = true) {
	const cart = document.querySelector('.cart');
	const cartIcon = cart.querySelector('.cart__icon');
	const cartQuantity = cartIcon.querySelector('span');
	const cartList = document.querySelector('.cart__list');
	const cartProduct = document.querySelector(`[data-cart-pid="${targetId}"]`)

	if (productAdd) {
		if (cartQuantity) {
			cartQuantity.innerHTML = ++cartQuantity.innerHTML
		}
		else {
			cartIcon.insertAdjacentHTML('beforeend', ` <span classs="cart__value">1</span>`)
		}

		if (!cartProduct) {
			const productItem = document.querySelector(`[data-id="${targetId}"]`);
			const imageItem = productItem.querySelector('.products-page__image').innerHTML
			const imageName = productItem.querySelector('.products-page__name').innerHTML
			const imagePrice = productItem.querySelector('.products-page__price').innerHTML
			const cartProductBody = `
			<div class="list-cart__body">
			<a class="list-cart__image" href="#"> ${imageItem} </a>
			<div class="list-cart__name" >${imageName}</div>
			<div class="list-cart__price" >${imagePrice}</div>
			<div class="cart-list__quantity" > 1</div>
			<a class="list-cart__delete" href="#" > Delete </a>
			</div>
			`;
			cartList.insertAdjacentHTML('beforeend', `<li  data-cart-pid="${targetId}" class="list-cart__item"> ${cartProductBody} </li>`)
		}
		else {
			const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity');
			cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
		}
		productButton.classList.remove('_hold')
	}

	else {
		const cartProudctValue = document.querySelector('.cart-list__quantity');
		cartProudctValue.innerHTML = --cartProudctValue.innerHTML
		if (!parseInt(cartProudctValue.innerHTML)) {
			cartProduct.remove()
		}

		const cartQuantityValue = --cartQuantity.innerHTML
		if (cartQuantityValue) {
			cartQuantity.innerHTML = cartQuantityValue
		}
		else {
			cartQuantity.remove()
			cart.classList.remove('_active')
		}
	}
}

