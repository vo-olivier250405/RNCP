import React, { createContext, useContext, useState } from "react";
import { KeyNPC, loadDialogForNpc, NPC_DIALOGS } from "../utils/speechlines";

type DialogContextType = {
  getNpcDialog: (npcId: KeyNPC) => string[];
  setNpcDialog: (npcId: KeyNPC, newDialog: string[]) => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [npcDialogs, setNpcDialogs] =
    useState<Record<KeyNPC, string[]>>(NPC_DIALOGS);

  const getNpcDialog = (npcId: KeyNPC): string[] => {
    if (!npcDialogs[npcId]) {
      const initialDialog = loadDialogForNpc(npcId);
      setNpcDialogs((prev) => ({ ...prev, [npcId]: initialDialog } as any));
      return initialDialog;
    }
    return npcDialogs[npcId];
  };

  const setNpcDialog = (npcId: KeyNPC, newDialog: string[]) => {
    setNpcDialogs((prev) => ({ ...prev, [npcId]: newDialog } as any));
  };

  return (
    <DialogContext.Provider value={{ getNpcDialog, setNpcDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogs = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogs must be used within a DialogProvider");
  }
  return context;
};
