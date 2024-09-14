import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${URL}/api/comments/create`,
        {
          comment,
          author: user.username,
          postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      setComment("");
      fetchPostComments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className='h-[80vh] flex justify-center items-center w-full'>
          <Loader />
        </div>
      ) : (
        <div className='px-4 md:px-8 lg:px-[200px] py-6'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0'>
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className='flex space-x-3'>
                <button
                  onClick={() => navigate(`/edit/${postId}`)}
                  className='text-gray-600 hover:text-gray-900'
                >
                  <BiEdit size={24} />
                </button>
                <button
                  onClick={handleDeletePost}
                  className='text-red-600 hover:text-red-900'
                >
                  <MdDelete size={24} />
                </button>
              </div>
            )}
          </div>
          <div className='flex items-center justify-between mt-2 md:mt-4 text-gray-600'>
            <p>@{post.username}</p>
            <div className='flex space-x-2'>
              <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
              <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
            </div>
          </div>
          <img
            src={`${IF}${post.photo}`}
            alt={post.title}
            className='w-full mt-8 rounded-lg shadow-lg'
          />
          <p className='mt-8 text-gray-800'>{post.desc}</p>
          <div className='flex flex-col md:flex-row items-start md:items-center mt-8'>
            <p className='font-semibold mr-2'>Categories:</p>
            <div className='flex flex-wrap gap-2'>
              {post.categories?.map((c, i) => (
                <span
                  key={i}
                  className='bg-gray-200 text-gray-800 rounded-lg px-3 py-1'
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className='mt-8'>
            <h3 className='text-xl font-semibold mb-4'>Comments:</h3>
            {comments.length > 0 ? (
              comments.map((c) => <Comment key={c._id} c={c} post={post} />)
            ) : (
              <p>No comments yet</p>
            )}
          </div>
          {/* Write a comment */}
          {user && (
            <div className='flex flex-col md:flex-row items-center mt-8'>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type='text'
                placeholder='Write a comment'
                className='w-full md:w-[80%] border rounded-lg px-4 py-2 outline-none'
              />
              <button
                onClick={postComment}
                className='bg-black text-white rounded-lg px-4 py-2 md:w-[20%] mt-4 md:mt-0 ml-0 md:ml-4'
              >
                Add Comment
              </button>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
