import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import Loading from "../componenets/Loading";
import ErrorMessage from "../componenets/ErrorMessage";
import { createDeetAction } from "../actions/deetsAction";

function CreateDeet({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const deetCreate = useSelector((state) => state.deetCreate);
  const { loading, error, deet } = deetCreate;

  console.log(deet);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createDeetAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/archive");
  };

  useEffect(() => {}, []);

  return (
    <container>
      <div className="mx-32">
        <h1 className="flex justify-center">create a new deet</h1>
        <hr className="my-6 border-gray-200"></hr>
       
        <form onSubmit={submitHandler}>
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
              Create Deet
            </button>
            <button
              className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current text-white bg-black"
              onClick={resetHandler}
            >
              Reset Fields
            </button>
          </div>
        </form>
        <footer className="blockquote-footer">
          created on - {new Date().toLocaleDateString()}
        </footer>
      </div>
    </container>
  );
}

export default CreateDeet;
