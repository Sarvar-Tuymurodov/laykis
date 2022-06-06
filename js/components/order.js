export const order = (function () {
  let orderBtn = document.getElementById('orderButton');
  let orderClose = document.getElementById('orderModalClose');
  let submitForm = document.querySelector('.popup__info');
  let orderFinally = document.getElementById('orderProducts');
  let userFirstName = document.getElementById('userFirstName');
  let userName = document.getElementById('userName');
  let userPhone = document.getElementById('userPhoneNumber');
  let formOrder = document.getElementById('orderForm');
  let orderProducts;
  let url =
    'https://alerts.uzanimals.uz/api/Laykis/SendTgGroup?key=$Gymkdr5mmumffm345m4rm';

  let sortedObject = {};
  let finallyProducts = {
    products: [],
    fio: '',
    phoneNumber: '',
  };

  submitForm.style.transform = `scale(0)`;

  const sortProductsInCart = function () {
    sortedObject = {};
    finallyProducts.products = orderProducts.map(product => {
      sortedObject = {};
      for (let [key, value] of Object.entries(product)) {
        if (key === 'name' || key === 'count') {
          sortedObject[`${key}`] = value;
        }
        if (key === 'summaryPrice') {
          sortedObject.amount = value;
        }
      }
      debugger;

      return sortedObject;
    });

    finallyProducts.fio = `${userFirstName.value} ${userName.value}`;
    finallyProducts.phoneNumber = userPhone.value;
  };

  const clearAllData = function () {
    submitForm.classList.remove('popup__info__show');
    userFirstName.value = '';
    userName.value = '';
    userPhone.value = '';

    document.querySelector('body').classList.remove('lock');
    cart.classList.remove('cart__show');
    localStorage.setItem('cart', JSON.stringify([]));
    renderPorducts();
    productsCountInCart();
  };

  const swalAlert = function () {
    Swal.fire('Ваша заявка принята!', 'Спасибо за покупку!', 'success');
  };

  orderBtn.addEventListener('click', function (e) {
    e.preventDefault();

    submitForm.style.transform = `scale(1)`;
    submitForm.classList.add('popup__info__show');
  });

  orderClose.addEventListener('click', function (e) {
    e.preventDefault();

    submitForm.classList.remove('popup__info__show');
    setTimeout(function () {
      submitForm.style.transform = `scale(0)`;
    }, 300);
  });

  formOrder.addEventListener('submit', function (e) {
    e.preventDefault();
    orderProducts = JSON.parse(localStorage.getItem('cart'));

    if (orderProducts.length > 0) {
      sortProductsInCart();

      debugger;
      console.log(finallyProducts);

      fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(finallyProducts),
      })
        .then(response => {
          clearAllData();
          response.text();
          swalAlert();
        })
        .catch(error => console.log('error', error));
    }
  });

  var phoneMask = IMask(userPhone, {
    mask: '+{998} (00) 000-00-00',
    // lazy: false,
  });
})();
