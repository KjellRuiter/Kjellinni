function myFunction() {
  const x = document.getElementById('myInput');
  if (x.type === 'password') {
    x.type = 'text';
  } else {
    x.type = 'password';
  }
}
const bigSection = document.querySelector('.welcom_screen');
function removeOverlay() {
  setTimeout(function() {
    bigSection.classList.add('hide_item_timout');
  }, 1000);
}

removeOverlay();
