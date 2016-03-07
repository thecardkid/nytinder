var Article = require('./article.jsx');
var testdata = require('./testdata').data;

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
    	articles: testdata, // TODO: change this to this.props.article
    	currArticle: 0,
    	hover: false,
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
		var next = 0;
		if (this.state.currArticle+1 < this.state.articles.length) {
			next = this.state.currArticle+1;
		}
		this.setState({
			currArticle: next
		});
	},

	changeHover: function() {
		console.log('changing');
		this.setState({
			hover: !this.state.hover
		});
	},

	render: function() {
		var root = this;

		// Compute new dimensions for each photo used
		var photos = testdata.map(function(elem, i) {
			var dims = [500 * (root.state.vw)/281, root.state.vw];
			if (elem.multimedia.length > 0) {
				var image = elem.multimedia.filter(function(elem) {
					return elem.subtype === 'xlarge';
				})[0];

				if (image) {
					dims = [image.width * (root.state.vw)/image.height, root.state.vw];
				}
			}
			return dims;
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
      			return <Article article={root.state.articles[i]} style={style} hovering={root.state.hover}/>
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
              	<div className="slider-inner" 
              			style={container}
              			onMouseOver={root.changeHover}
              			onMouseOut={root.changeHover}>
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





