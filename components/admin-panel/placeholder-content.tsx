"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { PiArrowsLeftRightThin } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";
import { useCurrentUser } from "@/hooks/use-current-user";

const PlaceholderContent = () => {
  const user = useCurrentUser();

  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 992 });
  const isLargeScreen = useMediaQuery({ minWidth: 993, maxWidth: 1550 });

  if (isSmallScreen) {
    return (
      <div className="w-full p-5">
        <div className="w-full">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`${user?.image}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-2xl">{user?.name}</p>
              <p className="text-gray-500">Welcome to iTaskDev Home Page</p>
            </div>
          </div>
          <Separator className="my-5" />
        </div>

        {/* Cards */}
        <div className="flex flex-wrap w-full">
          <div className="flex flex-col gap-5 w-full">
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Add or manage users</CardDescription>
                  </div>
                  <div className="flex items-center text-sm">Manage</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-5">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage />
                    <AvatarFallback>+</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col items-start space-y-5 text-sm">
                  <button>Add a user</button>
                  <button>Delete a user</button>
                  <button>Update a users name or email</button>
                  <button className="text-start">
                    Create an alternate email address (email alias)
                  </button>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Product Updates</CardTitle>
                    <CardDescription>
                      Latest updates in iTaskDev
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">View all</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="text-sm mr-8">
                    Implementation of DevIntel AI an SDLC Recommendation feature
                    to find the best Methodology for your project powered by
                    NLP.
                  </div>
                  <div className="flex text-sm text-gray-500">September 23</div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Discover</CardTitle>
                    <CardDescription>
                      Get the most out of iTaskDev
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">Manage</div>
                </div>
              </CardHeader>
              <CardContent>
                <Image
                  src="/transhumans/experiments.png"
                  alt="expe"
                  width={500}
                  height={500}
                  className="w-56 h-full mx-auto"
                />
                <p className="text-sm my-5">Get the most out of iTaskDev</p>
                <p className="text-sm my-5 text-gray-500">
                  Learn more about the best features of iTaskDev and make sure
                  everything is set up just right.
                </p>
                <button>DISCOVER ITASKDEV</button>
              </CardContent>
            </Card>
          </div>
          {/* col 2 */}
          <div className="flex flex-col gap-5 w-full">
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Billing</CardTitle>
                    <CardDescription>
                      Manage subscriptions and billing
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">Manage</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-start text-sm space-y-10">
                  <button className="mt-5">Manage subscriptions</button>
                  <button>Payment accounts</button>
                  <button>Get more services</button>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Domains</CardTitle>
                    <CardDescription>Manage your domains</CardDescription>
                  </div>
                  <div className="flex items-center text-sm">Overview</div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm">Primary domain</p>
                <p className="text-xl">itask.dev</p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <div className="mr-5">
                    <CardTitle>Alerts</CardTitle>
                    <CardDescription>
                      View notifications about potential issues
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">View all</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <PiArrowsLeftRightThin /> Primary admin changed
                  </div>
                  <div className="text-gray-500 text-sm">September 23</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } else if (isMediumScreen) {
    return (
      <div className="w-full p-5">
        <div className="w-full">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`${user?.image}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-2xl">{user?.name}</p>
              <p className="text-gray-500">Welcome to iTaskDev Home Page</p>
            </div>
          </div>
          <Separator className="my-5" />
        </div>

        {/* Cards */}
        <div className="flex flex-wrap w-full">
          <div className="flex flex-col gap-5 w-full">
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>Collaborative tasks progress</CardDescription>
                  </div>
                  <div className="flex items-center text-sm">View All</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-5">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage />
                    <AvatarFallback>+</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col items-start space-y-3 text-sm">
                  <button>My progress</button>
                  <button>View tasks calendar</button>
                  <button>Recent Tasks</button>
                  <button>
                    Task analytics
                  </button>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                      Handle security and privacy
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">View all</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="text-sm mr-8">
                    Learn how we handle your data and how to keep it safe.
                  </div>
                  <div className="flex text-sm text-gray-500">Data Encryption</div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Discover</CardTitle>
                    <CardDescription>
                      Get the most out of iTaskDev
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">Manage</div>
                </div>
              </CardHeader>
              <CardContent>
                <Image
                  src="/transhumans/experiments.png"
                  alt="expe"
                  width={500}
                  height={500}
                  className="w-64 h-52 mx-auto"
                />
                <p className="text-sm my-5">Get the most out of iTaskDev</p>
                <p className="text-sm my-5 text-gray-500">
                  Learn more about the best features of iTaskDev and make sure
                  everything is set up just right.
                </p>
                <button>DISCOVER ITASKDEV</button>
              </CardContent>
            </Card>
          </div>
          {/* col 2 */}
          <div className="flex flex-col gap-5 w-full">
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>
                      Create and manage projects
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">Manage</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-start text-sm space-y-10">
                  <button className="mt-5">My own projects</button>
                  <button>Create project</button>
                  <button>Project analytics</button>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Domains</CardTitle>
                    <CardDescription>Manage your domains</CardDescription>
                  </div>
                  <div className="flex items-center text-sm">Overview</div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm">Primary domain</p>
                <p className="text-xl">itask.dev</p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <div className="mr-5">
                    <CardTitle>Alerts</CardTitle>
                    <CardDescription>
                      View notifications about potential issues
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">View all</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <PiArrowsLeftRightThin /> Primary admin changed
                  </div>
                  <div className="text-gray-500 text-sm">September 23</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } else if (isLargeScreen) {
    return (
      <div className="w-full p-5">
        <div className="w-full">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`${user?.image}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-2xl">{user?.name}</p>
              <p className="text-gray-500">Welcome to iTaskDev Home Page</p>
            </div>
          </div>
          <Separator className="my-5" />
        </div>

        {/* Cards */}
        <div className="flex flex-wrap w-full">
          <div className="flex flex-col gap-5 mr-5  mb-5">
            <Card className="w-[320px]">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>Collaborative tasks progress</CardDescription>
                  </div>
                  <div className="flex top-0 text-sm">View All</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-5">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>1</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage />
                    <AvatarFallback>+</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col items-start space-y-3 text-sm">
                  <button>My progress</button>
                  <button>View tasks calendar</button>
                  <button>Recent Tasks</button>
                  <button className="text-start">
                    Task analytics
                  </button>
                </div>
              </CardContent>
            </Card>
            <Card className="w-[320px]">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                      Handle security and privacy
                    </CardDescription>
                  </div>
                  <div className="flex top-0 text-sm">View all</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="text-sm mr-8">
                    Learn how we handle your data and how to keep it safe.
                  </div>
                  <div className="flex text-sm text-gray-500">Data Encryption</div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* col 2 */}
          <div className="flex flex-col gap-5 mr-5 mb-5">
            <Card className="w-[320px]">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>
                      Create and manage project 
                    </CardDescription>
                  </div>
                  <div className="flex top-0 text-sm">Manage</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-start text-sm space-y-3">
                  <button className="mt-5">My own projects</button>
                  <button>Create project</button>
                  <button>Project analytics</button>
                </div>
              </CardContent>
            </Card>
            <Card className="w-[320px]">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Alerts</CardTitle>
                    <CardDescription>Manage your notifications</CardDescription>
                  </div>
                  <div className="flex items-center text-sm">Overview</div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm">Primary notification</p>
                <p className="text-xl">Email</p>
              </CardContent>
            </Card>
          </div>
          {/* 3rd Column */}
          <div className="flex flex-col gap-5 mr-5">
            <Card className="w-[320px]">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Discover</CardTitle>
                    <CardDescription>
                      Get the most out of iTaskDev
                    </CardDescription>
                  </div>
                  <div className="flex top-0 text-sm">Manage</div>
                </div>
              </CardHeader>
              <CardContent>
                <Image
                  src="/transhumans/experiments.png"
                  alt="expe"
                  width={500}
                  height={500}
                  className="w-56 h-full mx-auto"
                />
                <p className="text-sm my-5">Get the most out of iTaskDev</p>
                <p className="text-sm my-5 text-gray-500">
                  Learn more about the best features of iTaskDev and make sure
                  everything is set up just right.
                </p>
                <button>DISCOVER ITASKDEV</button>
              </CardContent>
            </Card>

            <Card className="w-[320px]">
              <CardHeader>
                <div className="flex justify-between">
                  <div className="mr-5">
                    <CardTitle>Help</CardTitle>
                    <CardDescription>
                      Get help from iTaskDev
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">View all</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <PiArrowsLeftRightThin /> Primary admin changed
                  </div>
                  <div className="text-gray-500 text-sm">September 23</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full p-5">
        <div className="w-full">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`${user?.image}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-2xl">{user?.name}</p>
              <p className="text-gray-500">Welcome to iTaskDev Home Page</p>
            </div>
          </div>
          <Separator className="my-5" />
        </div>

        {/* Cards */}
        <div className="flex flex-wrap w-full">
          <div className="flex flex-col gap-5 mr-5">
            <Card className="w-[400px]">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Add or manage users</CardDescription>
                  </div>
                  <div className="flex items-center text-sm">Manage</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-5">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage />
                    <AvatarFallback>+</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col items-start space-y-5 text-sm">
                  <button>Add a user</button>
                  <button>Delete a user</button>
                  <button>Update a users name or email</button>
                  <button>
                    Create an alternate email address (email alias)
                  </button>
                </div>
              </CardContent>
            </Card>
            <Card className="w-[400px]">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Product Updates</CardTitle>
                    <CardDescription>
                      Latest updates in iTaskDev
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">View all</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="text-sm mr-8">
                    Implementation of DevIntel AI an SDLC Recommendation feature
                    to find the best Methodology for your project powered by
                    NLP.
                  </div>
                  <div className="flex text-sm text-gray-500">September 23</div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* col 2 */}
          <div className="flex flex-col gap-5 mr-5">
            <Card className="w-[400px]">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Billing</CardTitle>
                    <CardDescription>
                      Manage subscriptions and billing
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">Manage</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-start text-sm space-y-10">
                  <button className="mt-5">Manage subscriptions</button>
                  <button>Payment accounts</button>
                  <button>Get more services</button>
                </div>
              </CardContent>
            </Card>
            <Card className="w-[400px]">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Domains</CardTitle>
                    <CardDescription>Manage your domains</CardDescription>
                  </div>
                  <div className="flex items-center text-sm">Overview</div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm">Primary domain</p>
                <p className="text-xl">itask.dev</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-5 mr-5">
            <Card className="w-[400px]">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Discover</CardTitle>
                    <CardDescription>
                      Get the most out of iTaskDev
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">Manage</div>
                </div>
              </CardHeader>
              <CardContent>
                <Image
                  src="/transhumans/experiments.png"
                  alt="expe"
                  width={500}
                  height={500}
                  className="w-56 h-full mx-auto"
                />
                <p className="text-sm my-5">Get the most out of iTaskDev</p>
                <p className="text-sm my-5 text-gray-500">
                  Learn more about the best features of iTaskDev and make sure
                  everything is set up just right.
                </p>
                <button>DISCOVER ITASKDEV</button>
              </CardContent>
            </Card>
            <Card className="w-[400px]">
              <CardHeader>
                <div className="flex justify-between">
                  <div className="mr-5">
                    <CardTitle>Alerts</CardTitle>
                    <CardDescription>
                      View notifications about potential issues
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">View all</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <PiArrowsLeftRightThin /> Primary admin changed
                  </div>
                  <div className="text-gray-500 text-sm">September 23</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
};

export default PlaceholderContent;
