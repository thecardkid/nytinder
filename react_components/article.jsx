var article = require('./testdata');

var Article = React.createClass({
	getInitialState: function() {
    return null;
	},

	componentDidMount: function() {
  	return null;
	},

	render: function() {
		var image = '';
		var images = article['multimedia'];
		if (images) {
			var src = 'https://www.nytimes.com/' + images[images.length-1].url;
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
						<h1>{article['headline']['main']}</h1>
					</div>
					<div className='article-content'>
						<p>{article['abstract']}</p>
						<p>{article['lead_paragraph']}</p>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Article;