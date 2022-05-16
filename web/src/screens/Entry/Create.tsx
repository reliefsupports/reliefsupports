import { Formik } from 'formik';

import PageLayout from 'layouts/PageLayout';

import TextInput from 'components/TextInput';
import TextArea from 'components/TextArea';
import Select from 'components/Select';
import Button from 'components/Button';

import { Type, Category, Priority } from 'types';

import { toOptions } from 'utils';
import { create as apiCreateEntry } from 'api/entries';

const initialValues: any = {
  type: '',
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
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await apiCreateEntry({
            ...values,
            ...{
              author: {
                name: 'Snoop dogg',
                phone: '+94711111111',
                avatarUrl: null,
                orgnization: null,
              },
            },
          });
          if (response) {
            setSubmitting(false);
            console.log(response);
          }
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
          setFieldValue,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Select
              name="type"
              label="Type"
              options={toOptions(Object.values(Type))}
              onChange={(value: any) => setFieldValue('type', value)}
              onBlur={handleBlur}
              value={values.type}
              error={errors.type}
              touched={touched.type}
            />

            <Select
              name="category"
              label="Category"
              options={toOptions(Object.values(Category))}
              onChange={(value: any) => setFieldValue('category', value)}
              onBlur={handleBlur}
              value={values.category}
              error={errors.category}
              touched={touched.category}
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
              label="Body"
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
              onChange={(value: any) => setFieldValue('priority', value)}
              onBlur={handleBlur}
              value={values.priority}
              error={errors.priority}
              touched={touched.priority}
            />
            <div style={{ marginTop: 20 }}>
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </PageLayout>
  );
}
