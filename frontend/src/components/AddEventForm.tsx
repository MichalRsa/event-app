import { Formik, Form, FormikState } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextInput from './TextInput';

const AddEventForm = ({
  handleSubmit,
}: {
  handleSubmit: (
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
  ) => Promise<void>;
}) => {
  return (
    <div className='w-96 bg-slate-100 rounded-lg  mx-auto text-zinc-600 '>
      <div className='w-10/12 mx-auto py-6'>
        <h2 className='text-center'>Add new event</h2>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            date: '',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .matches(/^([^0-9]*)$/, 'Numbers not allowed')
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            lastName: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .matches(/^([^0-9]*)$/, 'Numbers not allowed')
              .required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            date: Yup.date()
              .min(new Date(), 'Must be a future date')
              .required('Required'),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <TextInput
              label='First Name'
              name='firstName'
              id='firstName'
              type='text'
              placeholder='Jane'
            />

            <TextInput
              label='Last Name'
              name='lastName'
              id='lastName'
              type='text'
              placeholder='Doe'
            />

            <TextInput
              label='Email Address'
              name='email'
              id='email'
              type='email'
              placeholder='michalrosa@mail.com'
            />

            <TextInput
              label='Date'
              name='date'
              id='date'
              type='datetime-local'
            />

            <button
              type='submit'
              className='bg-slate-600 rounded-lg px-10 py-2 text-sky-100'
            >
              Add
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default AddEventForm;
