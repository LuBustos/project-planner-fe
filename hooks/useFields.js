
import { useState } from 'react';

function useFields(initial_form){
    const [fields, setFields] = useState(initial_form);
  
    const onChangeFields = (name, value) => {
      setFields({
        ...fields,
        [name]: value,
      });
    };

    const saveAllFields = (data) => {
      setFields({
        ...data
      })
    }

    const cleanFields = () => {
      setFields(initial_form);
    }

    return {fields,onChangeFields,saveAllFields,cleanFields}
}

export default useFields;