import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../context/Authentication";
import useSingleUser from "../../hooks/data/useSingleUser";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

const PostForm = () => {
  const { handleSubmit, control, setValue, register, reset } = useForm();

  const navigate = useNavigate();

  const { userInfo = {}, isLoading } = useSingleUser();

  const tagOptions = [
    { value: "recent", label: "Recent" },
    { value: "latest", label: "Latest" },
    { value: "help", label: "Help" },
    { value: "solved", label: "Solved" },
    { value: "charity", label: "Charity" },
    { value: "hot", label: "Hot" },
    { value: "save environment", label: "Save environment" },
    { value: "SciFi", label: "SciFi" },
    { value: "jokes", label: "Jokes" },
    { value: "important", label: "Important" },
  ];

  const onSubmit = (data) => {
    const { title, content, tags } = data;

    const tagArray = tags.map((tag) => tag.value);

    const apiData = {
      title,
      content,
      tags: tagArray,
      author: userInfo?._id,
    };

    // API
    axios
      .post("http://localhost:5000/posts", apiData)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your post has been submitted",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate("/user-dashboard/my-post");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-1/2 mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            {...register("title", { required: "This field is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Title"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            {...register("content", { required: "This field is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Content"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tags"
          >
            Tags
          </label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={tagOptions}
                isMulti
                onChange={(selectedOptions) =>
                  setValue("tags", selectedOptions)
                }
              />
            )}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
