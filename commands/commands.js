#!/usr/bin/env node

var program = require('../');
program
  .command('no [env]')
  .action(function(env){
    console.log('deploying', env);
  });

program.parse(process.argv)
