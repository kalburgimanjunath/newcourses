import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
export default function Courses() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  async function loadData() {
    // const client = contentful.createClient({
    //   accessToken: "UIeKJkavCDJs16HazDKzrYzWw5WEwUGPkuqqWL876DY",
    //   space: "vty45oyhbzm7",
    // });
    const query = `
{
  courseCollection(where: {slug:"${id}"}){
    items { 
        title,
        slug,
        description,
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
        setData(data.courseCollection.items);
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
            <div className="relative bottom-0 left-2 bg-white text-left m-20 bg-gray-300 p-20">
              <Markdown>{data[0].description}</Markdown>
            </div>
          </>
        ) : (
          "loading...."
        )}
      </div>
    </div>
  );
}
