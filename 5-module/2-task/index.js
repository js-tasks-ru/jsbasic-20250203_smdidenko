function toggleText() {
  let button = document.querySelector('.toggle-text-button');

  button.addEventListener('click', () => {
    let div = document.getElementById('text');
    div.hidden = div.hidden == true ? false : true;
  });  
}