const cp = require('child_process');
const fetch = require('./utils').fetch;

// eslint-disable-next-line no-underscore-dangle
async function _sync(src, dest) {
  console.log(`npm sync from ${src} to ${dest}`);
  let lefts = (await fetch(src)).map((el) => ({
    path: el.path,
    downloadUrl: el.downloadUrl,
    checksum: el.checksum.sha1,
  }));
  // console.log('lefts:\n', lefts);
  let rights = (await fetch(dest)).map((el) => ({
    path: el.path,
    downloadUrl: el.downloadUrl,
    checksum: el.checksum.sha1,
  }));
  // console.log('rights:\n', rights);
  let remains = [];
  lefts.forEach((el) => {
    let matched = rights.find((r) => el.path === r.path && el.checksum === r.checksum);
    if (matched == null) {
      remains.push(el);
    }
  });
  // console.log(remains);
  let fails = [];
  remains.forEach((el) => {
    // console.log('el is ', el);
    let fileName = el.downloadUrl.substring(
      el.downloadUrl.lastIndexOf('/') + 1,
    );
    let downloadPara = [el.downloadUrl, '--out', "./data/" + fileName];
    if (fileName.endsWith('.tgz') || fileName.endsWith('.tar.gz')) {
      let cpHeadle = cp.spawnSync('curl', downloadPara);
      if (cpHeadle.status === 0) {
        console.log("Download: " + fileName, "\t\033[32;01m success\033[39;00m");
        let uploadUrl = dest;
        // console.log(uploadUrl);
        // console.log(`Upload: ${fileName}`);
        let uploadPara = ['--registry', uploadUrl, 'publish', "./data/" + fileName];
        cpHeadle = cp.spawnSync('npm', uploadPara);
        if (cpHeadle.status !== 0) {
          console.error("Upload: " + fileName + "\t\033[31;01m failed\033[39;00m");
          // console.log(cpHeadle.output.toString());
          fails.push({ fileName, errorMsg: cpHeadle.output.toString() });
        } else {
          console.log("Upload: " + fileName, "\t\033[32;01m success\033[39;00m");
        }
      } else {
        console.error("Download: " + fileName + "\t\033[31;01m failed\033[39;00m");
        // console.log(cpHeadle);
      }
    }
  });
  if (fails.length !== 0) {
    console.log('Failed List:');
    console.log(fails);
  }
}
exports.sync = _sync;
