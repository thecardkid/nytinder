var Article = require('./article.jsx');
var TinderButton = require('./tinderButton.jsx');

// Animation modules
var spring = require('react-motion').spring;
var TransitionMotion = require('react-motion').TransitionMotion;
var Motion = require('react-motion').Motion;

// Other globals
var springSettings = {stiffness: 170, damping: 26}; // Animation spring
var size = 40; // Number of viewwidths for background image

var TinderNews = React.createClass({
	propTypes: {
		articles: React.PropTypes.array.isRequired,
		currArticle: React.PropTypes.number.isRequired,
		addSavedArticle: React.PropTypes.func.isRequired,
		pageChange: React.PropTypes.func.isRequired,
	},

	getInitialState: function() {
    return {
    	vw: size*document.documentElement.clientWidth/100,
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
		this.props.onNext();
	},

	handleSave: function() {
		var save;
		if (this.props.currArticle+1 < this.props.articles.length)
			save = this.props.currArticle;
		this.handleNext();
		console.log(save);
		if (save+1) {
			console.log('saving');
			this.props.addSavedArticle(this.props.articles[save]);
		}
	},

	changeHover: function() {
		this.setState({
			hover: !this.state.hover
		});
	},

	render: function() {
		var root = this;

		// Compute new dimensions for each photo used
		var photos = this.props.articles.map(function(elem, i) {
			return [elem.img.width * (root.state.vw)/elem.img.height, root.state.vw];
		});

		// Figure out how to line up the article divs to
		// set them up for animation
		var currWidth = photos[this.props.currArticle][0];
		var currHeight = photos[this.props.currArticle][1];

		var widths = photos.map(function(elem, i) {
			return currHeight/elem[1] * elem[0];
		});

		var leftStartCoords = 0;
		if (this.props.currArticle != 0) {
			leftStartCoords = widths.slice(0, this.props.currArticle).reduce(function(prev, elem, i, arr) {
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
      			return <Article article={root.props.articles[i]} 
      											style={style} 
      											hovering={root.state.hover}
      											vw={root.state.vw/size}/>
      		}}
        </Motion>
      )
    });
		var w = 8, h = 3, unitvw = this.state.vw/40;
		var lines = [
			[0, 0, w*unitvw, 0],
			[0, h*unitvw, 0, 0],
			[w*unitvw, h*unitvw, 0, h*unitvw],
			[w*unitvw, 0, w*unitvw, h*unitvw]
		];

		return (
      <div>
        <div id='tinder-buttons'>
        	<button id='next' onClick={this.handleNext}>Next</button>
					<button id='save' onClick={this.handleSave}>Save</button>
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
        <div className='centering-div'>
          <button onClick={this.props.pageChange}>To Dashboard</button>
        </div>
      </div>
    );
	}
});

module.exports = TinderNews;





