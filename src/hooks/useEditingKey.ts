import { useContext } from "react";

import { editingKeyContext } from "~/library/services";

interface iContext {
  editingKey: any;
  setEditingKey: any;
  editingRowKeys: any;
  setEditingRowKeys: Function;
  counter: number;
  setCounter: Function;
  isActive: boolean;
  isNew: boolean;
  isEdit: boolean;
  isEditing: boolean;
}

export const useEditingKey = () => <iContext>useContext(editingKeyContext);
