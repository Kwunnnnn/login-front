import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { AUTH_STORAGE_NAME } from "../../constants/environment";

const Home = () => {
  const history = useHistory();

  const logout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_NAME);
    history.push("/login");
  };

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1"></div>
      <div className="col-span-1">
        <div className="font-bold text-3xl text-center">Login Success</div>
        <div className="w-full flex justify-center">
          <Button onClick={logout} className="mt-5">
            Logout
          </Button>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default Home;
