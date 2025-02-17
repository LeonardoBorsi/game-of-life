import { DimensionsDialog } from "@/dialogs/dimensions.dialog";
import { FileDialog } from "@/dialogs/file.dialog";
import { FC } from "react";

export const Menu: FC = () => {
  return (
    <div className="h-full flex flex-col gap-2 py-5">
      <DimensionsDialog />
      <FileDialog />
    </div>
  );
};
