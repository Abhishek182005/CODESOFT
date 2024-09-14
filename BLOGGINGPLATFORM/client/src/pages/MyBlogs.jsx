import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import HomePosts from "../components/HomePosts";

const MyBlogs = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false); // Set loader to false on error
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className='px-6 md:px-[200px] py-8 min-h-[80vh]'>
        {loader ? (
          <div className='h-[40vh] flex justify-center items-center'>
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link key={post._id} to={`/posts/post/${post._id}`}>
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <h3 className='text-center font-bold text-xl mt-16'>
            No posts available
          </h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
