var loginPage = React.createClass({
	propTypes: {
		onFacebookLogin: React.PropTypes.func.isRequired,
		onUserLogin: React.PropTypes.func.isRequired,
	},

	getInitialState: function() {
    return {
     	username: '',
     	errorMessage: '',
    };
	},

	handleUserLogin: function() {
		console.log('Logging in as', this.state.username)
		if (this.state.username.length < 5 || this.state.username.length > 20) {
			this.setState({
				errorMessage: 'Username must be between 5 and 20 characters.'
			});
		}
		this.props.onUserLogin(this.state.username);
		// handles login with site account
	},

	handleFacebookLogin: function() {
		console.log('Logging in with facebook.');
		this.props.onFacebookLogin();
	},

	handleUserInfoChange: function(ev) {
		this.setState({
			username: ev.target.value,
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