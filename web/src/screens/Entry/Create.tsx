import { Formik } from 'formik';

import TextArea from 'components/TextArea';
import Select from 'components/Select';
import Button from 'components/Button';

import { districtsOptions } from 'constants/district';
import { categoryOptions } from 'constants/categories';
import { priorityOptions } from 'constants/priorities';

const initialValues: any = {
  type: 'Requests',
  desc: '',
  district: '',
  category: '',
  priority: '',
};

export default function CreateEntry() {
  return (
    <div>
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
              options={[
                { value: 'Requests', label: 'Requests' },
                { value: 'Help Offers', label: 'Help Offers' },
              ]}
            />

            <TextArea
              name="desc"
              label="Description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.desc}
              error={errors.desc}
              touched={touched.desc}
            />

            <Select
              name="district"
              label="District"
              options={districtsOptions}
            />

            <Select
              name="category"
              label="Category"
              options={categoryOptions}
            />

            <Select
              name="priority"
              label="Priority"
              options={priorityOptions}
            />

            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
