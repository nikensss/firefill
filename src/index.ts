#!/usr/bin/env node
import { red as r } from 'chalk';
import yargs from 'yargs';
import { firefill } from './firefill';

async function main(): Promise<void> {
  const args = await yargs(process.argv.slice(2)).options({
    list: {
      type: 'boolean',
      alias: 'l',
      default: false,
      description: 'list available GCP'
    },
    ask: {
      type: 'boolean',
      alias: 'a',
      default: false,
      description: 'ask the user for the GCP project to be used'
    },
    project: {
      type: 'string',
      alias: 'p',
      description: 'the project ID to be used'
    }
  }).argv;

  await firefill(args);
}

main().catch((ex) => console.log(r(ex.stack)));
