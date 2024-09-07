export const fetchData = async () => {
  const data = await fetch("https://dummyjson.com/posts?limit=10");
  const json = await data.json();
  return json;
};


/* getting posts of comments with id 1 */
// fetch('https://dummyjson.com/posts/1/comments')

