//index.js
import { logger } from "./logger.js";

//const obj = { name: "teste" };
const obj = undefined; //descomente essa linha para provocar o erro

try {
  console.log(obj.name);
  logger.info("tudo funcionando!");
} catch (error) {
  logger.error(error);
}
