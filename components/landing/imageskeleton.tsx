import React from "react";
import { Skeleton } from "../ui/skeleton";

const ImageSkeleton: React.FC = () => {
  return <Skeleton className="w-full h-32 md:h-96 xl:h-[490px] rounded-xl" />;
};

export default ImageSkeleton;
