import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronDown,
  AlignJustify,
  Grid2X2,
  Code,
  Scroll,
  FileCode,
  Cherry,
  Cloudy,
  Ellipsis,
  TestTube,
  Rocket,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useMediaQuery } from "react-responsive";

const test = [
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <Code className="p-2 rounded-lg bg-amber-500 w-10 h-10 text-white" />
        iTaskDev Beta
      </Link>
    ),
    SDLC: "Scrum",
    openTest: "9 minutes ago",
  },
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <Scroll className="p-2 rounded-lg bg-blue-500 w-10 h-10 text-white" />
        SpeakWiz
      </Link>
    ),
    SDLC: "Waterfall",
    openTest: "1 day ago",
  },
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <FileCode className="p-2 rounded-lg bg-cyan-500 w-10 h-10 text-white" />
        DevLine
      </Link>
    ),
    SDLC: "Kanban",
    openTest: "2 days ago",
  },
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <Cherry className="p-2 rounded-lg bg-pink-500 w-10 h-10 text-white" />
        CherryTop
      </Link>
    ),
    SDLC: "V-Shape",
    openTest: "5 days ago",
  },
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <Cloudy className="p-2 rounded-lg bg-fuchsia-500 w-10 h-10 text-white" />
        iCloud
      </Link>
    ),
    SDLC: "DevOps",
    openTest: "10 days ago",
  },

  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <Cloudy className="p-2 rounded-lg bg-fuchsia-500 w-10 h-10 text-white" />
        iCloud
      </Link>
    ),
    SDLC: "DevOps",
    openTest: "10 days ago",
  },
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <Cloudy className="p-2 rounded-lg bg-fuchsia-500 w-10 h-10 text-white" />
        iCloud
      </Link>
    ),
    SDLC: "DevOps",
    openTest: "10 days ago",
  },
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <Cloudy className="p-2 rounded-lg bg-fuchsia-500 w-10 h-10 text-white" />
        iCloud
      </Link>
    ),
    SDLC: "DevOps",
    openTest: "10 days ago",
  },
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <Cloudy className="p-2 rounded-lg bg-fuchsia-500 w-10 h-10 text-white" />
        iCloud
      </Link>
    ),
    SDLC: "DevOps",
    openTest: "10 days ago",
  },
  {
    project: (
      <Link href="#" className="hover:underline flex items-center gap-3">
        <Cloudy className="p-2 rounded-lg bg-fuchsia-500 w-10 h-10 text-white" />
        iCloud
      </Link>
    ),
    SDLC: "DevOps",
    openTest: "10 days ago",
  },
];

const ProjectList = () => {
  const [layout, setLayout] = useState<string>("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = test.slice(firstPostIndex, lastPostIndex);

  console.log(currentPosts);
  return (
    <>
      {isSmallScreen ? (
        <div className="mt-5 flex flex-col justify-between my-5">
          <div className="flex items-center gap-3 text-4xl font-semibold ml-4">
            <Rocket size={30} />
            Projects
          </div>

          <div className="flex space-x-2 mt-5 justify-between">
            <Button>+ Create a Project</Button>
            <div>
              <Button
                variant="ghost"
                onClick={() => (setLayout("list"), setPostsPerPage(5))}
                className={layout === "list" ? "bg-gray-100" : ""}
              >
                <AlignJustify />
              </Button>
              <Button
                variant="ghost"
                onClick={() => (setLayout("grid"), setPostsPerPage(8))}
                className={layout === "grid" ? "bg-gray-100" : ""}
              >
                <Grid2X2 />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 flex justify-between my-5">
          <div className="flex items-center gap-3 text-4xl font-semibold ml-4">
            <Rocket size={30} />
            Projects
          </div>

          <div className="flex space-x-2 mt-5 justify-between">
            <Button>+ Create a Project</Button>
            <div>
              <Button
                variant="ghost"
                onClick={() => (setLayout("list"), setPostsPerPage(5))}
                className={layout === "list" ? "bg-gray-100" : ""}
              >
                <AlignJustify />
              </Button>
              <Button
                variant="ghost"
                onClick={() => (setLayout("grid"), setPostsPerPage(8))}
                className={layout === "grid" ? "bg-gray-100" : ""}
              >
                <Grid2X2 />
              </Button>
            </div>
          </div>
        </div>
      )}

      {layout === "list" ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SDLC</TableHead>
                {!isSmallScreen && <TableHead>Opened by you</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPosts.map((proj, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{proj.project}</TableCell>
                  <TableCell>{proj.SDLC}</TableCell>
                  {!isSmallScreen && <TableCell>{proj.openTest}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
          {currentPosts.map((proj, index) => (
            <Card className="mb-5 mr-5" key={index}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-lg">
                  {proj.project}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{proj.SDLC}</p>
                <p className="text-gray-400">{proj.openTest}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <PaginationSection
        totalPosts={test.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ProjectList;

function PaginationSection({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalPosts: any;
  postsPerPage: any;
  currentPage: any;
  setCurrentPage: any;
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5; // Maximum page numbers to display at once
  const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to render page numbers with ellipsis
  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={currentPage === page ? "bg-neutral-100 rounded-md" : ""}
      >
        <PaginationLink onClick={() => setCurrentPage(page)}>
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    // Add ellipsis at the start if necessary
    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(activePages[0] - 1)}
        />
      );
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            setCurrentPage(activePages[activePages.length - 1] + 1)
          }
        />
      );
    }

    return renderedPages;
  };

  return (
    <div className="my-10">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
