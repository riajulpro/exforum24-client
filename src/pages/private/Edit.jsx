import { Select } from "@material-tailwind/react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";

const Edit = () => {
  const { data: editedPost } = useLoaderData();
  const { _id, title, content } = editedPost[0];

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

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: title,
      content: content,
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    // API
    axios
      .put(`http://localhost:5000/posts/${_id}`, data)
      .then(() => {
        console.log("data successfully updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-9/12 mx-auto grid grid-cols-12 gap-2">
      <div className="col-span-2"></div>
      <div className="col-span-7 mt-3 bg-white rounded p-3">
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
      <div className="col-span-3"></div>
    </div>
  );
};

export default Edit;
