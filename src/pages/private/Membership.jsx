import { Link } from "react-router-dom";
import useSingleUser from "../../hooks/data/useSingleUser";

const Membership = () => {
  const { userInfo = {} } = useSingleUser();

  const { _id, name, email, badges, isAdmin, isMember, profile_picture } =
    userInfo;

  return (
    <div className="w-9/12 mx-auto grid grid-cols-12 gap-2">
      <div className="col-span-2"></div>
      <div className="col-span-7">
        {isMember ? (
          <div className="bg-white shadow-lg m-2 p-5 rounded-md hover:text-violet-400">
            <h3 className="font-bold text-3xl">Congratulation!</h3>
            <h4 className="font-semibold text-xl">
              You have Premium Membership
            </h4>
            <p className="text-slate-600">
              You can post more than 5 if you have subscribe as a premium
              member.
            </p>
          </div>
        ) : (
          <div className="bg-white shadow-lg m-2 p-5 rounded-md hover:text-violet-400">
            <h3 className="font-bold text-3xl">BDT 99</h3>
            <h4 className="font-semibold text-xl">Premium Membership</h4>
            <p className="text-slate-600">
              You can post more than 5 if you have subscribe as a premium
              member.
            </p>
            <div className="flex justify-end">
              <Link
                to={"/user-dashboard/payment"}
                className="bg-violet-600 hover:bg-violet-400 cursor-pointer active:scale-95 px-3 py-1 text-white font-semibold rounded"
              >
                Purchase
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

export default Membership;
