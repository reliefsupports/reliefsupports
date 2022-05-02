import { Formik } from 'formik';

import PageLayout from 'layouts/PageLayout';

import TextInput from 'components/TextInput';
import TextArea from 'components/TextArea';
import Select from 'components/Select';
import Button from 'components/Button';

import { Type, Category, Priority } from 'types';

import { toOptions } from 'utils';

const initialValues: any = {
  type: 'Request',
  category: '',
  summary: '',
  body: '',
  priority: '',
};

export default function CreateEntry() {
  return (
    <PageLayout>
      <h1>Create Entry</h1>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: any = {};
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Select
              name="type"
              label="Type"
              options={toOptions(Object.values(Type))}
            />

            <Select
              name="category"
              label="Category"
              options={toOptions(Object.values(Category))}
            />

            <TextInput
              name="summary"
              label="Summary"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.summary}
              error={errors.summary}
              touched={touched.summary}
            />

            <TextArea
              name="body"
              label="Text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.body}
              error={errors.body}
              touched={touched.body}
            />

            <Select
              name="priority"
              label="Priority"
              options={toOptions(Object.values(Priority))}
            />

            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>
          </form>
        )}
      </Formik>
    </PageLayout>
  );
}
