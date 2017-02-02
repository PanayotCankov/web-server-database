// Created by trevor on 2/2/17.
import {MakeExpressAppMoreSecure, CommonExpressConfig, ExposeApp} from "./expressHelper";
import {UseApi} from './module';
let express = require('express');

let app = new express();

MakeExpressAppMoreSecure(app);
CommonExpressConfig(app);

UseApi(app);

ExposeApp(app);
