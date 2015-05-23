var Twit = require('twit');
var fs = require('fs');
var twit = new Twit({
	consumer_key : '***',
	consumer_secret : '***',
	access_token : '***',
	access_token_secret : '***'
});

var uk = [ '-9.23', '49.84', '2.69', '60.85' ];
//var stream = twit.stream('statuses/filter', { locations: uk });
var stream = twit.stream('statuses/filter', { track: 'microsoft' });
var log = fs.createWriteStream('C:/Users/Salman/Desktop/tweets.log');

stream.on('tweet', processTweet);


var gCount = 0;

function filterTweet(tweet){
	var regexp = /[Mm]icrosoft/g;
	if(regexp.test(tweet.text)){
		console.log(tweet.text);
	}
	return tweet;
}

function processTweet(tweet) {
  //console.log(tweet);
	var strTweet = JSON.stringify(tweet);
	filterTweet(tweet)

	gCount += 1
	if(gCount % 10 == 0){
		//console.log('print ' + gCount.toString() + ' : ' + strTweet);
	}
	log.write(strTweet)
};
