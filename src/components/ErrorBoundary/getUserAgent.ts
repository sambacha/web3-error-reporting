// @Error-Boundry
import { UAParser } from 'ua-parser-js';
/**
 * getUserAgent
 * @param {string} [userAgent]
 */
export function getUserAgent(): UAParser.IResult {
  const parser = new UAParser(window.navigator.userAgent);
  return parser.getResult();
}
