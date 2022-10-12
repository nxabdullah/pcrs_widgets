# Welcome to PCRSWidgets!

PCRSWidgets is an open source project aiming to provide a semi-independent PCRS client. This client will function as long as the PCRS server is configured properly. Currently, it supports fetching and displaying <b>multiple choice problems</b>, as well as posting submissions and displaying the user's score as provided by the PCRS server. 


## Configuring PCRS
*Note: please ensure that you are using PCRS version 3.10*

Minor configurations are required inside of the PCRS server the client will connect to. 

1. Ensure that the package `django-cors-headers` is installed. 

2. On `settings_local.py`, add the following middlewares into the `MIDDLEWARE` tuple: 
	 - `'corsheaders.middleware.CorsMiddleware'`		
	- `'anonymous_submissions.middleware.AnonymousSubmissionsMiddleware'`

	Note: add the cors middleware as high up as possible. Whereas, for the anonymous submissions middleware, add it right below the authentication middleware. 
 3. Add `'corsheaders'` inside of `INSTALLED_APPS`
4. Configure your CORS as described below. Simply add the following snippet somewhere inside of `settings_local.py`
	```
	CORS_ALLOW_CREDENTIALS = True
	SESSION_COOKIE_HTTPONLY = False

	# Add the domain/URL of the PCRSWidgets here
	# So that PCRS allows you to make cross-domain requests.
	CORS_ORIGIN_WHITELIST = ( 
			'http://localhost:5501', 
			'http://127.0.0.1:5501' 
	)

	# We will use sessionid header to send the session key
	# back to the server (since cookies are not allowed). 
	CORS_EXPOSE_HEADERS = ['Content-Type']
	CORS_ALLOW_HEADERS = list(default_headers) + ['sessionid'] + ['anon']

	```
	
	Please make sure to import the following `from corsheaders.defaults import default_headers`
	


That's all! Your PCRS server is now CORS configured :sunglasses:


## Configuring the frontend
1. on `index.js`, replace the url inside of `API_URL` with your own PCRS server url. 
2. To add a multiple choice problem, you need to setup the correct HTML. The current `index.html` has examples of this, all you need to do is copy the widget, but replace the `id` with the `id` of the problem you want. For example, you would change `multiple_choice-1` to `multiple_choice-2` in your widget, wherever seen. 
3. Lastly, you need to tell `index.js` to render the problem, this can be done with a single function, `render_problem(<insert id here>)`
