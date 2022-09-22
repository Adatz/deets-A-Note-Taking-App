import React from "react";

const LandingPage = () => {
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   //const navigate = useNavigate()

  //   if (userInfo) {
  //     navigate("/archive");
  //   }
  // }, [navigate]);
  return (
    <div className="min-h-screen mx-4 ">
      <div className="">
        <h1 className="text-6xl font-bold flex justify-center mt-32">
          welcome to deets
        </h1>
        <h2 className="text-4xl font-bold flex  justify-center text-gray-600">
          a digital notebook, for your ideas.
        </h2>
      </div>
      <div className="flex justify-center my-10">
        <a
          className="relative inline-block group focus:outline-none focus:ring"
          href="/login"
        >
          <span className="absolute inset-0 transition-transform translate-x-0 translate-y-0 bg-black group-hover:translate-y-1.5 group-hover:translate-x-1.5"></span>

          <span className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current text-white border-black">
            Get Started
          </span>
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
