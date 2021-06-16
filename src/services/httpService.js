import axios from "axios";

export async function get(url) {
  const { data } = await axios.get(url);
  return data;
}

export async function destroy(url, id) {
  const { data } = await axios.delete(`${url}/${id}`);
  return data;
}
