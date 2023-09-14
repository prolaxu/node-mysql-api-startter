const getErrorMessages = (validation: any) => {
    if (validation.length <= 0) return validation;
    const errors: { [key: string]: string } = {};
    validation.forEach((err: any) => {
        // @ts-ignore
        errors[err.property as string] = Object.values(err.constraints)
    })
    return errors;
}
export default getErrorMessages;