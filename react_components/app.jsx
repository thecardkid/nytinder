// Top component of app.

var TimeTinderBox = require('./timetinderbox.jsx');

ReactDOM.render(
	<TimeTinderBox />,
  	document.getElementById('content')
);

// // Different views
// var TinderNews = require('./tinderNews.jsx');
// var LoginPage = require('./loginPage.jsx');

// var DisplayEnum = Object.freeze({
// 	DISPLAY_DASHBOARD: 0,
// 	DISPLAY_TINDERNEWS: 1,
// 	DISPLAY_LOGIN: 2,
// });

// var TinderTimesApp = React.createClass({
// 	getInitialState: function() {
//     return {
//     	display: DisplayEnum.DISPLAY_LOGIN,
//     };
// 	},

// 	componentDidMount: function() {
//     return null;
// 	},

// 	handleArticlesGet: function() {
// 		// Get all articles from NYTimes and update this.state.display
// 	},

// 	loadUserData: function() {
// 		// Get user's history and info from DB
// 	},

// 	handleArticlePost: function() {
// 		// Add new article to user's info
// 	},

// 	handlePageChange: function(ev) {
// 		this.setState({
// 			display: Number(ev.target.value)
// 		});
// 	},

// 	render: function() {
// 		var page;

// 		switch (this.state.display) {
// 			case DisplayEnum.DISPLAY_DASHBOARD:
// 				page = (
// 					<div>
// 						<h1>This is your dashboard.</h1>
// 					</div>
// 				);
// 				break;

// 			case DisplayEnum.DISPLAY_TINDERNEWS:
// 				page = (
// 					<div>
// 					  <TinderNews />
// 				  </div>
// 				);
// 				break;

// 			case DisplayEnum.DISPLAY_LOGIN:
// 				page = (
// 					<div>
// 						<LoginPage />
// 					</div>
// 				);
// 				break;
// 		}

// 		return (
// 			<div>
// 				<input
//           type="range"
//           min={0}
//           max={2}
//           value={this.state.display}
//           onChange={this.handlePageChange} />
//         {page}
// 			</div>
// 		);
// 	},
// });

// ReactDOM.render(
// 	<TinderTimesApp />,
//   document.getElementById('content')
// );