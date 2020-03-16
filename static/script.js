// show password
function myFunction() {
  const x = document.getElementById('myInput');
  if (x.type === 'password') {
    x.type = 'text';
  } else {
    x.type = 'password';
  }
}
myFunction();

function confirmation() {
  const result = confirm('Weet je zeker dat je het account wil verwijderen?');
  if (result) {
    // Delete logic goes here
  }
}

confirmation();
