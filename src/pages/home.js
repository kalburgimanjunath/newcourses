// import contentful from "contentful";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  }, []);

  const CourseItem = (item) => {
    return (
      <div className="bg-pink-100 hover:bg-pink-200 p-2 text-center justify-center hover:scale-125">
        <Link to={`course/${item.item.slug}`}>
          <div>
            {item.item ? (
              <img
                src={
                  item.item.image && item.item.image.url
                    ? item.item.image.url
                    : ""
                }
                width={"100%"}
                height={"100%"}
              />
            ) : (
              "loading...."
            )}
          </div>
          <div className="p-2 relative bottom-0 left-2 bg-white">
            {item.item.title}
          </div>
        </Link>
      </div>
    );
  };
  return (
    <div>
      <h3>Course Library</h3>
      <div className="grid md:grid-cols-3 sx:grid-cols-1 p-2 ">
        {data &&
          data.map((item) => {
            return <CourseItem key={item.title} item={item}></CourseItem>;
          })}
      </div>
    </div>
  );
}