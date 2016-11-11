document.addEventListener('DOMContentLoaded', function() {
  var startupRequestStream = Rx.Observable.just('https://api.github.com/users');
  var refreshButton = document.querySelector('.refresh');
  var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

  var requestStream = refreshClickStream.startWith('click at startup').map(function() {
    var randomOffset = Math.floor(Math.random() * 500);
    console.log(randomOffset);
    return 'https://api.github.com/users?since=' + randomOffset;
  });

  var responseStream = requestStream.flatMap(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });

  responseStream.subscribe(function(response) {
    console.log(response);
  });
});
