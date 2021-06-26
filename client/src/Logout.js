import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "./userSlice";

export default function Logout() {
  const id = useSelector((store) => store.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== null) {
      dispatch(resetUser());
    }
  }, [id]);

  return <></>;
}
