let { GITHUB_API } = process.env;

/*
function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => binary += String.fromCharCode(b));

  return window.btoa(binary);
};
*/

exports.handler = async (event, context) => {
		let baseUrl = 'https://api.github.com/repos/laem/publi.codes/contents' 

    let url = baseUrl + (event.queryStringParameters.filePath || '/co2.yaml');

   var headers = new Headers({'Authorization': `token ${GITHUB_API}`, 'Accept': 'application/vnd.github.v3.raw'});
    var options = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    };
    var request = new Request(url);

		return    fetch(request, options).then((response) => {
    console.log(response)      

      }).catch(error => ({ statusCode: 422, body: error }));

    }
