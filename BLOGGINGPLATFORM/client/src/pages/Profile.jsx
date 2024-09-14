import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${URL}/api/users/${user._id}`);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      await axios.put(
        `${URL}/api/users/${user._id}`,
        { username, email, password },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete(`${URL}/api/users/${user._id}`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, [param]);

  return (
    <div>
      <Navbar />
      <div className='min-h-screen px-4 md:px-8 lg:px-[200px] mt-8 flex flex-col md:flex-row'>
        {/* User Posts Section */}
        <div className='md:w-2/3 w-full flex flex-col space-y-6'>
          <h1 className='text-2xl font-bold mb-4'>Your Posts</h1>
          {posts.length > 0 ? (
            posts.map((p) => <ProfilePosts key={p._id} p={p} />)
          ) : (
            <p className='text-center text-gray-500'>No posts available.</p>
          )}
        </div>

        {/* Separator */}
        <div className='hidden md:block w-px bg-gray-300 mx-6' />

        {/* Profile Information Section */}
        <div className='md:w-1/3 w-full flex flex-col space-y-6'>
          <h1 className='text-2xl font-bold mb-4'>Profile</h1>
          <div className='bg-white shadow-lg rounded-lg border border-gray-200 p-6'>
            <div className='flex flex-col space-y-4'>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className='outline-none px-4 py-2 border border-gray-300 rounded-lg'
                placeholder='Your username'
                type='text'
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='outline-none px-4 py-2 border border-gray-300 rounded-lg'
                placeholder='Your email'
                type='email'
              />
              {/* Password field commented out but kept for reference */}
              {/* <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="outline-none px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Your password"
                type="password"
              /> */}
              <div className='flex space-x-4'>
                <button
                  onClick={handleUserUpdate}
                  className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700'
                >
                  Update
                </button>
                <button
                  onClick={handleUserDelete}
                  className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800'
                >
                  Delete
                </button>
              </div>
              {updated && (
                <p className='text-green-500 text-sm text-center mt-4'>
                  User updated successfully!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
