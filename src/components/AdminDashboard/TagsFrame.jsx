import usePostTags from "../../hooks/data/usePostTags";
import TagsTable from "./TagsTable";

const TagsFrame = () => {
  const { allTags = [], refetch } = usePostTags();
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Control Tags Item:</h3>
      <TagsTable tags={allTags} refetch={refetch} />
    </div>
  );
};

export default TagsFrame;
