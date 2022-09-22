import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDeetAction, listDeets } from "../actions/deetsAction";
import ErrorMessage from "../componenets/ErrorMessage";
import Loading from "../componenets/Loading";
import { Link, useNavigate } from "react-router-dom";

const Archive = ({ search }) => {
  const dispatch = useDispatch();
  const deetList = useSelector((state) => state.deetList);
  const { loading, error, deets } = deetList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deetCreate = useSelector((state) => state.deetCreate);
  const { success: successCreate } = deetCreate;

  const deetUpdate = useSelector((state) => state.deetUpdate);
  const { success: successUpdate } = deetUpdate;

  const deetDelete = useSelector((state) => state.deetDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deetDelete;

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listDeets());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteDeetAction(id));
    }
  };

  return (
    <div className="md:mx-32 mx-4 ">
      <h1 className="flex justify-center">archive</h1>
      <hr className="my-6 border-gray-200"></hr>
      <Link to="/createdeet">
        <button className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current text-white bg-black">
          create new
        </button>
      </Link>

      {errorDelete && <ErrorMessage />}
      {loadingDelete && <Loading />}

      {error && <ErrorMessage />}
      {loading && <Loading />}
      {deets?.reverse()
      .filter((filteredDeet) => (
        filteredDeet.title.toLowerCase().includes(search.toLowerCase())
      )).map((deet) => (
        <div className="py-2">
          <details class="group">
            <summary class="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-100">
              <h5 class="font-medium text-gray-900">{deet.title}</h5>

              <svg
                class="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <span className="bg-gray-300 px-4 mt-4 text-right ">
              Category - {deet.category}
            </span>

            <p class="px-4 m-4 leading-relaxed text-[#2A8FDA]">
              {deet.content}
            </p>
            <div className="py-3 flex justify-between">
              <footer className="blockquote-footer text-gray-500">
                created on - <cite>{deet.createdAt.substring(0, 10)}</cite>
              </footer>
              <div>
                <Link to={`/${deet._id}`}>
                  <button className="relative inline-block px-3 py-2 text-sm font-bold tracking-widest uppercase border-2 border-current text-white bg-[#33618F]">
                    edit
                  </button>
                </Link>

                <button
                  className="relative inline-block px-3 py-2 text-sm font-bold tracking-widest uppercase border-2 border-current text-white bg-[#DB817B]"
                  onClick={() => deleteHandler(deet._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
};

export default Archive;
