const axiosRest = require('axios-rest-client');
// eslint-disable-next-line no-underscore-dangle
async function _fetch(url) {
  console.log(`fetch ${url}`);
  let items = [];
  let context = url.substring(0, url.indexOf('/', url.indexOf('/') + 2));
  // console.log(`context ${context}`);
  let repository = url.substring(
    url.lastIndexOf('/', url.length - 2) + 1,
    url.length - 1,
  );
  // console.log(`repository ${repository}`);
  let path = `${context}/service/rest/v1`;
  // console.log(`path ${path}`);
  const api = axiosRest({
    baseUrl: path,
    headers: { contentType: 'JSON' },
  });
  let continuationToken = null;
  // for (let i = 0; i < 2; i++) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let param = {
      repository,
    };
    if (continuationToken !== null) {
      param.continuationToken = continuationToken;
    }
    // eslint-disable-next-line no-await-in-loop
    let res = await api.assets(param);
    process.stdout.write('.');
    // console.log(res);
    continuationToken = res.data.continuationToken;
    // console.log(continuationToken);
    res.data.items.forEach((el) => {
      items.push(el);
    });
    if (continuationToken === null) {
      break;
    }
  }
  process.stdout.write('\n');

  return items;
}

exports.fetch = _fetch;
