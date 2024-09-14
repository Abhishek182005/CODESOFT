import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    if (cat.trim() !== "") {
      let updatedCats = [...cats];
      updatedCats.push(cat);
      setCat("");
      setCats(updatedCats);
    }
  };

  const handleCreate = async (e) => {
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
        console.log(err);
      }
    }

    try {
      const res = await axios.post(`${URL}/api/posts/create`, post, {
        withCredentials: true,
      });
      navigate(`/posts/post/${res.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='px-6 md:px-12 py-8'>
        <h1 className='text-2xl md:text-3xl font-bold mb-8'>Create a Post</h1>
        <div className='bg-white shadow-lg rounded-lg border border-gray-200 p-6'>
          <form className='space-y-6' onSubmit={handleCreate}>
            <div className='flex flex-col space-y-4'>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                placeholder='Enter post title'
                className='w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-blue-500'
                required
              />
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type='file'
                className='w-full px-4 py-2 border border-gray-300 rounded-md bg-white cursor-pointer'
              />
              <div className='flex flex-col space-y-4'>
                <div className='flex items-center space-x-4'>
                  <input
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    className='w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-blue-500'
                    placeholder='Enter post category'
                    type='text'
                  />
                  <button
                    type='button'
                    onClick={addCategory}
                    className='bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition-colors'
                  >
                    Add
                  </button>
                </div>

                {/* Categories */}
                <div className='flex flex-wrap gap-2'>
                  {cats.map((c, i) => (
                    <div
                      key={i}
                      className='flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full'
                    >
                      <p>{c}</p>
                      <button
                        onClick={() => deleteCategory(i)}
                        className='text-red-500 hover:text-red-700 rounded-full p-1 text-sm'
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
                rows={10}
                className='w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-blue-500'
                placeholder='Enter post description'
                required
              />
              <button
                type='submit'
                className='bg-black  text-white w-full md:w-1/4 py-3 font-semibold rounded-md hover:bg-gray-700 transition-colors'
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
