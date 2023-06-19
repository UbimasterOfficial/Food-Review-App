import React, { useReducer } from "react";
import { toast } from "react-toastify";
import { createPost } from "../util/APIUtils";

const CreatePost = ({ currentUser, refetchPosts }) => {
  const initialState = {
    description: "",
    imageUrl: [],
    userId: currentUser.id
  };

  const [post, setPost] = useReducer((prevState, newState) => {
    return { ...prevState, ...newState };
  }, initialState);

  const handleDescription = event => {
    setPost({ description: event.target.value });
  };

  const submitPost = async () => {
    if (!post.description) {
      toast("Post description is mandatory", { type: "error" });
      return;
    }
    if (post.imageUrl.length === 0) {
      toast("Please attach atleast 1 image", { type: "error" });
      return;
    }

    try {
      const response = await createPost(post);
      if (response) {
        toast("Post successfully created!", { type: "success" });
        setPost({ ...initialState });
        refetchPosts();
      }
    } catch (error) {
      console.log(error);
      toast("Oops! Something went wrong.", { type: "error" });
    }
  };

  const handleImageChange = event => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);

    if (files.length > 4) {
      alert("Please select up to 4 images");
      return;
    }

    const imagePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then(base64Images => {
        setPost({ imageUrl: base64Images });
      })
      .catch(error => {
        toast("Error converting images to base64:", { type: "error" });
      });
  };

  return (
    <>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border rounded-lg border-gray-700 p-4 shadow-lg max-w-2xl">
        <textarea
          onChange={handleDescription}
          value={post.description}
          className="description bg-gray-800 rounded-lg sec p-3 h-50 border text-white border-gray-700 outline-none"
          spellCheck="false"
          placeholder="Describe everything about your recipe here"
        ></textarea>

        <input
          id="attachments"
          value=""
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          className="hidden"
        />

        <div className="flex">
          {post.imageUrl.map((image, index) => (
            <img
              key={index}
              src={image}
              className="w-40 p-2"
              alt={`Selected pic ${index + 1}`}
            />
          ))}
        </div>

        <div className="icons flex text-gray-500 m-2">
          <label htmlFor="attachments">
            <div
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Upload image</span>
            </div>
          </label>
          <div className="count ml-auto">
            <div className="buttons flex">
              <div
                onClick={submitPost}
                className="rounded-md p-1 px-4 font-semibold cursor-pointer text-gray-100 bg-indigo-500 ml-auto"
              >
                Post
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
