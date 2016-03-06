// var article = require('./testdata');

var Article = React.createClass({
	getInitialState: function() {
    return null;
	},

	componentDidMount: function() {
  	return null;
	},

	render: function() {
		var image = '';
		var images = this.props.article['multimedia'];
		if (images.length > 0) {
			var src = 'https://www.nytimes.com/' + images[images.length-1].url;
			image = (
				<div className='bg-image'>
					<img src={src}/>
				</div>
			);
		} else {
			var src = 'http://static01.nyt.com/images/2016/02/26/us/obama-video/obama-video-videoSmall.jpg';
			image = (
				<div className='bg-image'>
					<img src={src}/>
				</div>
			);
		}

		return (
			<div className='article-container'>
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