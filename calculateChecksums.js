const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// COMMAND:: node calculateChecksums.js /Users/username/Downloads

const directoryPath = process.argv[2]; // Get the directory path from the command line argument

if (!directoryPath) {
  console.error('Please provide the directory path as a command line argument.');
  process.exit(1);
}

function calculateSHA256Checksum(filePath) {
  const fileData = fs.readFileSync(filePath);
  const sha256sum = crypto.createHash('sha256');
  sha256sum.update(fileData);
  return sha256sum.digest('hex');
}

function processFilesInDirectory(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      if (fs.statSync(filePath).isFile()) {
        const checksum = calculateSHA256Checksum(filePath);
        const checksumFilePath = path.join(directoryPath, file + '.sha256sum');
        fs.writeFileSync(checksumFilePath, checksum);
        console.log(`Checksum for ${file} written to ${checksumFilePath}`);
      }
    });
  });
}

processFilesInDirectory(directoryPath);
