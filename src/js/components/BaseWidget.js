class BaseWidget{
  constructor(wrapperElement, initialValue){//wrapperElement - element dom w którym znajduje sie widget, initialValue - początkowa wartość widgetu
    const thisWidget = this;

    thisWidget.dom = {}; // wszystkie elementy dom z których będziemy korzystać w naszej aplikacji

    thisWidget.dom.wrapper = wrapperElement; // zapisujemy w obiekcie wrapper, który rzekazaliśmy konstruktorowi w momencie tworzenia nowej instancji

    thisWidget.correctValue = initialValue; // we właściwości value zapisujemy początkową wartość widgetu
  }

  get value(){
    const thisWidget = this;

    return thisWidget.correctValue;
  }

  set value(value){
    const thisWidget = this;

    const newValue = thisWidget.parseValue(value);

    /* TODO: Add validation */
    if(thisWidget.correctValue !== newValue && thisWidget.isValid(newValue)) {
      thisWidget.correctValue = newValue;
    }

    /* thisWidget.value = newValue; */
    /* thisWidget.dom.input.value = thisWidget.value; */
    thisWidget.renderValue();
    thisWidget.announce();
  }

  setValue(value){
    const thisWidget = this;

    thisWidget.value = value;
  }

  parseValue(value){
    return parseInt(value);
  }

  isValid(value){
    return !isNaN(value);
  }

  renderValue(){
    const thisWidget = this;
    thisWidget.dom.wrapper.innerHTML = thisWidget.value;
  }

  announce(){
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      bubbles: true
    });
    thisWidget.dom.wrapper.dispatchEvent(event);
  }
}

export default BaseWidget;