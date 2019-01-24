let { GITHUB_API } = process.env;

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => binary += String.fromCharCode(b));

  return window.btoa(binary);
};


exports.handler = async (event, context) => {
    let baseUrl = 
    let url = "https://api.github.com/repos/laem/publi.codes/contents' + (event.queryStringParameters.filePath || '/co2.yaml");

   var headers = new Headers({'Authorization': `token ${GITHUB_API}`, 'Accept': 'application/vnd.github.v3.raw'});
    var options = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    };
    var request = new Request(url);

 return    fetch(request, options).then((response) => {
      response.arrayBuffer().then((buffer) => {
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr = arrayBufferToBase64(buffer);
          
          return {'isBase64Encoded'   : True,
        'statusCode'        : 200,
        'headers'           : { 'Content-Type': content_type },
        'body'              : base64_encoded_binary_data
                 }
          
          
          

      }).catch(error => ({ statusCode: 422, body: String(error) }));

    })
}
