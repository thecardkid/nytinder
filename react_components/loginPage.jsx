var loginPage = React.createClass({
	getInitialState: function() {
    return {
     	userId: '',
     	displayName: '',
     	errorMessage: '',
    };
	},

	handleUserLogin: function() {
		console.log('Logging in as', this.state.userId)
		if (this.state.userId.length < 5 || this.state.userId.length > 20) {
			this.setState({
				errorMessage: 'Username must be between 5 and 20 characters.'
			});
		}
		// handles login with site account
	},

	handleFacebookLogin: function() {
		console.log('Logging in with facebook.');
		// $.ajax({
		// 	crossDomain: true,
		// 	url: '/auth/facebook',
		// 	dataType: 'jsonp',
		// 	cache: false,
		// 	type: 'GET',
		// 	success: function(data) {
		// 		console.log(data);
		// 	}.bind(this),
		// 	error: function(xhr, status, err) {
		// 		console.log('error', status, err.toString());
		// 	}.bind(this)
		// });
		// handles facebook login
		// href='/auth/facebook
	},

	handleUserInfoChange: function(ev) {
		console.log(ev.target.value);
		this.setState({
			userId: ev.target.value,
			displayName: ev.target.value 
		});
	},

	render: function() {
		return (
			<div>
				<div id='login-form'>
					<div id='login-error-message'>
						{this.state.errorMessage}
					</div>
					<br/>
					<input className='login-username'
								type='text'
								onChange={this.handleUserInfoChange} 
								value={this.userId} 
								placeholder='Your username'/>
					<br/>
					<div>
						<div className='login-button'>
							<a id='login-facebook' onClick={this.handleFacebookLogin}>Login with Facebook</a>
						</div>
						<div className='login-button'>
							<button id='login-create-user' onClick={this.handleUserLogin}>Log In</button>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = loginPage;