// Created by trevor on 2/2/17.
import * as express from 'express';
import {privateLogs, default as logs} from "./logs";
import defaultWebpackConfig from '../webpack.config';
import {APIModule} from "./module";
import helmet = require("helmet");
let bodyParser = require("body-parser");

export class Application {
	public express: express.Application;
	public APIModules: APIModule[] = [];
	public webpackConfig = defaultWebpackConfig;

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
		this.express.use(bodyParser.json());
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
			let webpack = require('webpack');
			let webpackDevMiddleware = require('webpack-dev-middleware');
			let webpackHotMiddleware = require('webpack-hot-middleware');

			let compiler = webpack(this.webpackConfig);

			this.express.use(webpackDevMiddleware(compiler, {
				publicPath: this.webpackConfig.output.publicPath,
				stats: {colors: true}
			}));
			this.express.use(webpackHotMiddleware(compiler, {
				log: console.log,
				noInfo: true,
				reload: true,
			}));

		}
		else {
			console.log('Production env. Make sure that bundle.js script exists!');
		}

		this.express.set('views', process.cwd());
		this.express.engine('html', require('ejs').renderFile);
		this.express.set('view engine', 'html');
		this.express.get('/', (req, res, next) => res.render('index'));
		this.express.use('/', express.static(process.cwd()));

		this.express.listen(port, () => logs('listening on port: ' + port + ' - ' + env));
	}
}

let app = new Application();
export let App: Application = app;
export default app;