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

    slider.addEventListener('click', this.#sliderClick.bind(this));
    slider.addEventListener('pointermove', this.#thumbPointerMove.bind(this));
    slider.addEventListener('pointerup', this.#thumbPointerUp.bind(this));

    let thumb = slider.querySelector('.slider__thumb');
    thumb.addEventListener('pointerdown', this.#thumbPointerDown.bind(this));
    thumb.addEventListener('pointermove', this.#thumbPointerMove.bind(this));
    thumb.addEventListener('pointerup', this.#thumbPointerUp.bind(this));
    thumb.ondragstart = () => false;

    this.elem = slider;

  }

  #thumbPointerDown (event) {

    this.elem.classList.add('slider_dragging');

  }

  #thumbPointerMove (event) {

    if (this.elem.classList.contains('slider_dragging')) {
      this.#moveSlider(event, 'move');
      
    }

  }

  #thumbPointerUp (event) {

    this.elem.classList.remove('slider_dragging');
    this.#dispatchCustomEvent('slider-change');

  }


  #sliderClick (event) {

    this.#moveSlider(event, 'click');
    this.#dispatchCustomEvent('slider-change');

  }

  #moveSlider(event, action) {

    let slider_steps = this.elem.querySelector('.slider__steps').querySelectorAll('span');
    slider_steps[this.#value].classList.remove('slider__step-active');

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }
    
    if (leftRelative > 1) {
      leftRelative = 1;
    }    
    let leftPercents = leftRelative * 100;
    let segments = slider_steps.length - 1;
    let approximateValue = leftRelative * segments;
    this.#value = Math.round(approximateValue);

    slider_steps[this.#value].classList.add('slider__step-active');
    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.textContent = String(this.#value);

    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    
    if (action == 'click') {
      sliderThumb.style.left = `${this.#value*(100/(segments))}%`;
      sliderProgress.style.width = `${this.#value*(100/(segments))}%`;
    } else {
      sliderThumb.style.left = `${leftPercents}%`;
      sliderProgress.style.width = `${leftPercents}%`;
    }
    
  }

  #dispatchCustomEvent(customEventName) {

    const customEvent = new CustomEvent(`${customEventName}`, {
      detail: this.#value,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
  }

}
