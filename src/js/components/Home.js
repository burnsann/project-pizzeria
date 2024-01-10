/* import {templates, select} from '../settings.js';
import utils from '../utils.js';

class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.render(element);
    thisHome.getElement(element);
  }

  getElement(element) {
    const thisHome = this;
    
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.carousel = thisHome.dom.wrapper.querySelector(select.containerOf.carousel);

}

  render(element) {
      const generatedHTML = templates.home();
      console.log('generateHTML ', generatedHTML);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      element.appendChild(generatedDOM);
  }
}

export default Home; */