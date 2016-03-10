// Top component of app.

var TimeTinderBox = require('./timetinderbox.jsx');

// Different views
var TinderNews = require('./tinderNews.jsx');
var LoginPage = require('./loginPage.jsx');

//Navbar
var Navbar = require('./navbar.jsx')

var DisplayEnum = Object.freeze({
	DISPLAY_DASHBOARD: 0,
	DISPLAY_TINDERNEWS: 1,
	DISPLAY_LOGIN: 2,
});

var endArticle = { 
	url: '#',
  byline: '',
  abstract: 'There are no more new articles',
  headline: 'Check again tomorrow!',
  date: '',
  articleId: 0,
  img: { 
  	url: 'http://vignette1.wikia.nocookie.net/playstationallstarsfanfictionroyale/images/b/b3/Sad-Puppy-Face-Picture.jpg/revision/latest/scale-to-width-down/628?cb=20130529190645',
		height: 480,
		width: 628 
	} 
};

var TinderTimesApp = React.createClass({
	getInitialState: function() {
    return {
    	user: {},
    	display: DisplayEnum.DISPLAY_TINDERNEWS,
    	articles: [endArticle],
    };
	},

	componentDidMount: function() {
		this.loginFacebook();
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
				this.loadArticlesFromServer(user._id);
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

	loginFacebook: function(){
		$.ajax({
		  	url: '/api/login',
		  	dataType: 'json',
		  	type: 'GET',
		 	success: function(user) {
		 		this.loadArticlesFromServer(user._id);
		    	this.setState({
		    		display: DisplayEnum.DISPLAY_DASHBOARD, 
		    		user: user,
	    		});
		  	}.bind(this),
		  	error: function(xhr, status, err) {
		  		console.log("error!")
		    	this.setState({display: DisplayEnum.DISPLAY_LOGIN});
		  	}.bind(this)
		});
	},

	updateUserSeenArticles: function() {
		$.ajax({
			url: '/api/user',
			dataType: 'json',
			cache: false,
			type: 'PUT',
			data: {
				'userId': this.state.user._id,
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

	loadArticlesFromServer: function(mongoid) {
		$.ajax({
			url: '/api/article',
			dataType: 'json',
			cache: false,
			type: 'POST',
			data: {
				'userId': mongoid,
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

	addArticleToUser: function(newArticle) {
		console.log(newArticle);
		var data0 = {'_id': this.state.user._id, newArticle: newArticle};
		$.ajax({
			url: '/api/user/newarticle/',
			dataType: 'json',
			cache: false,
			type: 'POST',
			data: {data: JSON.stringify(data0)},
			success: function(data) {
				if (data.status === 'added') {
					this.state.user.savedArticles.push(newArticle);
					this.setState({
						user: this.state.user
					});
					console.log('saved');
				}
			}.bind(this),
			error: function(xhr, status, err) {
				console.error('/api/user/newArticle', status, err.toString());
			}.bind(this)
		});
	},

	handlePageChange: function(ev) {
		this.setState({
			display: Number(ev.target.value)
		});
	},

	render: function() {
		var page;
		console.log('userarticles', this.state.user.displayName);

		switch (this.state.display) {
			case DisplayEnum.DISPLAY_DASHBOARD:
				page = (
					<div>
						<Navbar displayName={this.state.user.displayName || ''} />
						<div>
							<TimeTinderBox articles={this.state.user.savedArticles || []}/>
						</div>
					</div>
				);
				break;

			case DisplayEnum.DISPLAY_TINDERNEWS:
				page = (
					<div>
						<Navbar displayName={this.state.user.displayName || ''} />
						<div>
						  <TinderNews articles={this.state.articles || []}
						  	updateSeen={this.updateUserSeenArticles}
						  	addSavedArticle={this.addArticleToUser}/>
					  </div>
				  </div>
				);
				break;

			case DisplayEnum.DISPLAY_LOGIN:
				page = (
					<div>
						<LoginPage onUserLogin={this.handleUserLogin}/>
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
        {page}
			</div>
		);
	},
});

ReactDOM.render(
	<TinderTimesApp />,
  document.getElementById('content')
);