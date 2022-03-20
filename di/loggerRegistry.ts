import {registry} from "tsyringe";
import {logger} from "../logger/logger";

@registry([
    { token: "logger-database", useValue: logger("database") },
    { token: "logger-app", useValue: logger("app") }
])
export class LoggerRegistry {}
