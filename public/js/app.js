(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Top component of app.
var Article = require('./article.jsx');

ReactDOM.render(
  React.createElement(Article, null),
  document.getElementById('content')
);
},{"./article.jsx":2}],2:[function(require,module,exports){
var article = require('./testdata');

var Article = React.createClass({displayName: "Article",
	getInitialState: function() {
    return null;
	},

	componentDidMount: function() {
  	return null;
	},

	render: function() {
		var image = '';
		var images = article['multimedia'];
		if (images) {
			var src = 'https://www.nytimes.com/' + images[images.length-1].url;
			image = (
				React.createElement("div", {className: "bg-image"}, 
					React.createElement("img", {src: src})
				)
			);
		}

		return (
			React.createElement("div", {className: "article-container"}, 
				image, 
				React.createElement("div", {className: "article-words"}, 
					React.createElement("div", {className: "article-header"}, 
						React.createElement("h1", null, article['headline']['main'])
					), 
					React.createElement("div", {className: "article-content"}, 
						article['lead_paragraph']
					)
				), 
				React.createElement("br", null), React.createElement("br", null)
			)
		)
	}
});

module.exports = Article;
},{"./testdata":3}],3:[function(require,module,exports){
module.exports = {
	"web_url": "http://www.nytimes.com/2012/01/01/us/politics/republicans-wage-hidden-ground-war-in-iowa.html",
	"snippet": "Far from candidates’ spotlights, hundreds of aides and volunteers are waging an unglamorous ground war unfolding with hidden intensity.",
	"lead_paragraph": "DES MOINES -- A few days before the Iowa caucuses, Newt Gingrich's campaign headquarters just outside the city is a spectacle of pre-computer-age disorder, with volunteers rushing voter updates across the room on yellow Post-it notes. At the offices of Mitt Romney, who has built a ground organization aimed at matching the intensity of his television advertising barrage, aides are methodically analyzing data on each voter to create the perfect pitch: those worried about illegal immigration, for example, are invited to join a conference call with a border county sheriff in Arizona.",
	"abstract": "Hundreds of campaign staff members, aides and volunteers are waging an unglamorous ground war that will largely determine the outcome of the Republican presidential caucuses in Iowa; in the closing hours before the caucuses, the tedious and time-consuming work of identifying voters and persuading them to show up at the caucuses could make the difference among Republican who cannot seem to make up their minds. Photos (L)d",
	"print_page": "1",
	"blog": [ ],
	"source": "The New York Times",
	"multimedia": [
		{
			"url": "images/2012/01/01/us/01ground-span/01ground-span-thumbStandard.jpg",
			"subtype": "thumbnail",
			"legacy": {
				"hasthumbnail": "Y",
				"thumbnailheight": 75,
				"thumbnail": "images/2012/01/01/us/01ground-span/01ground-span-thumbStandard.jpg"
			},
			"type": "image",
			"height": 75
		},
		{
			"width": 600,
			"url": "images/2012/01/01/us/01ground-span/01ground-span-articleLarge.jpg",
			"height": 370,
			"subtype": "xlarge",
			"legacy": {
				"xlargewidth": 600,
				"xlargeheight": 370,
				"xlarge": "images/2012/01/01/us/01ground-span/01ground-span-articleLarge.jpg",
				"hasxlarge": "Y"
			},
			"type": "image"
		}
	],
	"headline": {
		"main": "Over Phones and Greasy Pizza, a Battle for Iowa"
	},
	"keywords": [
		{
			"name": "subject",
			"value": "PRESIDENTIAL ELECTION OF 2012"
		}
	],
	"pub_date": "2012-01-01T00:00:00Z",
	"document_type": "article",
	"news_desk": "National Desk",
	"section_name": "Front Page; U.S.",
	"byline": {
		"person": [
			{
				"firstname": "A.",
				"middlename": "G.",
				"lastname": "SULZBERGER",
				"rank": 1,
				"role": "reported",
				"organization": ""
			},
			{
				"organization": "",
				"role": "reported",
				"firstname": "Michael",
				"rank": 2,
				"lastname": "BARBARO"
			}
		],
		"original": "By A. G. SULZBERGER and MICHAEL BARBARO"
	},
	"word_count": 2365,
	"type_of_material": "News",
	"_id": "4fd2ba9a8eb7c8105d8b0a8b"
}
},{}]},{},[1]);
