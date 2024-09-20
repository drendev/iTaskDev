"use client";

import React from "react";
import { useState } from "react";

export default function OpenAI() {
  const [data, setData] = useState<string>("");

  const FormAction = async (formData: FormData): Promise<void> => {
    const res = await fetch("http://localhost:3000/api/openapi", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setData(data);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    FormAction(formData);
  };

  return (
    <>
      <div className="flex">
        <form onSubmit={handleSubmit}>
          <textarea rows={30} cols={50} name="first" placeholder="q1" />

          <button className="bg-red-500 p-5 text-white rounded-md m-5" type="submit" name="submit">
            Submit
          </button>
        </form>

        <div className="text-2xl m-5">{data ? data : "loading"}</div>
      </div>
    </>
  );
}
