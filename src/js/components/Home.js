import {templates, select} from '../settings.js';
import utils from '../utils.js';
import {app} from '../app.js';

class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.render(element);
    thisHome.getElement(element);
    thisHome.goToPage();
  }

  getElement(element) {
    const thisHome = this;
    
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.carousel = thisHome.dom.wrapper.querySelector(select.containerOf.carousel);
    thisHome.dom.orderLink = thisHome.dom.wrapper.querySelector(select.home.orderLink);
    thisHome.dom.bookingLink = thisHome.dom.wrapper.querySelector(select.home.bookingLink);
  }

  render(element) {
      const generatedHTML = templates.home();
      /* console.log('generateHTML ', generatedHTML); */
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      element.appendChild(generatedDOM);
  }

  goToPage() {
    const thisHome = this;

    thisHome.dom.orderLink.addEventListener('click', function() {
      app.activatePage('order');
    });

    thisHome.dom.bookingLink.addEventListener('click', function() {
      app.activatePage('booking');
    });
  }
}

export default Home;