
//szablon znajdujący się w html
const templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);
//lista książek w html
const listBookHtml = document.querySelector('.books-list');

function render() {
  //dla każdego elementu zapisanego w pliku dataSource.books
  for (const element of dataSource.books) {
    element.ratingBgc = determineRatingBgc(element.rating);
    element.ratingWidth = determineratingWidth(element.rating);
    /*wstaw element do szablonu */
    const generatedHTML = templateBook(element);
    /*stwórz gotowy html o to co powstało wyrzej */
    const elementhtml = utils.createDOMFromHTML(generatedHTML);
    /*znajdz miejsce do którego chcesz włożyc gotowy html*/
    const menuContainer = listBookHtml;
    /*dodaj html do miejsca w którym chcesz zeby sie znajdował */
    menuContainer.appendChild(elementhtml);
  }
}
//wywołaj funkcje
render();


const favoriteBooks = [];

const filters = [];

const buttonFilters = document.querySelector('.filters');

function initActions() {

  //nasłuchuj na lisćie z ksiązkami  podwójnego kliknięcia
  listBookHtml.addEventListener('dblclick', function (event) {
    //zablokuj domyślną funkcję przeglądarki
    event.preventDefault();
    //ustaw klikniety element= na (event.target=kliknięty element) (offsetParent=rodzic elementu)
    const clickedElement = event.target.offsetParent;

    //jeżeli kliknięcie nastąpiło na obrazku
    if (clickedElement.classList.contains('book__image')) {

      // jeżeli zdjęcie ma klasę 'favorite'
      if (clickedElement.classList.contains('favorite')) {
        //weź atrybut z obrazka przypisana w 'data-id'
        const bookId = clickedElement.getAttribute('data-id');
        //znajdz index pod którym znajduje się atrybut
        const indexOfBookID = favoriteBooks.indexOf(bookId);
        // usunać ten element z tablicy
        favoriteBooks.splice(indexOfBookID, 1);
        //usuń klase favorite z obrazka
        clickedElement.classList.remove('favorite');

        //jeżeli inaczej
      } else {
        //dodaj klase favorite do obrazka
        clickedElement.classList.add('favorite');
        //weź atrybut z obrazka przypisana w 'data-id'
        const bookId = clickedElement.getAttribute('data-id');
        //dodaj ten element do tablicy
        favoriteBooks.push(bookId);
      }
    }
  });

  buttonFilters.addEventListener('click', function(event){

    const clickedElement = event.target;

    if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter'){

      if(clickedElement.checked){
        const value = clickedElement.getAttribute('value');
        filters.push(value);
        console.log(filters, 'dodaj');
      } else {
        const value = clickedElement.getAttribute('value');
        const indexOfFilterID = filters.indexOf(value);
        filters.splice(indexOfFilterID, 1);
        console.log(filters, 'usuń');
      }
      }
      filterBooks();
  });
}
  initActions();

  function filterBooks() {

    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        const book__image = document.querySelector('.book__image[data-id="' + book.id + '"]');
        book__image.classList.add('hidden');
      } else {
        const book__image = document.querySelector('.book__image[data-id="' + book.id + '"]');
        book__image.classList.remove('hidden');
      }

    }
  }

  function determineRatingBgc(rating) {

    let bgc = '';
    if (rating < 6) {
      bgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
    }
    if (rating > 6 && rating <= 8) {
      bgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    }
    if (rating > 8 && rating <= 9) {
      bgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    }
    if (rating > 9) {
      bgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }
    return bgc;


  }

  determineRatingBgc();

  function determineratingWidth(rating) {
    if (rating > 1) {
      Width = 10;
    }
    if (rating > 2) {
      Width = 20;
    }
    if (rating > 3) {
      Width = 30;
    }
    if (rating > 4) {
      Width = 40;
    }
    if (rating > 5) {
      Width = 50;
    }
    if (rating > 6) {
      Width = 60;
    }
    if (rating > 7) {
      Width = 70;
    }
    if (rating > 8) {
      Width = 80;
    }
    if (rating > 9) {
      Width = 90;
    }
    if (rating > 10) {
      Width = 100;
    }

    return Width;
  }

  determineratingWidth();
