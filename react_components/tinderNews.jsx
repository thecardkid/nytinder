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
	propTypes: {
		updateSeen: React.PropTypes.func.isRequired,
		articles: React.PropTypes.array.isRequired,
	},

	getInitialState: function() {
		console.log('received:', this.props.articles);
    return {
    	vw: size*document.documentElement.clientWidth/100,
    	// articles: testdata, // TODO: change this to this.props.articles
    	currArticle: 0,
    	hover: false,
    }
	},

	updateVw: function() {
		this.setState({
			vw: size*document.documentElement.clientWidth/100
		});
		console.log(this.state.vw);
	},

	componentDidMount: function() {
    window.addEventListener('resize', this.updateVw);
	},

	handleNext: function() {
		var next = Math.min(this.state.currArticle+1, this.props.articles.length-1);
		this.setState({
			currArticle: next
		});
		// this.props.updateSeen();
	},

	handleSave: function() {
		var save;
		if (this.state.currArticle+1 < this.props.articles.length)
			save = this.state.currArticle;
		console.log(this.props.articles[save]);
		this.handleNext();
		if (save) {
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
      			return <Article article={root.props.articles[i]} 
      											style={style} 
      											hovering={root.state.hover}
      											vw={root.state.vw/size}/>
      		}}
        </Motion>
      )
    });
		var w = 8, h = 3;
		return (
      <div>
        <div id='tinder-buttons'>
        	<div className='box' id='next' onClick={this.handleNext}>
        		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
							<line className="top" x1="0" y1="0" x2={w*this.state.vw/40} y2="0"/>
							<line className="left" x1="0" y1={h*this.state.vw/40} x2="0" y2="0"/>
							<line className="bottom" x1={w*this.state.vw/40} y1={h*this.state.vw/40} x2="0" y2={h*this.state.vw/40}/>
							<line className="right" x1={w*this.state.vw/40} y1="0" x2={w*this.state.vw/40} y2={h*this.state.vw/40}/>
						</svg>
						<span>Next</span>
					</div>
					<div className='box' id='save' onClick={this.handleSave}>
        		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
							<line className="top" x1="0" y1="0" x2={w*this.state.vw/40} y2="0"/>
							<line className="left" x1="0" y1={h*this.state.vw/40} x2="0" y2="0"/>
							<line className="bottom" x1={w*this.state.vw/40} y1={h*this.state.vw/40} x2="0" y2={h*this.state.vw/40}/>
							<line className="right" x1={w*this.state.vw/40} y1="0" x2={w*this.state.vw/40} y2={h*this.state.vw/40}/>
						</svg>
						<span>Save</span>
					</div>
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





