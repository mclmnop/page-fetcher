const query = process.argv.slice(2);
const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


request.get(query[0], (error, response, body) => {
  if (response === undefined || response.statusCode !== 200) {
    console.log('Invalid URL');
    process.exit();
  }
  if (query[1] !== './index.html') {
    console.log('Invalid Path');
    process.exit();
  }
  if (fs.existsSync(query[1])) {
    rl.question('**** WARNING File already exists, do you want to quit? Y for yes', (answer) => {
      if (answer === 'Y' || answer === 'y') {
        process.exit();
      } else {
        rl.close();
        saveTofile(query[1], body);
      }
    });
  } else {
    saveTofile(query[1], body);
  }
});


const saveTofile = function(path, body) {
  fs.writeFile(path, body, (err) => {
    if (err) throw err;
    console.log(`Downloaded and saved ${body.length} bytes to ./index.html`);
    process.exit();
  });
};