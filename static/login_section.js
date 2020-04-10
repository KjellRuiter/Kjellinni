// hide section home
const bigSection = document.querySelector('.welcom_screen')

function removeOverlay() {
  setTimeout(function() {
    bigSection.classList.add('hide_item_timout')
  }, 500)
}

removeOverlay()
