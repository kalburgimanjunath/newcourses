import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
export default function Posts() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  async function loadData() {
    // const client = contentful.createClient({
    //   accessToken: "UIeKJkavCDJs16HazDKzrYzWw5WEwUGPkuqqWL876DY",
    //   space: "vty45oyhbzm7",
    // });
    const query = `
{
  postsCollection(where: {slug:"${id}"}){
    items { 
        title,
        descriptionnew,
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
    fetch(`https://graphql.contentful.com/content/v1/spaces/vty45oyhbzm7`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authenticate the request
        Authorization: "Bearer UIeKJkavCDJs16HazDKzrYzWw5WEwUGPkuqqWL876DY",
      },
      // send the GraphQL query
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        setData(data.postsCollection.items);
      });
  }

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <div>
      <div>
        {data[0] ? (
          <>
            <img
              src={data[0].image && data[0].image.url ? data[0].image.url : ""}
              width={200}
              height={200}
            />
            <div className="p-2 relative bottom-0 left-2 bg-white">
              {data[0].title}
            </div>
            <div className="p-2 relative bottom-0 left-2 bg-white">
              {data[0].descriptionnew}
            </div>
          </>
        ) : (
          "loading...."
        )}
      </div>
      {/* <div className="p-2 relative bottom-0 left-2 bg-white">
        {data[0].title}
      </div> */}
    </div>
  );
}
