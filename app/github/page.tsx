"use client";

import { getData } from "./lib/getData";
import { Repository } from "./lib/types";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Github() {
  const [gitData, setGitData] = useState();

  async function getGithub() {
    const data = await getData();
    console.log(data);
    setGitData(data);
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 lg:text-left mt-12 gap-4">
        {/* {gitData?.map((repo: Repository) => (
          <div
            key={repo.id}
            className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover: dark:bg-neutral-800/30"
          >
            <div className="flex justify-between items-center mb-4">
              <Image
                src={repo.owner.avatar_url}
                alt="avatar"
                width={40}
                height={40}
                priority
                className="bg-salte-500 rounded-full"
              />
              <h2 className="tex-md font-semibold"> {repo.owner.Login}</h2>
            </div>
          </div>
        ))} */}
        {/* {data.map((repo: Repository) => (
          <div
            key={repo.id}
            className=" group rounded-lg border border-gary-300 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <div className=" flex justify-between items-center mb-4">
              <Image
                src={repo.owner.avatar_url}
                alt="avatar"
                width={40}
                height={40}
                priority
                className="bg-salte-500 rounded-full"
              />
              <h2 className="tex-md font-semibold"> {repo.owner.Login}</h2>
            </div>
        
          </div>
        ))} */}
      </div>
      <button onClick={() => getGithub()}>get</button>
      <button onClick={() => console.log(gitData)}>consolelog</button>
    </main>
    //         <div className=" flex justify-between items-center mb-4">
    //           <Image
    //             src={repo.owner.avatar_url}
    //             alt="avatar"
    //             width={40}
    //             height={40}
    //             priority
    //             className="bg-salte-500 rounded-full"
    //           />
    //           <h2 className="tex-md font-semibold"> {repo.owner.Login}</h2>
    //         </div>

    //     {data.map((repo: Repository) => (
    //       <div
    //         key={repo.id}
    //         className=" group rounded-lg border border-gary-300 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       >
    //         <div className=" flex justify-between items-center mb-4">
    //           <Image
    //             src={repo.owner.avatar_url}
    //             alt="avatar"
    //             width={40}
    //             height={40}
    //             priority
    //             className="bg-salte-500 rounded-full"
    //           />
    //           <h2 className="tex-md font-semibold"> {repo.owner.Login}</h2>
    //         </div>
    //         <div className=" flex flex-col justify-start text-start">
    //           <p className="py-1">repo name: {repo.name}</p>
    //           <p className="m-0 max-w-[30ch] text-sm opacity-50">
    //             {repo.description}
    //           </p>
    //         </div>
    //         <div className="mt-4 ">
    //           <Link href={`${repo.id}`}>
    //             <Button className="capitalize" variant="outline">
    //               view commits
    //             </Button>
    //           </Link>
    //         </div>
    //       </div>
    //     ))}

    // <main className="flex  flex-col items-center justify-between p-24">
    //   <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2 lg:text-lef mt-12 gap-4">
    //     {data.map((repo: Repository) => (
    //       <div
    //         key={repo.id}
    //         className=" group rounded-lg border border-gary-300 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       >
    //         <div className=" flex justify-between items-center mb-4">
    //           <Image
    //             src={repo.owner.avatar_url}
    //             alt="avatar"
    //             width={40}
    //             height={40}
    //             priority
    //             className="bg-salte-500 rounded-full"
    //           />
    //           <h2 className="tex-md font-semibold"> {repo.owner.Login}</h2>
    //         </div>
    //         <div className=" flex flex-col justify-start text-start">
    //           <p className="py-1">repo name: {repo.name}</p>
    //           <p className="m-0 max-w-[30ch] text-sm opacity-50">
    //             {repo.description}
    //           </p>
    //         </div>
    //         <div className="mt-4 ">
    //           <Link href={`${repo.id}`}>
    //             <Button className="capitalize" variant="outline">
    //               view commits
    //             </Button>
    //           </Link>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </main>
  );
}
