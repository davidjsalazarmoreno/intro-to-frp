document.addEventListener('DOMContentLoaded', function() {
  var startupRequestStream = Rx.Observable.just('https://api.github.com/users');
  var refreshButton = document.querySelector('.refresh');
  var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

  var requestOnRefreshStream = refreshClickStream.map(function() {
    var randomOffset = Math.floor(Math.random() * 500);
    console.log(randomOffset);
    return 'https://api.github.com/users?since=' + randomOffset;
  });

  var requestStream = Rx.Observable.merge(
    requestOnRefreshStream,
    startupRequestStream
  );

  var responseStream = requestStream.flatMap(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });

  responseStream.subscribe(function(response) {
    console.log(response);
  });
});
