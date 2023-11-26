import { useParams } from "react-router-dom";
import useGetSinglePost from "../../hooks/data/useGetSinglePost";
import Posts from "../../components/Home/Posts";
import useComments from "../../hooks/data/useComments";
import Comments from "../../components/PostDetails/Comments";
import CreateComment from "../../components/PostDetails/CreateComment";

const PostDetails = () => {
  const { id: pageId } = useParams();
  const { singlePost = [] } = useGetSinglePost(pageId);

  const { comments = [] } = useComments();
  const currentComment = comments.filter(
    (comment) => comment.forPost === pageId
  );

  console.log(currentComment);

  return (
    <div className="md:w-9/12 mx-auto grid grid-cols-12 gap-3 my-5">
      <div className="col-span-2">Left</div>
      <div className="col-span-7">
        <div>
          {singlePost.map((current) => (
            <Posts key={current._id} post={current} />
          ))}
        </div>
        <div>
            <CreateComment />
        </div>
        <div>
          {currentComment?.map((comment) => (
            <Comments key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

export default PostDetails;
