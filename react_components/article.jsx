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

		var paragraph = this.props.article.abstract || this.props.article.snippet;
		var h = this.props.article.headline.main.length > 63 ? 6.5 : 4.3; 
		var marginTop = 28;

		styleHeight = {'height': h+'vw', 'marginTop': marginTop+'vw'};

		var lines = Math.ceil(paragraph.length / 110);
		if (lines >= 4) h += 0.6;
		h += lines + 2.5;
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