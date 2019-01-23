let { GITHUB_API } = process.env;

exports.handler = async (event, context) => {
    const name = event.queryStringParameters.filePath || "https://api.github.com/repos/laem/publi.codes/contents/co2.yaml";

  return {
    statusCode: 200,
    body: "Salut, Yaya"
  };
};
