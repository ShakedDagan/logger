import  *  as  winston  from  'winston';
import  DailyRotateFile from 'winston-daily-rotate-file';

class LoggerProd {
    private static _instance: LoggerProd;
    private _logger : winston.Logger;

    private constructor() {

        this._logger = winston.createLogger({
            transports: []
        });
    }
    public addTransport(name : string, level : string, frequency : string, dirname: string, maxSize : string, maxFiles : string){
        let transport = new DailyRotateFile({
            filename: name + '-%DATE%.log',
            level: level,
            frequency: frequency,
            datePattern: 'YYYY-MM-DD-HH',
            dirname: dirname,
            maxSize: maxSize,
            maxFiles: maxFiles
        });
        transport.on('rotate',
            function(oldFilename, newFilename) {
                console.log("old : " + oldFilename)
                console.log("new : " + newFilename)
            }
        );
        this.logger.add(transport)
    }
    public static get Instance() {
            return this._instance || (this._instance = new this())
    }

    get logger() : winston.Logger {
        return this.logger
    }


}
export const loggerInstance = LoggerProd.Instance;