export async function courseService() {
  async function loadAllCourses() {
    const Alldata = [];
    const query = `
{
  courseCollection {
    items { 
        title,
        slug,
        image{
            fileName,
            width,
            height,
            url
        }
    }
    }
}
`;
    await fetch(
      `https://graphql.contentful.com/content/v1/spaces/vty45oyhbzm7`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer UIeKJkavCDJs16HazDKzrYzWw5WEwUGPkuqqWL876DY",
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      },
    )
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        Alldata.push(data.courseCollection.items);
      });
    return Alldata;
  }
  return {
    loadAllCourses,
  };
}
export default {
  courseService,
};
