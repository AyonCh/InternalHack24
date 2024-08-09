"use client";

import axios from "axios";
import { useState } from "react";

export default function AdminCard({ data }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");

  const handleClick = (key, state) => {
    let dialog = document.getElementById("dialog_" + key);
    if (state == "open") {
      dialog.showModal();
    } else {
      dialog.close();
    }

    setNewTitle("");
    setNewDescription("");
    setNewPrice("");
    setNewImage("");
  };

  const handleSubmit = (e, title, description, price, image, key) => {
    e.preventDefault();

    axios.post(`${process.env.NEXT_PUBLIC_URI}/api/shop/update`, {
      title,
      newTitle: newTitle ? newTitle : title,
      newDescription: newDescription ? newDescription : description,
      newPrice: newPrice ? newPrice : price,
      newImage: newImage ? newImage : image,
    });

    handleClick(key, "close");
  };

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];

    reader.addEventListener("load", () => {
      setNewImage(reader.result);
    });

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex gap-10 flex-wrap justify-center sm:justify-start">
      {data.map(({ title, description, price, image }, key) => (
        <>
          <div
            className="relative cursor-pointer w-[335px] sm:w-[250px]"
            onClick={() => handleClick(key, "open")}
            key={key}
          >
            <img
              src={image}
              alt="image"
              height={450}
              width={450}
              draggable={false}
              onDragStart={() => {}}
              className="rounded-lg z-[-1]"
            />
            <div className="rounded-b-lg bg-background/10 absolute bottom-0 left-0 right-0 px-4 py-3 backdrop-blur-[10px]">
              <div className="flex justify-between">
                <div className="">
                  <h1 className="text-xl font-bold">{title}</h1>
                  <p className="text-sm text-text/50 w-20 overflow-x-hidden whitespace-nowrap">
                    {description}
                  </p>
                </div>
                <p className="text-text/50">{price}</p>
              </div>
            </div>
          </div>
          <dialog
            id={"dialog_" + key}
            className="w-dvw h-dvh p-5 rounded-lg text-text border border-primary/10 bg-background bg-opacity-10 backdrop:backdrop-blur-xl"
          >
            <div className="w-full h-full flex justify-center gap-1 sm:gap-10 items-center md:flex-row flex-col md:text-left sm:pr-10">
              <div className="relative cursor-pointer w-[500px]">
                <img
                  src={newImage || image}
                  alt="image"
                  height={500}
                  width={500}
                  draggable={false}
                  onDragStart={() => {}}
                  className="rounded-lg z-[-1]"
                />
                <div className="rounded-b-lg bg-background/10 absolute bottom-0 left-0 right-0 px-4 py-3 backdrop-blur-[10px]">
                  <div className="flex justify-between">
                    <div className="">
                      <h1 className="text-xl font-bold">{newTitle || title}</h1>
                      <p className="text-sm text-text/50 w-60 overflow-x-hidden whitespace-nowrap">
                        {newDescription || description}
                      </p>
                    </div>
                    <p className="text-text/50">{newPrice || price}</p>
                  </div>
                </div>
              </div>
              <form
                className="flex flex-col justify-between w-[600px] gap-5"
                onSubmit={(e) =>
                  handleSubmit(e, title, description, price, image, key)
                }
              >
                <input
                  type="text"
                  placeholder={title}
                  className="border border-primary/5 rounded-md bg-transparent py-3 px-2 w-full placeholder:text-text/25"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={description}
                  className="border border-primary/5 rounded-md bg-transparent py-3 px-2 w-full placeholder:text-text/25"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={price}
                  className="border border-primary/5 rounded-md bg-transparent py-3 px-2 w-full placeholder:text-text/25"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
                <label className="cursor-pointer border border-primary/5 rounded-md bg-transparent py-3 px-2 w-full placeholder:text-text/25">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e)}
                  />
                  <img
                    src={newImage || image}
                    alt="image"
                    height={100}
                    width={100}
                    draggable={false}
                    onDragStart={() => {}}
                    className="rounded-lg z-[-1]"
                  />
                </label>
                <button className="hover:bg-primary/5 p-2 rounded-md w-full">
                  Submit
                </button>
              </form>
              <button
                className="absolute top-5 right-5 h-6 w-6"
                onClick={() => handleClick(key, "close")}
              >
                &#10005;
              </button>
            </div>
          </dialog>
        </>
      ))}
    </div>
  );
}
