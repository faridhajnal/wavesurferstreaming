'use strict';
const path = require('path');
const express = require('express');
const mediaserver = require('mediaserver');
const waveform = require('waveform-node');
const publicPath = path.join(__dirname, 'public/');
const audioPath = path.join(__dirname, 'audio/');
const port = process.env.PORT || 5005;
var options = {};
var app = express();
app.use(express.static(publicPath));

app.get('/audio/:file', (req, res) => {
  let path = audioPath + req.params.file;
  console.log('streaming file', req.params.file);
  mediaserver.pipe(req, res, path);
});

app.get('/wave/:file', (req, res) => {
  let path = audioPath + req.params.file;
  waveform.getWaveForm(path, options, (error, peaks) =>{
    if(error){
      console.log("error");
      return;
    }
    console.log(peaks);
  })
})

app.listen(port, () => {
  console.log('App succesfuly running on port ' + port);
})
