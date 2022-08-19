export let moviesList = null;
export let inputSearch = null;
export let triggerMode = false;

export const createElement = ({
  type,
  attrs,
  container = null,
  position = 'append',
  evt = null,
  handler = null
}) => {
  const el = document.createElement(type);

  Object.keys(attrs).forEach((key) => {
    if (key !== 'innerHTML') el.setAttribute(key, attrs[key]);
    else el.innerHTML = attrs[key];
  });

  if (container && position === 'append') container.append(el);

  if (evt && handler && typeof handler === 'function') el.addEventListener(evt, handler);

  return el;
};

export const createStyle = () => {
  createElement({
    type: 'style',
    attrs: {
      innerHTML: `
            * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            margin: 0;
            padding: 15px;
            background-image: url(assets/img/bg-img.jpg);
            font-family: Arial, Helvetica, sans-serif;
          }
          
          .container {
            position: relative;
            margin: 0 auto;
            top: 50px;
            max-width: 1400px;
            padding: 15px;
            background-color: #8080803a;
            border-radius: 7px;
          }
          
          .title {
            max-width: 500px;
            font-size: 45px;
            color: lightblue;
            padding-bottom: 15px;
            border-bottom: 1px solid lightblue;
          }
          
          .input {
            max-width: 500px;
            margin-top: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid lightblue;
            padding-bottom: 20px;
          }
          .input__text {
            display: inline-block;
            max-width: 300px;
            width: 100%;
            height: 2.29rem;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            background-color: #fff;
            border: 1px solid #bdbdbd;
            border-radius: 0.25rem;
          }          
          .check {
            display: block;
            margin-top: 20px;
            color: lightblue;
            font-weight: 700;
          }
          .check input {
            margin: 5px;
          }
          
          .movies {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 25px;
          }
          
          .movie {
            display: flex;
            align-content: center;
            justify-content: center;
            max-width: 200px;
          }
          .movie__img {
            width: 100%;
            object-fit: cover;
            background-color: lightgray;
          }`
    },
    container: document.head
  });
};

export const createMarkup = () => {

  const container = createElement({
    type: 'div',
    attrs: {
      class: 'container'
    },
    container: document.body,
    position: 'append'
  });


  createElement({
    type: 'h1',
    attrs: {
      class: 'title',
      innerHTML: 'Поиск фильмов'
    },
    container
  });

  const input = createElement({
    type: 'div',
    attrs: {
      class: 'input'
    },
    container
  });

  inputSearch = createElement({
    type: 'input',
    attrs: {
      class: 'input__text',
      type: 'text',
      placeholder: 'Введите название фильма'
    },
    container: input
  });

  const check = createElement({
    type: 'div',
    attrs: {
      class: 'check'
    },
    container: input
  });

  createElement({
    type: 'input',
    attrs: {
      id: 'check',
      type: 'checkbox'
    },
    container: check,
    evt: 'click',
    handler: () => triggerMode = !triggerMode
  });

  createElement({
    type: 'label',
    attrs: {
      for: 'check',
      innerHTML: 'Добавлять новые фильмы к существующим'
    },
    container: check
  });

  moviesList = createElement({
    type: 'div',
    attrs: {
      class: 'movies'
    },
    container
  });
};

export const clearMoviesMarkup = (el) => el && (el.innerHTML = '');

export const addMovieToList = (movie) => {

  const item = createElement({
    type: 'div',
    attrs: {
      class: 'movie'
    },
    container: moviesList
  });

  createElement({
    type: 'img',
    attrs: {
      class: 'movie__img',
      src: /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/no-image.png',
      alt: movie.Title,
      title: movie.Title
    },
    container: item
  });

  console.log(movie);
};
