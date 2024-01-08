import {settings, select} from '../settings.js';
import BaseWidget from './BaseWidget.js';

class AmountWidget extends BaseWidget{ //dopisane extends BaseWidget
  constructor(element){
    super(element, settings.amountWidget.defaultValue); // odwołanie do konstruktora clasy nadrzędnej
    const thisWidget = this;

    thisWidget.getElements(element);

    let initialValue;
    if (thisWidget.dom.input.value !== '') {
      initialValue = thisWidget.dom.input.value;
    } else {
      initialValue = settings.amountWidget.defaultValue;
    }
    thisWidget.setValue(initialValue);
    thisWidget.initActions();
    /* console.log('AmountWidget', thisWidget); */
  }

  getElements(/* element */) {
    const thisWidget = this;
  
/*     thisWidget.element = element; */
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input);
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);
  }

  isValid(value){
    return !isNaN(value) 
    && value >= settings.amountWidget.defaultMin 
    && value <= settings.amountWidget.defaultMax;
  }

  renderValue(){
    const thisWidget = this;
    thisWidget.dom.input.value = thisWidget.value;
  }

  initActions(){
    const thisWidget = this;

    thisWidget.dom.input.addEventListener('change', function(){
      /* thisWidget.setValue(thisWidget.dom.input.value); */
      thisWidget.value = thisWidget.dom.input.value;
    });

    thisWidget.dom.linkDecrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
    });

    thisWidget.dom.linkIncrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value + 1);
    });
  }
}

export default AmountWidget;