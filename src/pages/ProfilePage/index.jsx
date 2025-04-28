import MainModel from "@components/MainModel";
import { useEffect } from "react";
import { getEmailApi } from "@apis";

const ProfilePage = () => {

  useEffect(() => {
    getEmailApi()
      .then(data => {
        setText(data);
      });
  }, []);

  return (
    <>
      <MainModel />
    </>
  );
}

export default ProfilePage;
