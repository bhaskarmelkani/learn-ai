import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CanonicalReviewDialog() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Canonical dialog</Badge>
            <Badge variant="secondary">Accessible title + description</Badge>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-stone-900 dark:text-white">
            Checkpoint review pattern
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600 dark:text-gray-400">
            Use this pattern for confirm actions, quick review flows, and changes that need explicit acknowledgement.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Open review dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Ship the checkpoint update?</DialogTitle>
              <DialogDescription>
                This confirms the current copy, validation, and learner progression messaging before the lesson goes live.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 rounded-2xl bg-stone-50 p-4 dark:bg-gray-900">
              <p className="text-sm font-medium text-stone-900 dark:text-white">
                What this dialog demonstrates
              </p>
              <ul className="list-disc space-y-2 pl-5 text-sm text-stone-600 dark:text-gray-400">
                <li>DialogTitle and DialogDescription are always present.</li>
                <li>Primary and secondary actions are visually distinct.</li>
                <li>Short task framing keeps the decision easy to scan.</li>
              </ul>
            </div>
            <DialogFooter showCloseButton>
              <Button onClick={() => setOpen(false)}>Approve and continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
