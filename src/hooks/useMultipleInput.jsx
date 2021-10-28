import { useState } from 'react';

const useMultipleInput = initialValues => {
  const [values, setValues] = useState(initialValues);

  const handleChange = event => {
    const { name, value } = event.target;
    const valuesMap = { ...values, [name]: value };
    setValues(Object.values(valuesMap));
  };

  return [values, handleChange];
};

export default useMultipleInput;
