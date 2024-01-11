// import contentful from "contentful";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  async function loadData() {
    // const client = contentful.createClient({
    //   accessToken: "UIeKJkavCDJs16HazDKzrYzWw5WEwUGPkuqqWL876DY",
    //   space: "vty45oyhbzm7",
    // });
    const query = `
{
  courseCollection {
    items { 
        title,
        slug,
        image{
            fileName,
            width,
            height
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
  }, []);
  return (
    <div>
      <h3>Course Library</h3>
      {data &&
        data.map((item) => {
          return <div key={item.title}>{item.title}</div>;
        })}
    </div>
  );
}
