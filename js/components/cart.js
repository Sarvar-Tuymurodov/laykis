export const cart = (function () {
  let cart = document.getElementById('cart');
  let cartOpen = document.getElementById('navbarCart');
  let cartClose = document.getElementById('navbarCartClose');
  let cartParent = document.querySelector('.cart__products');
  let paymentCheck = document.querySelector('.cart__paycheck');
  let summaryPriceProduct = 0;
  let productInCart = [];
  let siteUz = location.pathname.split('/').includes('uz');

  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify(productInCart));
  }

  cart.style.transform = `scale(0)`;

  let cartHtml = data => {
    return `
          <div class="product__card">
          <div class="product__card--img">
            <img src="${siteUz ? '../' : ''}${data.src}" alt="" />
          </div>
          <div class="product__card--group-1">
            <div class="product__card--name">
              <h3>${data.name}</h3>
            </div>
            <div class="product__card--price-per">
              <p><span>${data.price}</span> ${siteUz ? "so'm" : 'сум'}</p>
            </div>
          </div>
          <div class="product__card--group-2">
            <div class="product__card--count">
            <div class="product__card--count-box">
              <span class="product__card--count-left" href='' onclick='decrementProductCountInCart(${
                data.id
              },this)'><svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 7 11" fill="none">
              <path d="M6.12636 1L2 5.5L6.12636 10" stroke="#BDBDBD" stroke-width="1.5"/>
              </svg></span>
              <input type="number" id="productInCartCount" readonly value='${
                data.count
              }' />
              <span class="product__card--count-right"  onclick='incrementProductCountInCart(${
                data.id
              },this)'><svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 7 11" fill="none">
              <path d="M1.4586 10L5.58496 5.5L1.4586 1" stroke="#BDBDBD" stroke-width="1.5"/>
              </svg></span>
            </div>
            </div>
            <div class="product__card--price-all">
              <p><span id="productSummaryPriceInCart">${
                data.summaryPrice
              }</span>${siteUz ? "so'm" : 'сум'} </p>
            </div>
          </div>
          <div class="product__card--remove">
            <span onclick="removeProductFromCart(${
              data.id
            })" href=""><img src="${
      siteUz ? '../' : ''
    }img/delete.svg" alt="" /></span>
          </div>
          </div>`;
  };

  const renderProductsInCart = function () {
    productInCart = JSON.parse(localStorage.getItem('cart'));
    cartParent.innerHTML = '';
    if (productInCart?.length > 0) {
      productInCart.map(product => {
        cartParent.insertAdjacentHTML('beforeend', cartHtml(product));
      });
    }
  };

  const checkProductsInCart = function () {
    productInCart = productInCart.filter(product => +product.count !== 0);
    localStorage.setItem('cart', JSON.stringify(productInCart));
  };

  const checkEmptyCarts = function () {
    if (+productInCart.length === 0) {
      paymentCheck.classList.add('d-none');
      document.querySelector('.cart__content--bg').classList.remove('d-none');
    } else {
      paymentCheck.classList.remove('d-none');
      document.querySelector('.cart__content--bg').classList.add('d-none');
    }
  };

  const calculatePrice = function (product, elem) {
    product.summaryPrice = product.count * product.price;
    elem
      .closest('.product__card')
      .querySelector('#productSummaryPriceInCart').innerHTML =
      product.summaryPrice;
  };

  const getSummaryProducts = function () {
    summaryPriceProduct = 0;
    productInCart.map(product => (summaryPriceProduct += product.summaryPrice));
    document.getElementById('allProductsSummaryPrice').textContent =
      summaryPriceProduct;
  };

  window.removeProductFromCart = function (id) {
    productInCart.forEach(product => {
      +product.id === +id ? (product.count = 0) : '';
    });
    checkProductsInCart();
    renderProductsInCart();
    getSummaryProducts();
    checkEmptyCarts();
  };

  window.decrementProductCountInCart = function (id, elem) {
    summaryPriceProduct = 0;
    productInCart.forEach(product => {
      if (+product.id === +id && +product.count > 1) {
        product.count -= 1;
        elem.parentNode.querySelector('#productInCartCount').value =
          product.count;

        calculatePrice(product, elem);
      }
    });
    getSummaryProducts();
  };

  window.incrementProductCountInCart = function (id, elem) {
    summaryPriceProduct = 0;
    productInCart.forEach(product => {
      if (+product.id === +id) {
        product.count += 1;
        elem.parentNode.querySelector('#productInCartCount').value =
          product.count;

        calculatePrice(product, elem);
      }
    });
    checkProductsInCart();
    getSummaryProducts();
  };

  cartOpen.addEventListener('click', function (e) {
    e.preventDefault();
    renderProductsInCart();
    getSummaryProducts();
    checkEmptyCarts();
    cart.style.transform = `scale(1)`;
    document.querySelector('body').classList.add('lock');
    cart.classList.add('cart__show');
  });

  cartClose.addEventListener('click', function (e) {
    e.preventDefault();
    renderPorducts();
    productsCountInCart();
    document.querySelector('body').classList.remove('lock');
    cart.classList.remove('cart__show');
    setTimeout(function () {
      cart.style.transform = `scale(0)`;
    }, 300);
  });
})();
