import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../componenets/Loading";
import ErrorMessage from "../componenets/ErrorMessage";
import { deleteDeetAction, updateDeetAction } from "../actions/deetsAction";
import axios from "axios";

function CreateDeet({ history, match }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const deetUpdate = useSelector((state) => state.deetUpdate);
  const { loading, error } = deetUpdate;

  const deetDelete = useSelector((state) => state.deetDelete);
  const { loading: loadingDelete, error: errorDelete } = deetDelete;

  const navigate = useNavigate();

  const id = useParams().id;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteDeetAction(id));
    }
    navigate("/archive");
  };

  console.log(id);

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/deets/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateDeetAction(id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/archive");
  };

  return (
    <container>
      <div className="mx-32">
        <h1 className="flex justify-center">Edit deet</h1>
        <hr className="my-6 border-gray-200"></hr>

        <form onSubmit={updateHandler}>
          {errorDelete && <ErrorMessage />}
          {loadingDelete && <Loading />}

          {error && <ErrorMessage />}
          <div className="col-span-6 ">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>

            <input
              type="text"
              value={title}
              id="title"
              name="title"
              className="w-full mt-1  text-gray-700 bg-white border-gray-200 rounded-md shadow-sm"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="col-span-6 ">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>

            <input
              type="text"
              value={content}
              id="content"
              name="content"
              className="w-full  mt-1  text-gray-700 bg-white border-gray-200 rounded-md shadow-sm"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          {content && (
            <div>
              <h1>Deet Preview</h1>
              <div>
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </div>
          )}

          <div className="col-span-6 ">
            <label
              htmlFor="category"
              className="block font-medium text-gray-700"
            >
              Category
            </label>

            <input
              type="text"
              value={category}
              id="category"
              name="category"
              className="w-full mt-1  text-gray-700 bg-white border-gray-200 rounded-md shadow-sm"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {loading && <Loading />}
          <div className="">
            <button className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current text-white bg-black">
              Update
            </button>
            <button
              className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current text-white bg-black"
              onClick={() => deleteHandler(id)}
            >
              Delete
            </button>
          </div>
        </form>
        <footer className="blockquote-footer">
          Updated on - {date.substring(0, 10)}
        </footer>
      </div>
    </container>
  );
}

export default CreateDeet;
