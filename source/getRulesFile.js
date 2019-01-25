import fetch from 'node-fetch'
import yaml from 'js-yaml'

let { GITHUB_TOKEN } = process.env

/*
function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => binary += String.fromCharCode(b));

  return window.btoa(binary);
};
*/

exports.handler = async (event, context) => {
	let baseUrl = 'https://api.github.com/repos/',
		repo = event.queryStringParameters.repo,
		url =
			baseUrl +
			repo +
			'/contents/' +
			(event.queryStringParameters.filePath || 'co2.yaml')
	var headers = {
		Authorization: `token ${GITHUB_TOKEN}`,
		Accept: 'application/vnd.github.v3.raw'
	}
	var options = {
		method: 'GET',
		headers: headers,
		mode: 'cors',
		cache: 'default'
	}

	return fetch(url, options)
		.then(response => {
			return response.text()
		})
		.then(text => ({
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',

				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify(yaml.safeLoad(text))
		}))
		.catch(error => ({ statusCode: 422, body: String(error) }))
}
