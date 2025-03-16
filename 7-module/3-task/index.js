import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {

  elem = null;
  #value = 0;

  constructor({ steps, value = 0 }) {
    
    this.#value = value;

    let slider = createElement(`
    <div class="slider">
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">2</span>
      </div>

      <div class="slider__progress" style="width: 50%;"></div>

      <div class="slider__steps">
      </div>
    </div>`);

    let slider_steps = slider.querySelector('.slider__steps');

    for (let i = 0; i < steps; i++) {
      let span = document.createElement('span');
      
      if (this.#value == i) {
        span.classList.add('slider__step-active');
        this.#value = i;
      }
      slider_steps.append(span);
      
    }

    slider.addEventListener('click', this.#categoryClick.bind(this));

    this.elem = slider;

  }

  #categoryClick (event) {
    this.#moveSlider(event);
    
    const customEvent = new CustomEvent('slider-change', {
      detail: this.#value,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);

  }

  #moveSlider(event) {

    let slider_steps = this.elem.querySelector('.slider__steps').querySelectorAll('span');
    slider_steps[this.#value].classList.remove('slider__step-active');

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = slider_steps.length - 1;
    let approximateValue = leftRelative * segments;
    this.#value = Math.round(approximateValue);

    slider_steps[this.#value].classList.add('slider__step-active');
    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.textContent = String(this.#value);

    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    sliderThumb.style.left = `${this.#value*(100/(segments))}%`;
    sliderProgress.style.width = `${this.#value*(100/(segments))}%`;
    
  }

}
