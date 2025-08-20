import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormLoadingContext } from '@/contexts/FormLoadingContext';

export const ZodFormProvider = ({ schema, onSubmit, children, ...rest }) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    ...rest,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = methods.handleSubmit(
    async values => {
      setLoading(true);
      try {
        await onSubmit(values);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    errors => {
      console.error('Zod validation errors:', errors);
    }
  );

  return (
    <FormProvider {...methods}>
      <FormLoadingContext.Provider value={loading}>
        <form onSubmit={handleSubmit}>{children}</form>
      </FormLoadingContext.Provider>
    </FormProvider>
  );
};

ZodFormProvider.propTypes = {
  schema: PropTypes.object,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};
