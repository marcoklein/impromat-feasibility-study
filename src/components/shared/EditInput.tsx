import { TickIcon, EditIcon, IconButton, TextInput } from "evergreen-ui";
import React, { useState } from "react";

export function EditInput(props: {
  value: string;
  onChangeValue: (newValue: string) => void;
}) {
  const [edit, setEdit] = useState(false);
  if (edit) {
    return (
      <>
        <TextInput
          value={props.value}
          onChange={(e: any) => {
            props.onChangeValue(e.target.value);
          }}
        ></TextInput>
        <IconButton icon={TickIcon} onClick={() => setEdit(false)}></IconButton>
      </>
    );
  }
  return (
    <>
      {props.value}
      <IconButton
        appearance="minimal"
        size="small"
        icon={EditIcon}
        onClick={() => setEdit(true)}
      ></IconButton>
    </>
  );
}
