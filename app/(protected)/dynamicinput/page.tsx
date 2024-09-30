"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DynamicInput = () => {
  const [inputFields, setInputFields] = useState([{ value: "" }]);

  const handleValueChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { value: "" }]);
  };

  const handleRemoveFields = (index: number) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  return (
    <div>
      <p>Dynamic Input Fields</p>

      {inputFields.map((inputField, index) => (
        <div key={index} className="flex w-96 items-center gap-5">
          <Input
            type="text"
            value={inputField.value}
            onChange={(e) => handleValueChange(index, e)}
          />
          <Button onClick={() => handleRemoveFields(index)}>Delete</Button>
        </div>
      ))}

      <Button onClick={handleAddFields} className="mt-24">
        Add Field
      </Button>
    </div>
  );
};

export default DynamicInput;
