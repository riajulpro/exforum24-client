import { Outlet } from "react-router-dom";
import Navbar from "../../components/Header/Navbar";

const Template = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Template;
