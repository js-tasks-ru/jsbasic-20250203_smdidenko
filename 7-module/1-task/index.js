import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  elem = null;
  #ribbon = null;
  #selectedCategory = null;

  constructor(categories) {

    this.categories = categories;
    

    this.#ribbon = createElement(
      `<div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>`
    );

    let ribbonInner = this.#ribbon.querySelector('.ribbon__inner');
    categories.forEach(element => {
      let categoryElement = createElement(
        `<a href="#" class="ribbon__item" data-id="${element.id}">${element.name}</a>`
      );
      categoryElement.addEventListener('click', this.#categoryClick.bind(this, element.id));
      ribbonInner.append(categoryElement);
    });

    let btnLeft  = this.#ribbon.querySelector('.ribbon__arrow_left');
    btnLeft.addEventListener('click', this.#arrowBtnClick.bind(this, 'left'));
    let btnRight = this.#ribbon.querySelector('.ribbon__arrow_right');
    btnRight.addEventListener('click', this.#arrowBtnClick.bind(this, 'right'));

    this.#checkBtnVisibility();

    this.elem = this.#ribbon;
  }

  #categoryClick(categoryId, event) {
    
    let categoryElement = document.querySelector(`[data-id="${categoryId}"]`);
    event.preventDefault();

    if (this.#selectedCategory != null && this.#selectedCategory != categoryElement) {
      this.#selectedCategory.classList.remove('ribbon__item_active');
    }
    categoryElement.classList.add('ribbon__item_active');
    this.#selectedCategory = categoryElement;

    const customEvent = new CustomEvent("ribbon-select", {
      detail: categoryId,
      bubbles: true
    });
    this.elem.dispatchEvent(customEvent);

  }

  #arrowBtnClick(btnType) {
    
    let ribbonIner = this.#ribbon.querySelector('.ribbon__inner');
    
    if (btnType === 'left') {
      ribbonIner.scrollBy(-350, 0);
    } else {
      ribbonIner.scrollBy(350, 0);
    }

    this.#checkBtnVisibility();
  }

  #checkBtnVisibility() {
    
    let ribbonIner = this.#ribbon.querySelector('.ribbon__inner')
    let scrollLeft = ribbonIner.scrollLeft;
    let scrollWidth = ribbonIner.scrollWidth;
    let clientWidth = ribbonIner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      this.#ribbon.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
      this.#ribbon.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
    } else {
      this.#ribbon.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
    }

    if (scrollRight === 0) {
      this.#ribbon.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
      this.#ribbon.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
    } else {
      this.#ribbon.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
    }

  }
}
