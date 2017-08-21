
import Presets from './presets'
export default async (url, options) => {
  try {
    let response = await fetch(Presets.API + url, options);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};
