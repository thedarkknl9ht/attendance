import { useState, createContext } from "react";
////________________________________________________________________
const editingKeyContext = createContext({});
////________________________________________________________________
interface props {
  initialValue?: string;
  children: React.ReactNode;
}

const EditingKeyProvider = (props: props) => {
  const [editingKey, setEditingKey] = useState(props.initialValue);
  const [editingRowKeys, setEditingRowKeys] = useState({});

  const [counter, setCounter] = useState(0);

  const isActive = editingKey !== null && editingKey !== undefined;
  const isEditing = editingKey !== null && editingKey !== undefined;
  const isNew = editingKey === "";
  const isEdit = editingKey && editingKey?.length > 0;
  ////________________________________________________________________
  function handleEditingRowKeysChange(name: string, key?: string) {
    setEditingRowKeys({ [name]: key });
  }
  ////________________________________________________________________
  return (
    <editingKeyContext.Provider
      value={{
        editingKey,
        setEditingKey,
        editingRowKeys,
        setEditingRowKeys: handleEditingRowKeysChange,
        counter,
        setCounter,
        isActive,
        isNew,
        isEdit,
        isEditing,
      }}
    >
      {props.children}
    </editingKeyContext.Provider>
  );
};
////________________________________________________________________
export { EditingKeyProvider, editingKeyContext };
