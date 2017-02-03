// Created by trevor on 2/2/17.
import * as express from 'express';
import helmet = require("helmet");
import {privateLogs, default as logs} from "./server/logs";
let bodyParser = require("body-parser");

export class APIModule {
	router: express.Router;
	name: string;
}

export class App {
	public express: express.Application;
	public APIModules: APIModule[] = [];

	constructor() {
		this.express = express();
		this.middleware();
	}

	private middleware() {
		this.express.use(helmet({hidePoweredBy: false}));
		this.express.use(function (req, res, next) {
			res.header("X-Powered-By", "Blood, sweat, and tears!");
			next();
		});
		this.express.use(bodyParser.urlencoded({
			extended: true
		}));
		this.express.get('/logs', function (req: any, res: any) {
			res.json(privateLogs);
		});
	}

	private api() {
		let router = express.Router();

		for (let i = 0; i < this.APIModules.length; ++i) {
			router.use('/' + this.APIModules[i].name, this.APIModules[i].router);
		}

		router.get('/', (req: any, res: any) => res.send('This is the root of the API of the api. Thank Trevor Von Seggern!'));
		this.express.use('/api', router);
	}

	public listen(port?: number) {
		this.api();

		if (!port)
			port = process.env.PORT || 3000;

		let env = process.env.NODE_ENV || 'dev';
		if (env === 'dev') {
			this.express.set('views', process.cwd());
			this.express.engine('html', require('ejs').renderFile);
			this.express.set('view engine', 'html');
			this.express.get('/', (req, res, next) => res.render('index'));
		}

		this.express.listen(port, () => logs('listening on port: ' + port + ' - ' + env));
	}
}

export default new App();