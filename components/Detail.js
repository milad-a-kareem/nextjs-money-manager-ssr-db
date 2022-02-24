import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

function Detail({ detail }) {
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState(detail.title);
  const [costAmount, setCostAmount] = useState(detail.costAmount);
  const [date, setDate] = useState(detail.date);

  const onUpdate = () => {
    setIsUpdate(true);
  };
  const onDelete = () => {
    setIsLoading(true);
    fetch(`https://nextjs-money-manager-ssr-db.vercel.app/api/${detail._id}`, { method: "DELETE" })
      .then((r) => {
        setIsLoading(false);
        router.push("/");
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  const onSave = () => {
    setIsLoading(true);
    fetch(`https://nextjs-money-manager-ssr-db.vercel.app/api/${detail._id}`, {
      method: "POST",
      body: JSON.stringify({ title, costAmount, date }),
    })
      .then((r) => {
        setIsLoading(false);
        router.push("/");
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const onTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };
  const onCostChange = (e) => {
    setCostAmount(e.currentTarget.value);
  };
  const onDateChange = (e) => {
    setDate(e.currentTarget.value);
  };
  const inputClass = ` w-full p-4 rounded-xl my-3 disabled:bg-white/50 bg-white/80`;
  return (
    <div className="h-full w-full  flex justify-center items-center">
      <div className="rounded-xl bg-light  w-[60%] flex flex-col p-3">
        <input
          type="text"
          value={title}
          disabled={!isUpdate}
          className={inputClass}
          onChange={onTitleChange}
        />
        <input
          type="number"
          value={costAmount}
          disabled={!isUpdate}
          className={inputClass}
          onChange={onCostChange}
        />
        <input
          type="date"
          value={date}
          disabled={!isUpdate}
          className={inputClass}
          onChange={onDateChange}
        />
        <div className="flex justify-center gap-3 items-center">
          {!isUpdate && (
            <button
              disabled={isLoading}
              className="w-[100px] h-[50px]flex justify-center items-center rounded-xl px-3 py-2 bg-blue-400 hover:bg-blue-900 hover:text-white"
              onClick={onUpdate}
            >
              Edit
            </button>
          )}
          {isUpdate && (
            <button
              disabled={isLoading}
              className="w-[100px] h-[50px]flex justify-center items-center rounded-xl px-3 py-2 bg-green-400 hover:bg-green-900 hover:text-white"
              onClick={onSave}
            >
              {isLoading && (
                <Image
                  src="/loading.svg"
                  height={20}
                  width={20}
                  alt="loading"
                  className="animate-spin"
                />
              )}
              {!isLoading && <span>Save</span>}
            </button>
          )}
          <button
            disabled={isLoading}
            className="w-[100px] h-[50px]flex justify-center items-center rounded-xl px-3 py-2 bg-red-400 hover:bg-red-900 hover:text-white"
            onClick={onDelete}
          >
            {isLoading && (
              <Image
                src="/loading.svg"
                height={20}
                width={20}
                alt="loading"
                className="animate-spin"
              />
            )}
            {!isLoading && <span>Delete</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
