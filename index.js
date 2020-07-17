#!/usr/bin/env node
const Npm = require('./lib/npm');
const Maven = require('./lib/maven');

if (process.argv[2] === 'npm') {
  Npm.sync(process.argv[3], process.argv[4]);
} else if (process.argv[2] === 'maven') {
  Maven.sync(process.argv[3], process.argv[4]);
} else {
  console.log(
    'Usage:\n'
    + 'npm run dev [type] [sourceUrl] [toUrl]\n\n'
    + 'type:      maven or npm\n'
    + "sourceUrl: sync source. must end with '/'\n"
     + "toUrl:     sync target. must end with '/'\n\n"
    + 'Example:\n'
    + 'npm run dev maven http://localhost:8081/nexus/maven-public/ http://my-private-nexus.com/nexus/private_repository/',
  );
}
