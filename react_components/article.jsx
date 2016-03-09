var spring = require('react-motion').spring;

var Article = React.createClass({
	propTypes: {
		style: React.PropTypes.object.isRequired,
		hovering: React.PropTypes.bool.isRequired,
		article: React.PropTypes.object.isRequired,
	},

	render: function() {
		var h = this.props.article.headline.length > (this.props.style.width/16.1) ? 6.5 : 4.3; 
		var marginTop = 28;

		var styleHeight = {'height': h+'vw', 'marginTop': marginTop+'vw'};

		var lines = Math.ceil(this.props.article.abstract.length / (this.props.style.width/8.6));
		if (lines >= 3) h += 0.6;
		h += lines + 2.5;
		var m = 27 - lines;

		if (this.props.hovering) {
			styleHeight.height = h + 'vw';
			styleHeight.marginTop = m + 'vw';
		}

		return (
			<div className='container' style={this.props.style}>
				<div className='bg-image'>
					<img src={this.props.article.img.url}/>
				</div>
				<div className='article-words' style={styleHeight}>
					<div className='article-header'>
						<h1>{this.props.article.headline.replace('&amp;', '&')}</h1>
					</div>
					<div className='article-content'>
						{this.props.article.abstract}
					</div>
				</div>
				<br/><br/>
			</div>
		)
	}
});

module.exports = Article;