document.addEventListener('DOMContentLoaded', function() {
  var startupRequestStream = Rx.Observable.just('https://api.github.com/users');
  var refreshButton = document.querySelector('.refresh');
  var closeButton1 = document.querySelector('.close1');
  var closeClickStream = Rx.Observable.fromEvent(close1Button, 'click');
  var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

  var requestStream = refreshClickStream.startWith('click at startup').map(function() {
    var randomOffset = Math.floor(Math.random() * 500);
    console.log(randomOffset);
    return 'https://api.github.com/users?since=' + randomOffset;
  });

  var responseStream = requestStream.flatMap(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });

  var suggestion1Stream = responseStream.startWith('startup click').combineLatest(responseStream,
    return function(click, listUsers) {
      // get one random user from list
      return listUsers[ Math.floor(Math.random()*listUsers.length) ];
    }
  ).merge(
    refreshClickStream.map(function() { return null; })
  ).startWith( null );

  responseStream.subscribe(function(response) {
    console.log(response);
  });

  suggestion1Stream.subscribe(function(suggestion) {
    if ( suggestion === null ) {
      // Hide first suggestion DOM Element
    } else {
      // Show the first suggestion DOM element
      // and render data
      console.log(suggestion);
    }
  });
});
