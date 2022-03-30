import Enter from "../components/Enter";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppSelector } from "../redux/hooks";

const Splash: NextPage = () => {
  const router = useRouter();

  //Page's state (data)
  const uid = useAppSelector((state) => state.user.uid);

  return (
    <>
      {uid !== "" && uid !== null && uid !== undefined ? ( //Check if we're authenticated
        router.push("/Home")
      ) : (
        <Enter />
      )}
    </>
  );
};

export default Splash;
