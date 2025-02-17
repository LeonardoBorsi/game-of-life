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
import { Label } from "@/components/ui/label";
import { useApp } from "@/contexts/app.context";

export function DimensionsDialog() {
  const { createEmptyGrid, dimensions, setCols, setRows } = useApp();

  const enableCreateButton = [dimensions.rows, dimensions.cols].every(
    (val) => val && val > 0 && val <= 50
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Empty Grid</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Empty Grid</DialogTitle>
          <DialogDescription>
            Create a new empty grid with the specified dimensions (max 50x50).
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5 py-4">
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="name">Rows</Label>
            <Input
              id="rows"
              max={50}
              min={1}
              onChange={(event) =>
                setRows(event.target.value ? parseInt(event.target.value) : 0)
              }
              type="number"
              value={dimensions.rows}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="columns">Columns</Label>
            <Input
              id="columns"
              max={50}
              min={1}
              onChange={(event) =>
                setCols(event.target.value ? parseInt(event.target.value) : 0)
              }
              type="number"
              value={dimensions.cols}
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={!enableCreateButton} onClick={createEmptyGrid}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
