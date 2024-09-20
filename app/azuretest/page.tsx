"use client";

import React from "react";
import { useState } from "react";

type Entity = {
  text: string;
  category: string;
};

type RecognizedEntity = {
  documentId: string;
  entities: Entity[];
};

type Main = {
  recognizedEntities: RecognizedEntity[];
};

export default function AzureTest() {
  const [data, setData] = useState<Main | null>(null);

  const FormAction = async (formData: FormData): Promise<void> => {
    const res = await fetch("http://localhost:3000/api/ner", {
      method: "POST",
      body: formData,
    });

    const jsonData: Main = await res.json();
    setData(jsonData);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    FormAction(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea rows={50} cols={50} name="first" placeholder="q1" />
        <textarea rows={50} cols={50} name="second" placeholder="q2" />

        <button type="submit" name="submit">
          Submit
        </button>
      </form>

      <div>
        <h1>Recognized Entities</h1>
        {data ? (
          data.recognizedEntities.map((entity, index) => (
            <div key={entity.documentId}>
              <h2>Document ID: {entity.documentId}</h2>
              <ul>
                {entity.entities.map((e, idx) => (
                  <li key={idx}>
                    {e.text} - {e.category}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
