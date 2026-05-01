import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
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
import type { ProgressRow } from "./types";

const progressRows: ProgressRow[] = [
  {
    learner: "Priya Shah",
    track: "Conceptual",
    completion: "6 / 13 chapters",
    checkpointAccuracy: "82%",
    nextAction: "Review classification recap",
  },
  {
    learner: "Owen Park",
    track: "Builder",
    completion: "9 / 13 chapters",
    checkpointAccuracy: "76%",
    nextAction: "Retry neural network lab",
  },
  {
    learner: "Maya Chen",
    track: "Builder",
    completion: "13 / 13 chapters",
    checkpointAccuracy: "93%",
    nextAction: "Start capstone teardown",
  },
];

export function CanonicalProgressTable() {
  return (
    <Card className="border-stone-200/80 bg-white/95 shadow-sm dark:border-gray-800 dark:bg-gray-950/90">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Canonical data table</Badge>
          <Badge variant="secondary">Status + next action</Badge>
        </div>
        <CardTitle>Learner progress summary</CardTitle>
        <CardDescription>
          Use this pattern for admin tables and dashboards: concise columns, direct labels, and a final action-oriented column.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Readable summary table with clear next steps for each learner.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Learner</TableHead>
              <TableHead>Track</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead>Checkpoint accuracy</TableHead>
              <TableHead>Next action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {progressRows.map((row) => (
              <TableRow key={row.learner}>
                <TableCell className="font-medium text-stone-900 dark:text-white">
                  {row.learner}
                </TableCell>
                <TableCell>
                  <Badge variant={row.track === "Builder" ? "default" : "outline"}>
                    {row.track}
                  </Badge>
                </TableCell>
                <TableCell>{row.completion}</TableCell>
                <TableCell>{row.checkpointAccuracy}</TableCell>
                <TableCell className="text-stone-600 dark:text-gray-400">
                  {row.nextAction}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
