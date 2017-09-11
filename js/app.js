(function() {
  'use strict';

  const movies = [];

  //var movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE

  var searchForm = document.querySelector('form');
  searchForm.addEventListener('submit', function(event){
    event.preventDefault();
    var searchTerm = document.querySelector('#search').value;
    if (searchTerm != ""){
      //document.querySelector('#search').value = "";
      $.get('https://omdb-api.now.sh/?s=' + searchTerm, function(data){

        movies.length = 0;
        for(var i = 0; i < data.Search.length; i++){
          var movie = {};
          movie.title = data.Search[i].Title;
          movie.poster = data.Search[i].Poster;
          movie.year = data.Search[i].Year;
          movie.id = data.Search[i].imdbID;
          movies.push(movie);
          console.log(data.Search[i]);
        }
//console.log(data);
      // if (movie.id){
      //   $.get('https://omdb-api.now.sh/?i=' + movies[i].id, function(data){
      //     movies.plot = data.Plot;
      //   })
      // }


//console.log(data);
// console.log(movies);
//         for (var i = 0; i < movies.length; i++){
//
//           var wrapping_function = function(contextCopy){
//             $.get('https://omdb-api.now.sh/?i=' + movies[i].id, function(data){
//               movies[contextCopy].plot = data.Plot;
//               console.log(data);
//
//               renderMovies();
//             });
//           };
//           wrapping_function(i);
//         }


        // var template = "<div class=\"row\"><div class=\"col s12 m7\"><div class=\"card\"><div class=\"card-image\"><img src=\"$poster$\"><span class=\"card-title\">$title$</span></div><div class=\"card-content\"></div><div class=\"card-action\"><a href=\"#\">$id$</a></div></div></div></div>";
        //
        //
        // for (var i = 0; i < data.Search.length; i++) {
        //   var movie = data.Search[i];
        //   var movie_html = template.replace("$poster$", movie.Poster);
        //   movie_html = movie_html.replace("$title$", movie.Title);
        //   movie_html = movie_html.replace("$id$", movie.imdbID);
        //   $('#listings').append(movie_html);
        // }
      });
    }
  renderMovies();
  });
})();
