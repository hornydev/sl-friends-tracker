const winston = require('winston');

export function logger(serviceName: String) {
    return winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: {service: serviceName},
        transports: [
            new winston.transports.Stream({
                stream: process.stderr,
            })
        ],
    });
}
