"use client";

import { Task } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const AllTasksCard = () => {



  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>All tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Intensity</TableHead>
              <TableHead className="text-right">Deadline</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {tasks.map((task, index) => ( */}
              <TableRow>
                <TableCell className="break-all">{task.content}</TableCell>
                <TableCell>{task.Intensity}</TableCell>
                <TableCell className="text-right">
                  {task.DateDue?.toString()}
                </TableCell>
              </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default AllTasksCard;
