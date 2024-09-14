import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${search}`);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
    } catch (err) {
      console.error(err);
      setNoResults(true); // Set to true in case of error
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className='px-4 md:px-8 lg:px-16 xl:px-32 min-h-[80vh] py-8'>
        {loader ? (
          <div className='h-[40vh] flex justify-center items-center'>
            <Loader />
          </div>
        ) : !noResults ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {posts.map((post) => (
              <Link
                key={post._id}
                to={user ? `/posts/post/${post._id}` : "/login"}
                className='block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300'
              >
                <HomePosts post={post} />
              </Link>
            ))}
          </div>
        ) : (
          <h3 className='text-center font-bold text-xl mt-16 text-gray-700'>
            No posts available
          </h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
