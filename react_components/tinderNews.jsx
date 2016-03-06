var Article = require('./article.jsx');
var testdata = require('./testdata');

// Animation modules
var spring = require('react-motion').spring;
var TransitionMotion = require('react-motion').TransitionMotion;
var Motion = require('react-motion').Motion;

// Other globals
var springSettings = {stiffness: 170, damping: 26}; // Animation spring
var size = 40; // Number of viewwidths for background image

var TinderNews = React.createClass({
	getInitialState: function() {
    return {
    	vw: size*document.documentElement.clientWidth/100,
    	articles: testdata.data, // TODO: change this to this.props.article
    	currArticle: 0
    }
	},

	updateVw: function() {
		this.setState({
			vw: size*document.documentElement.clientWidth/100
		});
	},

	componentDidMount: function() {
    window.addEventListener('resize', this.updateVw);
	},

	handleNext: function() {
		var next = this.state.currArticle === 0 ? 1 : 0;
		this.setState({
			currArticle: next
		});
	},

	render: function() {
		var root = this;

		// Compute new dimensions for each photo used
		var photos = testdata.data.map(function(elem, i) {
			if (elem.multimedia.length > 0) {
				var image = elem.multimedia[elem.multimedia.length-1];
				return [image.width * (root.state.vw)/image.height, root.state.vw];
			} else {
				return [500 * (root.state.vw)/281, root.state.vw];
			}
		});

		// Figure out how to line up the article divs to
		// set them up for animation
		var currWidth = photos[this.state.currArticle][0];
		var currHeight = photos[this.state.currArticle][1];

		var widths = photos.map(function(elem, i) {
			return currHeight/elem[1] * elem[0];
		});

		var leftStartCoords = 0;
		if (this.state.currArticle != 0) {
			leftStartCoords = widths.slice(0, this.state.currArticle).reduce(function(prev, elem, i, arr) {
				return prev-elem;
			}, 0);
		}

		var configs = [];
		photos.reduce(function(prev, elem, i, arr) {
			configs.push({
				left: spring(prev, springSettings),
				height: spring(currHeight, springSettings),
				width: spring(widths[i], springSettings),
			});
			return prev + widths[i];
		}, leftStartCoords);

		// React variable to host all articles we have
		var articleComponents = configs.map(function(style, i) {
      return (
      	<Motion key={i} style={style}>
      		{function (style) {
      			return <Article article={root.state.articles[i]} style={style}/>
      		}}
        </Motion>
      )
    });

		return (
      <div>
        <div>
        	<button onClick={this.handleNext}>Next</button>
      	</div>
        <div className="slider">
          <Motion style={{height: spring(currHeight), width: spring(currWidth)}}>
            {function(container) {
              return (
              	<div className="slider-inner" style={container}>
	                {articleComponents}
	              </div>
              );
            }}
          </Motion>
        </div>
      </div>
    );
	}
});

module.exports = TinderNews;





