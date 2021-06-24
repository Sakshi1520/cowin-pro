import React, { useEffect } from "react";
import userService from "services/user";

const UsersList = () => {
  useEffect(() => {
    userService.getAllUsers().then((res) => {
      console.log(res);
    });
  }, []);
  return <div>vaccinator</div>;
};

export default UsersList;
