// Created by trevor on 2/2/17.
import * as express from 'express';
import {privateLogs, default as logs} from "./logs";
import defaultWebpackConfig from '../webpack.config';
import {APIModule} from "./module";
import * as helmet from 'helmet';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import {FinishSyncronization, SyncDatabase} from "./database/sqlize";

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

	private cbListenList: (() => void)[] = [];

	public registerListenCallback(cb: () => void): void {
		if (this.cbListenList === null)
			return cb && cb();
		this.cbListenList.push(cb);
	}

	private callListenCallback(): void {
		for (let i = 0; i < this.cbListenList.length; ++i) {
			this.cbListenList[i]();
		}
		this.cbListenList = null;
	}

	listen(port?: number) {
		this.api();

		if (!port)
			port = process.env.PORT || 3000;

		let env = process.env.NODE_ENV || 'dev';
		if (env !== 'production') {
			this.express.use(webpackDevMiddleware(webpack(this.webpackConfig), {
				quiet: false,
				stats: {colors: true}
			}));
		}
		else {
			webpack(this.webpackConfig, (err, stats) => {
				if (err) {
					console.error(err.stack || err);
					if (err.details) {
						console.error(err.details);
					}
					return;
				}

				const info = stats.toJson();

				if (stats.hasErrors()) {
					console.error(info.errors);
				}

				if (stats.hasWarnings()) {
					console.warn(info.warnings)
				}
			});
		}

		this.express.set('views', process.cwd());
		this.express.engine('html', require('ejs').renderFile);
		this.express.set('view engine', 'html');
		this.express.get('/', (req, res, next) => res.render('index'));
		this.express.use('/', express.static(process.cwd()));

		FinishSyncronization(() => {
			this.express.listen(port, () => {
				logs('listening on port: ' + port + ' - ' + env);
				this.callListenCallback();
			});
		});
		SyncDatabase();
	}
}

let app = new Application();
export let App: Application = app;
export default app;