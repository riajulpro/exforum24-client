import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import usePostTags from "../../hooks/data/usePostTags";

const CreateTagsOption = () => {
  const { register, handleSubmit, reset } = useForm();

  const { refetch } = usePostTags();

  const onSubmit = (data) => {
    console.log(data);

    axios
      .post("https://exforum24.vercel.app/tags", data, {
        withCredentials: true,
      })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your post has been submitted",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        refetch();
      })
      .catch((err) => console.log("Tags adding error: ", err));
  };

  return (
    <div>
      <h1 className="font-semibold text-xl mb-2">Add tags option</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-1 justify-center">
          <input
            {...register("label", { required: "You must fill the input" })}
            placeholder="enter the label"
            className="p-2 border w-full"
          />
          <input
            {...register("value", { required: "You must fill the input" })}
            placeholder="enter the value"
            className="p-2 border w-full"
          />
        </div>
        <input
          type="submit"
          value="Add"
          className="bg-blue-600 hover:bg-blue-500 py-2 px-3 rounded text-white mt-2 w-full cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CreateTagsOption;
