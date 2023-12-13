import axios from "axios";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Edit = () => {
  const { data: editedPost } = useLoaderData();
  const { _id, title, content } = editedPost[0];

  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: title,
      content: content,
    },
  });

  const onSubmit = (data) => {
    // API
    axios
      .put(`https://exforum24.vercel.app/posts/${_id}`, data, {
        withCredentials: true,
      })
      .then(() => {
        Swal.fire({
          title: "Updated!",
          text: "Your post has been updated.",
          icon: "success",
        });
        navigate(`/posts/${_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Helmet>
        <title>Edit the post</title>
      </Helmet>
      <div className="w-11/12 md:w-9/12 mx-auto grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-2"></div>
        <div className="col-span-12 md:col-span-7 mt-3 bg-white rounded p-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title" className="text-gray-800">
              Title:
              <input
                {...register("title", { required: "This field is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                placeholder="Title"
                id="title"
              />
            </label>
            <label htmlFor="content" className="text-gray-800">
              Content:
              <textarea
                {...register("content", { required: "This field is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Content"
                rows="10"
                id="title"
              ></textarea>
            </label>

            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              type="submit"
              value="Update"
            />
          </form>
        </div>
        <div className="col-span-12 md:col-span-3"></div>
      </div>
    </>
  );
};

export default Edit;
