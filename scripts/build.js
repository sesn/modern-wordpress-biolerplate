process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
  throw err;
});

const webpack = require('webpack');
const config = require('./webpack.config');

const clientComplier = webpack(config);

console.log(`[🍿/🍿🍿] Creating an optimized production build.. `);

compile(config, (err, stats) => {
  handleWebpackErrors(err, stats);
  console.log(`[🍿🍿/🍿🍿] Build Successful 😏😏😏`);
});


function compile(config, cb) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch(e) {
    printErrors(`☠️☠️ Compilation Failed ☠️️️️️️ ${[e]}.`);
    process.exit(1);
  }
  compiler.run((err, stats) => {
    cb(err, stats);
  });
}

// Display errors
function printErrors(summary, errors) {
  console.log(summary);
  console.log();
  errors.forEach(err => {
    console.log(err.message || err);
  })
}

// Gracefully handle errors and print them to console
function handleWebpackErrors(err, stats) {
  if(err) {
    printErrors(`☠️☠️ Compilation Failed ☠️️️️️️ ${[err]}.`);
    process.exit(1);
  }

  if(stats.compilation.errors && stats.compilation.errors.length) {
    printErrors(`☠️☠️ Compilation Failed ☠️️️️️️ ${[stats.compilation.errors]}.`);
    process.exit(1);
  }

  if(
    process.env.CI &&
    stats.compilation.warnings &&
    stats.compilation.warnings.length
  ) {
    printErrors(`☠️☠️ Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically. ☠️️️️️️ ${stats.compilation.warnings}.`);
    process.exit(1);
  }
}

