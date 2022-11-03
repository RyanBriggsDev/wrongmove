import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Protected(props) {
  const router = useRouter();
  const now = Math.floor(Date.now() / 1000);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  //Test for user & that token is valid
  if (user && now > user.expiry) {
    router.push("/logout");
  }

  //Test for user & that token is valid
  if (user && now < user.expiry) {
    return (
      <>
        <Navigation icon={user.userData.icon} />
        <div className="min-h-screen bg-salt dark:bg-coal text-coal dark:text-salt">{props.children}</div>
      </>
    );
  }

  return <p>Loading...</p>;
}