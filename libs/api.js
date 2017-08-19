export default async (url, options) => {
  try {
    let response = await fetch('http://localhost:9000/' + url, options);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};
