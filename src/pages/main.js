// import contentful from "contentful";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { courseService } from "../services/courseService";
const Hero = () => {
  return (
    <div>
      <h3>Your Coding Skills</h3>
      <div>
        <button>Learn About</button>
      </div>
      <div>
        <h3>Popular Courses</h3>
      </div>
    </div>
  );
};

export default function Main() {
  const [data, setData] = useState([]);
  const [Posts, setPosts] = useState([]);
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
  async function loadPostData() {
    // const client = contentful.createClient({
    //   accessToken: "UIeKJkavCDJs16HazDKzrYzWw5WEwUGPkuqqWL876DY",
    //   space: "vty45oyhbzm7",
    // });
    const query = `
    {
      postsCollection {
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
        setPosts(data.postsCollection.items);
      });
  }
  useEffect(() => {
    loadData();
    loadPostData();
  }, []);

  const CourseItem = (item) => {
    return (
      <div className="relative rounded-lg border-2 bg-pink-100 hover:bg-pink-200 p-2 text-center justify-center hover:scale-110">
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
          <div className="w-full p-2 absolute bottom-0 left-2 bg-white">
            {item.item.title}
          </div>
        </Link>
      </div>
    );
  };
  const PostItem = (item) => {
    return (
      <div className="relative rounded-lg border-2 bg-pink-100 hover:bg-pink-200 p-2 text-center justify-center hover:scale-110">
        <Link to={`posts/${item.item.slug}`}>
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
          <div className="w-full p-2 absolute bottom-0 left-2 bg-white">
            {item.item.title}
          </div>
        </Link>
      </div>
    );
  };
  return (
    <div>
      <Hero />
      <h3 className="font-bold text-3xl">Popular Courses</h3>
      <hr className="m-2" />

      <div className="grid md:grid-cols-3 sx:grid-cols-1 p-2 ">
        {data &&
          data.map((item) => {
            return <CourseItem key={item.title} item={item}></CourseItem>;
          })}
      </div>

      <h3 className="font-bold text-3xl">Posts Library</h3>
      <hr />
      <div>
        <div className="grid md:grid-cols-3 sx:grid-cols-1 p-2 ">
          {Posts &&
            Posts.map((item) => {
              return <PostItem key={item.title} item={item}></PostItem>;
            })}
        </div>
      </div>
      <h3>Pro</h3>
      <h4 className="text-xl">
        Get access to every single course by signing up for a Net Ninja Pro
        membership.
      </h4>
      <h3>Get instant access to all courses with a Net Ninja Pro membership.</h3>
    </div>
  );
}
