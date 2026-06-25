import { getLists } from "../utils/api/lists";

export default function homeLoader() {
  const lists = getLists().then((data) => {
    return data.lists;
  });
  // .catch((error) => {
  //   console.error(error);
  // });

  return { lists };
}
