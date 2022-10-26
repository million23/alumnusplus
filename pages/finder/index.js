import { FiArrowRight, FiLoader } from "react-icons/fi";
import { useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";
import { __PageTransition } from "../../lib/animtions";
import __supabase from "../../lib/supabase";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Finder = () => {
  const router = useRouter();
  const [userCoorinates, setUserCoordinates] = useState();
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  // const getDeviceLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setUserCoordinates({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       });
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // };

  const getSuggestedUsers = async () => {
    // get 10 random users
    const { data: users, error } = await __supabase
      .from("random_userdata")
      .select("*")
      .limit(10);
    if (error) {
      console.log(error);
    } else {
      const user = __supabase.auth.user();
      console.log(users);
      const filtered = users.filter(
        (e) =>
          e.data.residingCity === user.user_metadata.residingCity &&
          e.user_id !== user.id
      );
      setSuggestedUsers(filtered);
      setTimeout(() => {
        setLoading(false);
      }, users.length * 200);
      // getDeviceLocation();
    }
  };

  const checkUser = async () => {
    const user = __supabase.auth.user();
    if (!user) {
      router.push("/");
    } else {
      // getDeviceLocation();
      setUser(user);
      getSuggestedUsers();
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && user && (
          <motion.div
            key={loading}
            variants={__PageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 flex flex-col justify-center items-center w-full min-h-screen"
          >
            <motion.div
              animate={{ scale: [0, 1], opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              className="border-2 border-primary rounded-full h-64 w-64 absolute "
            />
            <motion.div
              animate={{ scale: [0, 1], opacity: [0, 0.5, 0] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1,
              }}
              className="border-2 border-primary rounded-full h-64 w-64 absolute "
            />
            <motion.img
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
              src={`https://avatars.dicebear.com/api/micah/${user.user_metadata.username}.svg`}
              className="w-24 h-24 rounded-full bg-base-300 z-10 shadow-lg"
            />
            <p className="absolute bottom-10">Searching</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!loading && user && (
          <motion.main
            variants={__PageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            key={loading}
            className="pb-16 lg:pt-24 pt-36"
          >
            <div className="flex flex-col justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
                {suggestedUsers.map((user, index) => (
                  <motion.div
                    animate={{ y: [10, 0], opacity: [0, 1] }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: index * 0.1,
                    }}
                    key={user.user_id}
                    className="group flex flex-col w-full md:w-auto text-center justify-center items-center bg-base-300 rounded-box p-4 py-3 cursor-pointer"
                  >
                    <img
                      src={`https://avatars.dicebear.com/api/micah/${user.user_id}.svg`}
                      alt="profile"
                      className="w-20 h-20 rounded-full bg-base-100 mt-5"
                    />
                    <p className="mt-5 text-xs font-bold opacity-50">
                      @{user.data.username}
                    </p>
                    <h1 className="font-semibold text-sm">
                      {user.data.first_name} {user.data.last_name}
                    </h1>
                    <p className="text-xs opacity-50">
                      {user.data.residingCity}
                    </p>

                    <p className="hidden lg:flex text-primary text-sm w-full items-center gap-2 mt-10 opacity-20 justify-between font-bold group-hover:opacity-100 transition-all duration-200">
                      Visit Profile <FiArrowRight />
                    </p>

                    <button className="btn btn-primary lg:hidden mt-5 w-full gap-5">
                      Visit Profile <FiArrowRight />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
};

export default Finder;