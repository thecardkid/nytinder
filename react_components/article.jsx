var spring = require('react-motion').spring;

var Article = React.createClass({
	render: function() {
		console.log(this.props.hovering);
		var images = this.props.article['multimedia'];
		var src = 'http://www.trbimg.com/img-56b0e859/turbine/la-na-inside-iowa-caucus-precinct-20160202';
		
		if (images.length > 0) {
			var image = images.filter(function(elem) {
				return elem.subtype === 'xlarge';
			})[0];

			if (image) {
				var src = 'https://www.nytimes.com/' + image.url;
			}
		}

		var image = (
			<div className='bg-image'>
				<img src={src}/>
			</div>
		);

		var h = 4.3;
		var styleHeight = {'height': '4.3vw', 'marginTop': '28vw'};
		if (this.props.article.headline.main.length > 63) {
			h = 6.5;
			styleHeight.height = '6.5vw';
		}

		var paragraph = this.props.article.abstract || this.props.article.snippet;
		var lines = Math.ceil(paragraph.length / 110);
		h += lines + 2.5;
		if (lines >= 4) h += 0.6;
		console.log(h+'vw');
		var m = 27 - lines;

		if (this.props.hovering) {
			styleHeight.height = h + 'vw';
			styleHeight.marginTop = m + 'vw';
		}

		return (
			<div className='container' style={this.props.style}>
				{image}
				<div className='article-words' style={styleHeight}>
					<div className='article-header'>
						<h1>{this.props.article['headline']['main'].replace('&amp;', '&')}</h1>
					</div>
					<div className='article-content'>
						{paragraph}
					</div>
				</div>
				<br/><br/>
			</div>
		)
	}
});

module.exports = Article;