import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  elem = null;

  #slides = null;
  #currentStep = 0;
  #carouselInner = null;
  #sliderBtnLeft = null;
  #sliderBtnRight = null;
  #slidesCount = 0;
  #currentSlideId = null;


  constructor(slides) {
    this.#slides = slides;
    
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');

    this.#carouselInner = document.createElement('div');
    this.#carouselInner.classList.add('carousel__inner');

    this.#sliderBtnRight = createElement(`<div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>`);
    this.#sliderBtnRight.addEventListener('click', this.#onSliderRightClick);
    this.elem.appendChild(this.#sliderBtnRight);

    this.#sliderBtnLeft = createElement(`<div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>`);
    this.#sliderBtnLeft.addEventListener('click', this.#onSliderLeftClick);
    this.elem.appendChild(this.#sliderBtnLeft);

    slides.forEach(slide => {
      let slideElement = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
      let productAddBtn = slideElement.querySelector('.carousel__button');
      productAddBtn.addEventListener('click', this.#onProductAdd.bind(this, slide.id));
      

      this.#carouselInner.appendChild(slideElement);
      
    });

    this.#sliderButtonsProcessing();
    this.elem.appendChild(this.#carouselInner);
  }

  #onSliderRightClick = () => {
    this.#currentStep -= 1;
    this.#sliderButtonsProcessing();
  }

  #onSliderLeftClick = () => {
    this.#currentStep += 1;
    this.#sliderButtonsProcessing();
  }

  #onProductAdd(slideId, event) {
    const customEvent = new CustomEvent("product-add", {
      detail: slideId,
      bubbles: true
    });
    this.elem.dispatchEvent(customEvent);
}

  #sliderButtonsProcessing() {
    this.#carouselInner.style.transform = `translateX(${this.#currentStep*this.#carouselInner.offsetWidth}px)`;
    this.#sliderBtnLeft.style.display = this.#currentStep >= 0 ? 'none' : '';
    this.#sliderBtnRight.style.display = this.#currentStep <= -(this.#slides.length - 1) ? 'none' : '';
  }
}
