import fetch from 'node-fetch'
import yaml from 'js-yaml'

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
			'ec0ab7970dd17ca2916c1cfc79f0a8c03b1fe9e2'}`,
		Accept: 'application/vnd.github.v3.raw'
	}
	var options = {
		method: 'GET',
		headers: headers,
		mode: 'cors',
		cache: 'default'
	}

	console.log(url, options)

	return fetch(url, options)
		.then(response => {
			return response.text()
		})
		.then(text => ({
			statusCode: 200,
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(yaml.safeLoad(text))
		}))
		.catch(error => ({ statusCode: 422, body: String(error) }))
}
