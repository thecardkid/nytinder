// Top component of app.

var TimeTinderBox = require('./timetinderbox.jsx');

// Different views
var TinderNews = require('./tinderNews.jsx');
var LoginPage = require('./loginPage.jsx');

//Navbar
var Navbar = require('./navbar.jsx')
var userId = '56e055c93edfa81f66a5a1e9';

var DisplayEnum = Object.freeze({
	DISPLAY_DASHBOARD: 0,
	DISPLAY_TINDERNEWS: 1,
	DISPLAY_LOGIN: 2,
});

var TinderTimesApp = React.createClass({
	getInitialState: function() {
    return {
    	user: {},
    	display: DisplayEnum.DISPLAY_LOGIN,
    	articles: [{ 
    		url: '#',
		    byline: '',
		    abstract: 'There are no more new articles',
		    headline: 'Check again tomorrow!',
		    date: '',
		    articleId: 0,
		    img: 
		     { url: 'http://vignette1.wikia.nocookie.net/playstationallstarsfanfictionroyale/images/b/b3/Sad-Puppy-Face-Picture.jpg/revision/latest/scale-to-width-down/628?cb=20130529190645',
		       height: 480,
		       width: 628 } 
		     },
	     ],
    };
	},

	componentDidMount: function() {
		this.loadArticlesFromServer();
		// this.loadUserData();
    return null;
	},

	handleUserLogin: function(username) {
		$.ajax({
			url: '/api/user',
			dataType: 'json',
			cache: false,
			type: 'POST',
			data: {
				'username': username
			},
			success: function(user) {
				this.setState({
					user: user,
					display: DisplayEnum.DISPLAY_DASHBOARD,
				});
			}.bind(this),
			failure: function(xhr, status, err) {
				console.error('POST /api/user', status, err.toString());
			}.bind(this)
		});
	},

	handleFacebookLogin: function() {
		console.log('facebook');
	},

	updateUserSeenArticles: function() {
		$.ajax({
			url: '/api/user',
			dataType: 'json',
			cache: false,
			type: 'PUT',
			data: {
				'userId': userId,
				'seen': 1
			},
			success: function(status) {
				console.log(status);
			}.bind(this),
			error: function(xhr, status, err) {
				console.error('/api/article', status, err.toString());
			}.bind(this)
		})
	},

	loadArticlesFromServer: function() {
		// Get all articles from NYTimes and update this.state.display
		$.ajax({
			url: '/api/article',
			dataType: 'json',
			cache: false,
			type: 'POST',
			data: {
				'userId': userId,
			},
			success: function(serverArticles) {
				console.log('received', serverArticles.data);
				this.setState({articles: serverArticles.data.concat(this.state.articles)});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error('/api/article', status, err.toString());
			}.bind(this)
		});
	},

	// loadUserData: function () {
	// 	console.log('Getting user');
	// 	$.ajax({
	// 		url: "api/user/"+userId,
	// 		dataType: 'json',
	// 		type: 'GET',
	// 		cache: false,
	// 		success: function(user) {
	// 			console.log('user from server', user);
	// 	  	this.setState({user: user});
	// 	  	console.log('state', this.state);
	// 		}.bind(this),
	// 		error: function(xhr, status, err) {
	// 			console.error(this.props.url, status, err.toString());
	// 		}.bind(this)
	// 	});
	// },

	handleArticlePost: function() {
		// Add new article to user's info
	},

	handlePageChange: function(ev) {
		this.setState({
			display: Number(ev.target.value)
		});
	},

	render: function() {
		var page;

		switch (this.state.display) {
			case DisplayEnum.DISPLAY_DASHBOARD:
				console.log('userarticles', this.state);
				page = (
					<div>
						<TimeTinderBox articles={this.state.user.savedArticles || []}
						/>
					</div>
				);
				break;

			case DisplayEnum.DISPLAY_TINDERNEWS:
				page = (
					<div>
					  <TinderNews articles={this.state.articles || []}
					  	updateSeen={this.updateUserSeenArticles}
				  	/>
				  </div>
				);
				break;

			case DisplayEnum.DISPLAY_LOGIN:
				page = (
					<div>
						<LoginPage onFacebookLogin={this.handleFacebookLogin}
							onUserLogin={this.handleUserLogin}
						/>
					</div>
				);
				break;
		}

		return (
			<div>
				<input
          type="range"
          min={0}
          max={2}
          value={this.state.display}
          onChange={this.handlePageChange} />
          <Navbar displayName={this.state.user.displayName} />
        {page}
			</div>
		);
	},
});

ReactDOM.render(
	<TinderTimesApp />,
  document.getElementById('content')
);