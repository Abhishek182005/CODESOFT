import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo);
      setCats(res.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        await axios.post(`${URL}/api/upload`, data);
      } catch (err) {
        console.error(err);
      }
    }

    try {
      const res = await axios.put(`${URL}/api/posts/${postId}`, post, {
        withCredentials: true,
      });
      navigate(`/posts/post/${res.data._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1); // Fix: Splice with 1 item
    setCats(updatedCats);
  };

  const addCategory = () => {
    if (cat.trim()) {
      setCats([...cats, cat]);
      setCat(""); // Clear input after adding
    }
  };

  return (
    <div>
      <Navbar />
      <div className='px-6 md:px-12 lg:px-24 mt-8'>
        <h1 className='text-2xl font-bold mb-6'>Update Your Post</h1>
        <div className='bg-white shadow-lg rounded-lg p-6 border border-gray-200'>
          <form
            className='space-y-6'
            onSubmit={handleUpdate}
          >
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type='text'
              placeholder='Enter post title'
              className='w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500'
              required
            />
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type='file'
              className='w-full py-2 border border-gray-300 rounded-md bg-white cursor-pointer'
            />
            <div className='flex flex-col space-y-4'>
              <div className='flex items-center space-x-4'>
                <input
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className='w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500'
                  placeholder='Enter post category'
                  type='text'
                />
                <button
                  type='button'
                  onClick={addCategory}
                  className='bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800'
                >
                  Add
                </button>
              </div>

              {/* Categories */}
              <div className='flex flex-wrap space-x-2 mt-2'>
                {cats?.map((c, i) => (
                  <div
                    key={i}
                    className='flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-md'
                  >
                    <p>{c}</p>
                    <button
                      type='button'
                      onClick={() => deleteCategory(i)}
                      className='text-red-500 hover:text-red-700'
                      aria-label='Delete category'
                    >
                      <ImCross />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              rows={10}
              className='w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500'
              placeholder='Enter post description'
              required
            />
            <button
              type='submit'
              className='bg-black w-full md:w-1/4 mx-auto text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-800'
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <hr className='my-8 border-gray-300' />
      <Footer />
    </div>
  );
};

export default EditPost;
