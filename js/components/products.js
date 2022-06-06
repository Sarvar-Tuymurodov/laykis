export const showProducts = (function () {
  let productsParent = document.querySelector('.products__all');
  let incrementProduct, decrementProduct, productCount, productPrice;
  let products = [];
  let productsInCart = [];
  let siteUz = location.pathname.split('/').includes('uz');

  let productHtml = data => {
    return `<div class="products__box">
            <div class="products__content">
                  <div class="products__content-photo">
                      <img src="${siteUz ? '../' : ''}${data.src}" alt=""/>
                  </div>
                  <h4 class="products__content-title">${data.name}</h4>
                  <div class="products__content-price products__price">
                      <div class="products__price--left">
                          <p>
                              <span>${data.price} </span> ${
      siteUz ? "so'm" : 'сум'
    }
                          </p>
                      </div>
                      <div class="products__price--right">
                          <button class="products__price--right-increment"  onclick="addToCart(${
                            data.id
                          },this)" id='incrementProduct'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                           <path d="M8 1L8 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M1 8H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          </button>

                          <span style="background-color:${
                            +data.count === 1 ? '#FF4E4E' : '#457d7c'
                          } " class="products__price--right-decrement decrement ${
      +data.count > 0 ? ' show__right' : ''
    }" onclick="removeToCart(${data.id},this)" id='decrementProduct'>
                           ${
                             +data.count === 1
                               ? `<img src="img/trash.svg"/>`
                               : '-1 шт'
                           }
                          </span>

                          <span class="count ${
                            data.count ? 'show__left' : ''
                          }" id="productCount">${data.count}</span>
                      </div>
                  </div>
                 
                  <div class="products__content--bottom ${
                    data.count ? 'show__bottom' : ''
                  }">
                  <p>${
                    siteUz ? 'umumiy' : 'итого'
                  }:<span id='productSummaryPrice'>${data.summaryPrice}</span>${
      siteUz ? "so'm" : 'сум'
    }</p>
              </div>
            </div>
      </div>`;
  };

  window.productsCountInCart = function () {
    document.getElementById('productsInCartCount').innerHTML =
      productsInCart.length;
  };

  const getCartProducts = function () {
    let cartProducts = JSON.parse(localStorage.getItem('cart'));
    if (cartProducts) {
      productsInCart = cartProducts;
    }
  };

  window.renderPorducts = function () {
    getCartProducts();
    fetch('../../products.json')
      .then(response => response.json())
      .then(data => {
        products = data;
        productsParent.innerHTML = '';
        products = products
          .map(
            product =>
              productsInCart.find(cartElem => +product.id === +cartElem.id) ??
              product
          )
          .map(product => {
            productsParent.insertAdjacentHTML(
              'beforeend',
              productHtml(product)
            );
            return product;
          });
      });
  };
  renderPorducts();
  productsCountInCart();

  function checkButton(elem, product) {
    incrementProduct = elem.parentNode.querySelector('#incrementProduct');
    decrementProduct = elem.parentNode.querySelector('#decrementProduct');
    productCount = elem.parentNode.querySelector('#productCount');
    productPrice = elem
      .closest('.products__content')
      .querySelector('.products__content--bottom');

    if (product.count > 0) {
      productCount.innerHTML = product.count;
      productPrice.querySelector('#productSummaryPrice').innerHTML =
        product.summaryPrice;
      productCount.classList.add('show__left');
      decrementProduct.classList.add('show__right');
      productPrice.classList.add('show__bottom');
    } else {
      productCount.classList.remove('show__left');
      decrementProduct.classList.remove('show__right');
      productPrice.classList.remove('show__bottom');
    }

    if (product.count === 1) {
      decrementProduct.innerHTML = `<img src='${
        siteUz ? '../' : ''
      }img/trash.svg'/>`;
      decrementProduct.style.backgroundColor = '#FF4E4E';
      incrementProduct.innerHTML = `+1 ${siteUz ? 'ta' : 'шт'}`;
      return;
    }

    if (product.count > 1) {
      decrementProduct.innerHTML = `-1 ${siteUz ? 'ta' : 'шт'}`;
      incrementProduct.innerHTML = `+1 ${siteUz ? 'ta' : 'шт'}`;
      decrementProduct.style.backgroundColor = '#457d7c';
      return;
    }
    if (product.count < 1) {
      incrementProduct.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L8 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1 8H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }
  }

  window.removeToCart = function (id, elem) {
    getCartProducts();
    products.forEach(product => {
      if (+product.id === +id && product.count > 0) {
        product.count -= 1;
        product.summaryPrice = Math.round(product.count * product.price);
        productsInCart = productsInCart.filter(
          item => +item.id !== +product.id
        );

        product.count !== 0 ? productsInCart.push(product) : '';

        checkButton(elem, product);
      }
    });
    localStorage.setItem('cart', JSON.stringify(productsInCart));
    productsCountInCart();
  };

  window.addToCart = function (id, elem) {
    getCartProducts();
    products.forEach(product => {
      if (+product.id === +id) {
        product.count += 1;
        product.summaryPrice = Math.round(product.count * product.price);
        productsInCart = productsInCart.filter(
          item => +item.id !== +product.id
        );

        productsInCart.push(product);

        checkButton(elem, product);
      }
    });
    localStorage.setItem('cart', JSON.stringify(productsInCart));
    productsCountInCart();
  };
})();
