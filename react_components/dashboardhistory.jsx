var Carousel = require('./carouselstuff/carousel.jsx');
var Ease = require('ease-functions');
var testdata = require('./testdata').data;
var images = require('./images');

var get_image_url = testdata.map(function(obj){
	try {
		return "http://nytimes.com/"+ obj.multimedia[(obj.multimedia).length-1].url
	} catch(err) {
		return "https://www.petfinder.com/wp-content/uploads/2012/11/dog-how-to-select-your-new-best-friend-thinkstock99062463.jpg"
	}
});

var get_urls = testdata.map(function(obj){
	try {
		return obj.web_url
	} catch(err) {
		return "https://www.nytimes.com/"
	}
});

var get_all_necessary_info = testdata.map(function(obj){
	var new_obj = {}

	try {
		new_obj["image_url"] = "http://nytimes.com/"+ obj.multimedia[(obj.multimedia).length-1].url;
	} catch(err) {
		new_obj["image_url"] = "https://www.petfinder.com/wp-content/uploads/2012/11/dog-how-to-select-your-new-best-friend-thinkstock99062463.jpg";		
	}

	var web_url = obj.web_url || "https://www.nytimes.com/";
	var headline = obj.headline.main || "No headline";
	new_obj["web_url"] = web_url;
	new_obj["headline"] = headline;
	return new_obj;
});

console.log(get_all_necessary_info);


var DashboardHistory = React.createClass({
    getInitialState: function () {
        return {
        	all_info: get_all_necessary_info,
            width: 300,
            layout: 'classic',
            ease: 'linear',
            duration: 400
        };
    },
    componentWillMount: function () {
        this.onSides = function (event) {
            this.setState( {images: get_image_url.slice(0, event.target.value) });
        }.bind(this);
        this.onLayout = function (event) {
            this.setState({layout: event.target.value});
        }.bind(this);
        this.onDuration = function (event) {
            this.setState({duration: parseInt(event.target.value) });
        }.bind(this);
        this.onEase = function (event) {
            this.setState({ease:  event.target.value});
        }.bind(this);
    },
    render: function () {
        return (
            <div className="carouselhistory">
            	<h1>Saved Articles</h1>
                <Carousel all_info={this.state.all_info}
                		  width={this.state.width}
                          ease={this.state.ease}
                          duration={this.state.duration}
                          layout={this.state.layout}/>
            </div>
        );
    }
});

module.exports = DashboardHistory; 