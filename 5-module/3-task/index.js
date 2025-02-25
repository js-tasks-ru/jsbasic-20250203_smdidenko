function initCarousel() {
  let slider = document.querySelector('.carousel__inner');
  let btnLeft = document.querySelector('.carousel__arrow_left');
  let btnRight = document.querySelector('.carousel__arrow_right');
  let slidesCount = document.querySelectorAll('.carousel__slide').length;
  currentStep = 0;
  sliderButtonsProcessing();

  btnRight.addEventListener('click', () => {
    currentStep -= 1;
    sliderButtonsProcessing();
  });

  btnLeft.addEventListener('click', () => {
    currentStep += 1;
    sliderButtonsProcessing();
  });
  
  function sliderButtonsProcessing() {
    slider.style.transform = `translateX(${currentStep*slider.offsetWidth}px)`;
    btnLeft.style.display = currentStep >= 0 ? 'none' : '';
    btnRight.style.display = currentStep <= -(slidesCount - 1) ? 'none' : '';
  }
}
