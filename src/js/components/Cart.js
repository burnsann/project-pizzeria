import {settings, select, templates, classNames} from './settings.js';
import { utils } from "utils.js";
import CartProduct from './CartProduct.js';

class Cart{
  constructor(element){
    const thisCart = this;

    thisCart.products = []; // tablica - produkty dodane do koszyka

    thisCart.getElements(element);
    thisCart.initActions();
  }

  getElements(element){
    const thisCart = this;

    thisCart.dom = {};

    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = thisCart.dom.wrapper.querySelector(select.cart.productList);
    thisCart.dom.deliveryFee = thisCart.dom.wrapper.querySelector(select.cart.deliveryFee);
    thisCart.dom.subtotalPrice = thisCart.dom.wrapper.querySelector(select.cart.subtotalPrice);
    thisCart.dom.totalPrice = thisCart.dom.wrapper.querySelectorAll(select.cart.totalPrice);
    thisCart.dom.totalNumber = thisCart.dom.wrapper.querySelector(select.cart.totalNumber);
    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);
    thisCart.dom.phone = thisCart.dom.wrapper.querySelector(select.cart.phone);
    thisCart.dom.address = thisCart.dom.wrapper.querySelector(select.cart.address);
  }

  initActions(){
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', function(event){
      event.preventDefault();
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });

    thisCart.dom.productList.addEventListener('updated', function(){
      thisCart.update();
    });

    thisCart.dom.productList.addEventListener('remove', function(){
      thisCart.remove(event.detail.cartProduct);
    });

    thisCart.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisCart.sendOrder();
    })
  }

  add(menuProduct){
    const thisCart = this;

    /* generate HTML based on template */
    const generatedHTML = templates.cartProduct(menuProduct);

    /* create element using utils.createElementFromHTML */
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);

    /* add element to thisCart.dom.productList using appendChild */
    thisCart.dom.productList.appendChild(generatedDOM);
    console.log('adding product to cart:', menuProduct);

    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    console.log('thisCart.products:', thisCart.products);

    thisCart.update();
  }

  update(){
    const thisCart = this;
    const deliveryFee = settings.cart.defaultDeliveryFee;
    thisCart.totalNumber = 0;
    thisCart.subtotalPrice = 0;

    for (const product of thisCart.products){
      thisCart.totalNumber += product.amount;
      thisCart.subtotalPrice += product.price;
    }

    thisCart.totalPrice = 0;

    if (thisCart.products.length > 0){
      thisCart.totalPrice = thisCart.subtotalPrice + deliveryFee;
    } else {
      thisCart.totalPrice = 0;
    }

    console.log('totalNumber:', thisCart.totalNumber);
    console.log('subtotalPrice:', thisCart.subtotalPrice);
    console.log('deliveryFee:', deliveryFee);
    console.log('totalPrice:', thisCart.totalPrice);

    thisCart.dom.totalNumber.innerHTML = thisCart.totalNumber;
    thisCart.dom.subtotalPrice.innerHTML = thisCart.subtotalPrice;

    if(thisCart.subtotalPrice > 0){
      thisCart.dom.deliveryFee.innerHTML = deliveryFee;
    }else{
      thisCart.dom.deliveryFee.innerHTML = 0;
    }

    thisCart.dom.totalPrice.forEach(element => {
      element.innerHTML = thisCart.totalPrice;
    });
  }

  remove(cartProduct){
    const thisCart = this;

    // Sprawdzamy, czy produkt znajduje się w tablicy thisCart.products
    const index = thisCart.products.indexOf(cartProduct);

    // Jeśli produkt jest w tablicy:
    if (index !== -1) {
      // to usuwamy jego reprezentację z HTML-a:
      cartProduct.dom.wrapper.remove();
      // i informacje o produkcie z tablicy:
      thisCart.products.splice(index, 1);
      // oraz wywołujemy metode update żeby przeliczyć sumy po usunięciu produktu:
      thisCart.update();
    }
  }

  sendOrder(){
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.orders;

    const payload = {
      address: thisCart.dom.address.value,
      phone: thisCart.dom.phone.value,
      totalPrice: thisCart.totalPrice,
      subtotalPrice: thisCart.subtotalPrice,
      totalNumber: thisCart.totalNumber,
      deliveryFee: thisCart.dom.deliveryFee,
      products: []
    }

    for(let prod of thisCart.products) {
      payload.products.push(prod.getData());
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    
    fetch(url, options);
    console.log('Payload:', payload);
  }
}

export default Cart;