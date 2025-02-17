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
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/app.context";
import { FILE_EXAMPLE } from "@/definitions/costants";
import { cn } from "@/lib/utils";

export function FileDialog() {
  const {
    createGridFromSourceFile,
    setSourceFile,
    setSourceFileError,
    sourceFile,
    sourceFileError,
  } = useApp();

  const onClose = () => {
    setSourceFile(null);
    setSourceFileError(null);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setSourceFile(event.target.files[0]);
      setSourceFileError(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Load Grid File</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onCloseAutoFocus={onClose}>
        <DialogHeader>
          <DialogTitle>Load Grid from File</DialogTitle>
          <DialogDescription>
            Load a grid from a text file with the following format:
          </DialogDescription>
          <div className="bg-gray-100 text-gray-500 font-mono text-xs p-3 rounded-lg border border-gray-200 text-left">
            {FILE_EXAMPLE}
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-1.5 py-4">
          <Input
            accept=".txt"
            className={cn(
              "cursor-pointer",
              sourceFileError && "border-red-500"
            )}
            id="grid-file"
            onChange={onFileChange}
            type="file"
          />
          {sourceFileError && (
            <p className="text-red-500 text-sm ml-1">{sourceFileError}</p>
          )}
        </div>
        <DialogFooter>
          <Button disabled={!sourceFile} onClick={createGridFromSourceFile}>
            Load
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
