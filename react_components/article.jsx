var spring = require('react-motion').spring;

var Article = React.createClass({
	render: function() {
		var images = this.props.article['multimedia'];
		var src = 'http://www.trbimg.com/img-56b0e859/turbine/la-na-inside-iowa-caucus-precinct-20160202';
		
		if (images.length > 0) {
			var src = 'https://www.nytimes.com/' + images[images.length-1].url;
		}

		var image = (
			<div className='bg-image'>
				<img src={src}/>
			</div>
		);

		return (
			<div className='container' style={this.props.style}>
				{image}
				<div className='article-words'>
					<div className='article-header'>
						<h1>{this.props.article['headline']['main']}</h1>
					</div>
					<div className='article-content'>
						{this.props.article['lead_paragraph']}
					</div>
				</div>
				<br/><br/>
			</div>
		)
	}
});

module.exports = Article;