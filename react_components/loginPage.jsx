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
		// handles facebook login
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
							<a id='login-facebook' href='/auth/facebook'>Login with Facebook</a>
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