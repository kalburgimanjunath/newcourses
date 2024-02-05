import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import Markdown from "react-markdown";
export default function Questions() {
  const { id } = useParams(1);
  const [data, setData] = useState([]);
  async function loadData() {
    // const client = contentful.createClient({
    //   accessToken: "UIeKJkavCDJs16HazDKzrYzWw5WEwUGPkuqqWL876DY",
    //   space: "vty45oyhbzm7",
    // });
    const query = `
{
  questionsCollection(where: {id:1}){
    items { 
        title,       
        answer
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
        setData(data.questionsCollection.items);
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
            {/* <img
              src={data[0].image && data[0].image.url ? data[0].image.url : ""}
              width={200}
              height={200}
            /> */}
            <div className="p-2 relative bottom-0 left-2 bg-white">
              {data[0].title}
            </div>

            <div className="p-2 relative bottom-0 left-2 bg-white">
              {data[0].answer}
            </div>
            {/* <div className="p-2 relative bottom-0 left-2 bg-white">
              <Markdown>{data[0].details}</Markdown>
            </div> */}
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
