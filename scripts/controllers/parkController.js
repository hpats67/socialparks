(function(module){
  var parkController = {};

  parkController.index = function(){
    $('#park-page').fadeIn().siblings().hide();
  };

  parkController.emptyParkHtml = function(ctx, next) {
    $('#tweet').empty();
    $('#gov-data').empty();
    $('#tweet').empty();
    $('#flickr').empty();
    next();
  };
  //If your call to next isn't getting passed into your ajax call you might run into
  //race conditions. Race conditions are basically the term for "async problems" they
  //refer to when you don't know for sure what order async calls are going to come back
  //in.
  parkController.loadParkData = function(ctx, next) {
    parksObj.getPark(ctx.params.name);
    flickrData.fetchData(ctx.params.name, flickrData.populateHandlebars);
    twitter.requestTweets(ctx.params.name);

    next();
  };

  parkController.nameToCode = function(name) {
    var newName = name.replace('+', ' ');
    return parksObj.allParks.filter(function(el){
      return el.name === newName;
    })[0].code;
  };

  module.parkController = parkController;

})(window);
