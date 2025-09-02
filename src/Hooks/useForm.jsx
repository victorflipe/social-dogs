import React from 'react'

const types = {
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Preencha um email válido"
    },
    password: {
        // At least 8 characters, one letter, one number
        regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message: "A senha deve ter pelo menos 8 caracteres, incluindo letras e números"
    },
    number: {
        regex: /^\d+$/,
        message: "Utilize apenas números"
    }
}

const useForm = (type) => {
    const [value, setValue] = React.useState('')
    const [error, setError] = React.useState(null)

    const validate = (value) => {
        if (type === false) return true
        if (value.length === 0) {
            setError("Preencha um valor.")
            return false
        }
        if (types[type] && !types[type].regex.test(value)) {
            setError(types[type].message)
            return false
        }
        setError(null)
        return true
    }

    const onChange = ({ target }) => {
        console.log('Teve a troca? '.target)
        if (error) validate(target.value)
        setValue(target.value)
    }

    return {
        value,
        error,
        setValue,
        onChange,
        validate: () => validate(value),
        onBlur: () => validate(value)
    }
}

export default useForm