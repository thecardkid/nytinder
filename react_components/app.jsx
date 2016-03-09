// Top component of app.

var TimeTinderBox = require('./timetinderbox.jsx');

// Different views
var TinderNews = require('./tinderNews.jsx');
var LoginPage = require('./loginPage.jsx');

console.log(process.env);

var DisplayEnum = Object.freeze({
	DISPLAY_DASHBOARD: 0,
	DISPLAY_TINDERNEWS: 1,
	DISPLAY_LOGIN: 2,
});

var TinderTimesApp = React.createClass({
	getInitialState: function() {
	    return {
	    	display: DisplayEnum.DISPLAY_DASHBOARD,
	    	userArticles: [],
	    };
	},

	componentDidMount: function() {
    	this.loadUserArticlesFromServer();
	},

	loadUserArticlesFromServer: function () {
		$.ajax({
			url: "api/user/56e086a827d1cafe246f7bc0",
			dataType: 'json',
			type: 'GET',
			success: function(data) {
				console.log(data.articles);
			  	this.setState( {userArticles: data.articles});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	loadUserData: function() {
		// Get user's history and info from DB
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
				console.log('userarticles', this.state.userArticles);
				page = (
					<div>
						<TimeTinderBox articles={this.state.userArticles}/>
					</div>
				);
				break;

			case DisplayEnum.DISPLAY_TINDERNEWS:
				page = (
					<div>
					  <TinderNews />
				  </div>
				);
				break;

			case DisplayEnum.DISPLAY_LOGIN:
				page = (
					<div>
						<LoginPage />
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