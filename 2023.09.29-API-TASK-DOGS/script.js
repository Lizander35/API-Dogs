// 2. Jeigu šuns veislė yra išvestinė (sub-breed), tai šalia ji turėtų būti atvaizduojama parašant pagrindinės veislės pavadinimą (breed) ir šalia išvestinės veislės pavainimą (sub-breed).

// viena kategorija
// antra kategorija
// Bulldog (French)
// Bulldog (English)
// Bulldog (Boston)
// ketvirta kategorija

document.addEventListener('DOMContentLoaded', function () {
  // Gauti sąrašą šunų veislių iš API
  fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(data => {
          const breedSelect = document.getElementById('breed');
          for (const breed in data.message) {
              if (data.message[breed].length === 0) {
                  // Jei veislė neturi išvestinių, tiesiog pridėkime veislę
                  breedSelect.innerHTML += `<option value="${breed}">${breed}</option>`;
              } else {
                  // Jei veislė turi išvestinių, atvaizduokime pagrindinę ir išvestinę veisles
                  data.message[breed].forEach(subBreed => {
                      breedSelect.innerHTML += `<option value="${breed}/${subBreed}">${breed} (${subBreed})</option>`;
                  });
              }
          }
      })
      .catch(error => console.error('Klaida gaudant šunų veisles:', error));

  // Formos pateikimo (submit) įvykio tvarkymas
  const form = document.getElementById('dogForm');
  form.addEventListener('submit', function (e) {
      e.preventDefault();
      const selectedBreed = document.getElementById('breed').value;
      const [mainBreed, subBreed] = selectedBreed.split('/'); // Padalinti veislę į pagrindinę ir išvestinę
      const breedToDisplay = subBreed ? `${mainBreed} (${subBreed})` : mainBreed;

      fetch(`https://dog.ceo/api/breed/${mainBreed}${subBreed ? `/${subBreed}` : ''}/images/random`)
          .then(response => response.json())
          .then(data => {
              const dogImageContainer = document.getElementById('dogImageContainer');
              dogImageContainer.innerHTML = `<img src="${data.message}" alt="${breedToDisplay}">`;
          })
          .catch(error => console.error('Klaida gaudant šuns nuotrauką:', error));
  });
});


// 1. Sukurti formą, kuri leidžia pasirinkti šuns veislę ir grąžina atsitiktinę tos veislės nuotrauką.
/*
document.addEventListener('DOMContentLoaded', function () {
  // Gauti sąrašą šunų veislių iš API
  fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(data => {
          const breedSelect = document.getElementById('breed');
          for (const breed in data.message) {
              breedSelect.innerHTML += `<option value="${breed}">${breed}</option>`;
          }
      })
      .catch(error => console.error('Klaida gaudant šunų veisles:', error));

  // Formos pateikimo (submit) įvykio tvarkymas
  const form = document.getElementById('dogForm');
  form.addEventListener('submit', function (e) {
      e.preventDefault();
      const selectedBreed = document.getElementById('breed').value;
      fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
          .then(response => response.json())
          .then(data => {
              const dogImageContainer = document.getElementById('dogImageContainer');
              dogImageContainer.innerHTML = `<img src="${data.message}" alt="${selectedBreed}">`;
          })
          .catch(error => console.error('Klaida gaudant šuns nuotrauką:', error));
  });
});
*/