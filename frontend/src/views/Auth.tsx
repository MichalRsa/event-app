import { FormikState } from 'formik';
import SignForm from '../components/SignForm';

export type HandleSubmit = (
  values: {
    [key: string]: string;
  },
  {
    setSubmitting,
    resetForm,
  }: {
    setSubmitting: (isSubmitting: boolean) => void;
    resetForm: (
      nextState?:
        | Partial<
            FormikState<{
              [key: string]: string;
            }>
          >
        | undefined
    ) => void;
  }
) => Promise<unknown>;

export interface EventData {
  date: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
}

const Auth = () => {
  const handleSubmit: HandleSubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    setSubmitting(false);
    resetForm({
      values: {
        firstName: '',
        lastName: '',
        email: '',
        date: '',
      },
    });
  };
  return (
    <div>
      <div>
        <SignForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Auth;
