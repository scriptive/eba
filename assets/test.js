


// exports.gcstest = (event, callback) => {
//   file.download({destination:"/tmp/test"}, function(err, file) {
//     if (err) {console.log(err)}
//     else{callback();}
//   })
// };

zomi-server
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getFile = (req, res) => {
  let fileName = req.query.filename || req.body.filename;
  res.status(200).send({message:message});
  const file = storage.bucket('storage.lethil.me').file(req.body.filename);
};


https://us-central1-zomi-server.cloudfunctions.net/testStorageFile?filename=test/book.json
const storage = require('@google-cloud/storage');

var storage = require('@google-cloud/storage');
const gcs = storage({projectId: "zomi-server"});
const bucket = gcs.bucket("storage.lethil.me");
const file = bucket.file("test/book.json")

exports.testStorageFile = (req, res) => {
  var storage = require('@google-cloud/storage');
  const gcs = storage({projectId: "zomi-server"});
  const bucket = gcs.bucket("storage.lethil.me");
  const file = bucket.file('test/book.json');
  res.send(file);
};


await fetch('https://us-central1-zomi-server.cloudfunctions.net/testStorageFile?filename=test/book.json').then(console.log);


exports.gcstest = (event, callback) => {
  file.download({destination:"/tmp/test"}, function(err, file) {
    if (err) {console.log(err)}
    else{callback();}
  })
};
{
  "name": "sample-http",
  "version": "0.0.1",
  "dependencies": {
    "@google-cloud/storage": "latest"
  }
}

JSON.stringtify()
"dependencies": {
  "@google-cloud/storage": "latest"
}

'use strict';

const gcs = require('@google-cloud/storage')();

exports.book = (req, res) => {
  let file = gcs.bucket('storage.lethil.me').file('test/book.json');
  res.status(200).send(file);

  let readStream = file.createReadStream();
  res.attachment('book.json');
  res.setHeader("content-type", "application/json");
  readStream.pipe(res);
};
