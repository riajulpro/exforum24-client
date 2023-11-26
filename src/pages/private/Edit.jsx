import { useParams } from "react-router-dom";
import useGetSinglePost from "../../hooks/data/useGetSinglePost";

const Edit = () => {
  const { id: editId } = useParams();
  const { singlePost = [], isLoading } = useGetSinglePost(editId);

  if (isLoading) {
    return "loading...";
  }

  const { title, content, tags } = singlePost[0];

  console.log(title, content, tags);

  const editNow = (e) => {
    e.preventDefault();

    console.log("edited being updated");
  };

  return (
    <div className="md:w-9/12 mx-auto grid grid-cols-12 gap-3 my-5">
      <div className="col-span-2">Left</div>
      <div className="col-span-7">
        <div>
          <form onSubmit={editNow} className="flex flex-col gap-2">
            <input
              type="text"
              name="title"
              defaultValue={title}
              className="p-1"
            />
            <textarea
              name="content"
              defaultValue={content}
              cols="30"
              rows="10"
              className="p-1"
            ></textarea>
            <select name="tags" id="">
              {tags.map((tag) => (
                <option value={tag}>{tag}</option>
              ))}
            </select>
            <input type="submit" value="Update" />
          </form>
        </div>
      </div>
      <div className="col-span-3">right</div>
    </div>
  );
};

export default Edit;
