import { createContext, useContext } from 'react';

export const FormLoadingContext = createContext(false);

export const useFormLoading = () => useContext(FormLoadingContext);
