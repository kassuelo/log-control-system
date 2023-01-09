import { createLogger, format, transports } from "winston";
const { combine, timestamp } = format;
import date from "date-and-time";
import { config } from "dotenv";
config();

const logFormat = format.printf((info) =>
  JSON.stringify({
    date: info.timestamp,
    level: info.level,
    message: info.message,
    stack: info.stack,
  })
);

const today = new Date();

const filename = date.format(today, "DD-MM-YYYY");
const month = date.format(today, "MMMM");
const year = date.format(today, "YYYY");
console.log(month);
const logger = createLogger({
  format: combine(
    format.errors({ stack: true }),
    timestamp({ format: "DD-MM-YYYY T HH:mm:ss Z" }),
    logFormat
  ),
  transports: [
    new transports.File({
      filename: `./logs/${year}/${month}/${filename}.log`,
      level: "info",
    }),
  ],
});

// Se não estivermos em produção, logar no `console` com o formato:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export { logger };
