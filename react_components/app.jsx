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
		this.loginFacebook();
    return null;
	},

	handleUserLogin: function() {
		// $.ajax({
		// 	url: '/api/user',
			
		// })
	},

	loginFacebook: function(){
		console.log("HERE IN LOGIN FACEBOOK LAND")
		var parentThis = this;
		$.ajax({
		  	url: '/api/login',
		  	dataType: 'json',
		  	type: 'GET',
		 	success: function(data) {
		 		console.log(data)
		 		this.loadArticlesFromServer(data._id);
		    	this.setState({display: DisplayEnum.DISPLAY_DASHBOARD, user: data});
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
				'userId': this.state.mongoid,
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
		// Get all articles from NYTimes and update this.state.display
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
						<TimeTinderBox articles={this.state.user.savedArticles}/>
					</div>
				);
				break;

			case DisplayEnum.DISPLAY_TINDERNEWS:
				page = (
					<div>
					  <TinderNews articles={this.state.articles}
					  	updateSeen={this.updateUserSeenArticles}/>
				  </div>
				);
				break;

			case DisplayEnum.DISPLAY_LOGIN:
				page = (
					<div>
						<LoginPage/>
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