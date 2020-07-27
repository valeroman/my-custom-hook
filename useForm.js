import { useState } from 'react'

// Manejar los estados del formulario
// Validaciones, campos obligatorios etc...
export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [target.name]: target.value
        });
    }

    return [values, handleInputChange, reset]
}