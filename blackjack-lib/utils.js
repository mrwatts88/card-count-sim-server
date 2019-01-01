"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function DEBUG(statement) {
    if (process.env.NODE_ENV === 'debug')
        console.info(statement);
}
exports.DEBUG = DEBUG;
