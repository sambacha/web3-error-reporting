/**
 * @const UAParser
 * @exports const userAgent
 * @exports const isMobile
 */
import { UAParser } from 'ua-parser-js';

const parser = new UAParser(window.navigator.userAgent);
const { type } = parser.getDevice();

export const userAgent = parser.getResult();

export const isMobile = type === 'mobile' || type === 'tablet';
