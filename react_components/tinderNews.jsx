var Article = require('./article.jsx');
var testdata = require('./testdata');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var spring = require('react-motion').spring;
var TransitionMotion = require('react-motion').TransitionMotion;
var Motion = require('react-motion').Motion;
var style = {'text-align': 'center'};

var springSettings = {stiffness: 170, damping: 26};

var TinderNews = React.createClass({
	getInitialState: function() {
		var size = 60;

		var vw = document.documentElement.clientWidth/100;
		var photos = testdata.data.map(function(elem, i) {
			if (elem.multimedia.length > 0) {
				var image = elem.multimedia[elem.multimedia.length-1];
				return [image.width * (size*vw)/image.height, size*vw];
			} else {
				return [500 * (size*vw)/281, size*vw];
			}
		});

		console.log(photos);

    return {
    	articles: testdata.data,
    	photos: photos,
    	currPhoto: 0
    }
	},

	handleNext: function() {
		var next = this.state.currArticle === 0 ? 1 : 0;
		this.setState({
			currPhoto: next
		});
		// this.setState({
		// 	currPhoto: ev.target.value
		// });
	},

	render: function() {
		console.log("1vw equals ", document.documentElement.clientWidth/100);
		var data = this.state;
		var currWidth = data.photos[data.currPhoto][0];
		var currHeight = data.photos[data.currPhoto][1];

		var widths = data.photos.map(function(elem, i) {
			return currHeight/elem[1] * elem[0];
		});

		var leftStartCoords = 0;
		if (data.currPhoto != 0) {
			leftStartCoords = widths.slice(0, data.currPhoto).reduce(function(prev, elem, i, arr) {
				return prev-elem;
			}, 0);
		}

		var configs = [];
		data.photos.reduce(function(prev, elem, i, arr) {
			configs.push({
				left: spring(prev, springSettings),
				height: spring(currHeight, springSettings),
				width: spring(widths[i], springSettings),
			});
			return prev + widths[i];
		}, leftStartCoords);

		console.log(configs);

		var articleComponents = this.state.articles.map(function(article, i) {
			console.log(configs);
      return (
      	<Motion key={i} style={configs[i]}>
      		{function (style) {
      			return <Article article={article}/>
      		}}
        </Motion>
      )
    });

		return (
      <div>
        <div>
        	<button onClick={this.handleNext}>Next</button>
      	</div>
        <div className="demo4">
          <Motion style={{height: spring(currHeight), width: spring(currWidth)}}>
            {function(container) {
              return (
              	<div className="demo4-inner" style={container}>
	                {articleComponents}
	              </div>
              );
            }}
          </Motion>
        </div>
      </div>
    );

		// var thisArticle = data.data[this.state.currArticle];
		// var style = {'text-align': 'center'};
		// return (
		// 	<div>
		// 		<div style={style}>
		// 			<button onClick={this.handleNext}>Next</button>
		// 		</div>
		// 		<div>
		// 			<Motion defaultStyle={{x: 2000}} style={{x: spring(0, {stiffness: 100})}}>
		// 				{function (value) {
		// 					var style = {
		// 						'width': '100%',
		// 						'margin-left': value.x,
		// 					}
		// 					return (
		// 						<div style={style}>
		// 							<Article article={thisArticle}/>
		// 						</div>
		// 					)
		// 				}}
		// 			</Motion>
		// 		</div>
		// 	</div>
	}
});

module.exports = TinderNews;





