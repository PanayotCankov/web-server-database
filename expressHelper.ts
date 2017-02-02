// Created by trevor on 2/2/17.
import helmet = require("helmet");
import bodyParser = require("body-parser");

export function MakeExpressAppMoreSecure(app: any) {
	app.use(helmet({hidePoweredBy: false}));
	app.use(function (req, res, next) {
		res.header("X-Powered-By", "Blood, sweat, and tears!");
		next();
	});
}

export function CommonExpressConfig(app: any) {
	app.use(bodyParser.urlencoded({
		extended: true
	}));
}

export function ExposeApp(app: any) {
	let env = process.env.NODE_ENV || 'dev';
	if (env === 'dev') {
		app.set('views', process.cwd());
		app.engine('html', require('ejs').renderFile);
		app.set('view engine', 'html');
		app.get('/', (req, res, next) => res.render('index'));
	}

	let port = 3000;
	if (process.env.PORT)
		port = process.env.PORT;

	app.listen(port, () => console.log('listening on port: ' + port));
}