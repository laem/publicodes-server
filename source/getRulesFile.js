import fetch from 'node-fetch'

let { GITHUB_API } = process.env

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

	let url = baseUrl + (event.queryStringParameters.filePath || '/co2.yaml')

	var headers = {
		Authorization: `token ${GITHUB_API ||
			'2623ebf59fa364f47270a1174fbc60b434f01604'}`,
		Accept: 'application/vnd.github.v3.raw'
	}
	var options = {
		method: 'GET',
		headers: headers,
		mode: 'cors',
		cache: 'default'
	}

	console.log(url, options)

	return fetch(url, options).then(response => {
		console.log(response.blob())
	})
}
