import app from './app';
import auth from './auth';
import logger from './logger';
import storage from './filesystem';
import localization from './localization';
import mailer from './mailer';
import database from './db';
import cache from './cache';
import queue from './queue';
import http from './http';
import settings from './settings';

export default [
  app,
  auth,
  cache,
  database,
  localization,
  logger,
  mailer,
  queue,
  storage,
  http,
  settings,
];
