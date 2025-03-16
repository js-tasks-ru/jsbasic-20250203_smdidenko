import createElement from '../../assets/lib/create-element.js';

export default class Modal {

  elem = null;

  constructor() {
    
    let modalElement = createElement(`
      <!--Корневой элемент Modal-->
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>
    
        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
    
            <h3 class="modal__title">
              Вот сюда нужно добавлять заголовок
            </h3>
          </div>
    
          <div class="modal__body">
            A сюда нужно добавлять содержимое тела модального окна
          </div>
        </div>
      </div>`
    );
    modalElement.addEventListener('click', this.#closeBtnClick);

    document.addEventListener('keydown', function(event) {
      if (event.code == 'Escape') {
        document.body.classList.remove('is-modal-open');
        document.body.textContent = '';
      }
    });

    this.elem = modalElement;
  }

  setTitle(title) {
    let modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.textContent = title;
  }

  setBody(body) {
    let modalBody = this.elem.querySelector('.modal__body');
    modalBody.textContent = '';
    modalBody.append(body);
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.elem);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    document.body.textContent = '';
  }

  #closeBtnClick(event) {
    document.body.classList.remove('is-modal-open');
    document.body.textContent = '';
  }
}
