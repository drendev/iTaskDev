
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecentCommitsCardProps {
    projectId: string;
    repo: string;
    owner: string
}

export const RecentCommitsCard = ({
    projectId,
}: RecentCommitsCardProps) => {

    return(
        <Card className="row-span-2">
        <CardHeader>
          <CardTitle>Recent Github Commit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Card className="hover:bg-gray-200 cursor-pointer">
            <CardHeader>
              <div>
                <Badge className="bg-lime-500">On Going</Badge>
              </div>
              <div className="flex items-center gap-3">
                <CardTitle className="text-lg">Sprint 1 Meeting</CardTitle>
              </div>
              <CardDescription>Implementation of objective # 1</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
          </Card>
          <Card className="hover:bg-gray-200 cursor-pointer">
            <CardHeader>
              <div>
                <Badge className="bg-blue-500">Scheduled</Badge>
              </div>
              <div className="flex items-center gap-3">
                <CardTitle className="text-lg">Sprint 2 Meeting</CardTitle>
              </div>
              <CardDescription>Implementation of objective # 2</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
          </Card>
          <Card className="hover:bg-gray-200 cursor-pointer">
            <CardHeader>
              <div>
                <Badge className="bg-blue-500">Scheduled</Badge>
              </div>
              <div className="flex items-center gap-3">
                <CardTitle className="text-lg">Sprint 3 Meeting</CardTitle>
              </div>
              <CardDescription>Implementation of objective # 3</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    )
}