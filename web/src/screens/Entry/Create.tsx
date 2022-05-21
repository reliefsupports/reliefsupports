import { useState, useContext } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { DefaultEditor } from 'react-simple-wysiwyg';

import AuthContext from 'contexts/Auth';
import PageLayout from 'layouts/PageLayout';

import TextInput from 'components/TextInput';
import Select from 'components/Select';
import Button from 'components/Button';

import { Type, Category, Priority } from 'types';

import { toOptions } from 'utils';
import { create as apiCreateEntry } from 'api/entries';

import { Conatiner } from './styled';

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const initialValues: any = {
  type: 'request',
  category: '',
  summary: '',
  body: '',
  priority: '',
  city: '',
};

export default function CreateEntry() {
  const naviagate = useNavigate();

  // @todo: Show a message to sign in if not logged in already.
  const { user }: any = useContext(AuthContext);

  const [bodyHtml, setBodyHtml] = useState('');

  return (
    <PageLayout>
      <Conatiner>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: any = {};
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            const response = await apiCreateEntry({
              ...values,
              body: bodyHtml,
              ...{
                author: {
                  name: 'Snoop dogg',
                  phone: '+94711111111',
                  avatarUrl: null,
                  orgnization: null,
                },
                location: {
                  city: values.city,
                },
                externalSource: null,
              },
            });
            if (response) {
              setSubmitting(false);
              resetForm();
              naviagate('/');
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
              <h1>
                Create Entry:{' '}
                {values.type && <span>{toTitleCase(values.type)}</span>}
              </h1>

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

              <TextInput
                name="summary"
                label="Summary"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.summary}
                error={errors.summary}
                touched={touched.summary}
              />

              <p>Text</p>
              <DefaultEditor
                value={bodyHtml}
                onChange={(evt: any) => setBodyHtml(evt.target.value)}
              />

              <TextInput
                name="city"
                label="City"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                error={errors.city}
                touched={touched.city}
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
      </Conatiner>
    </PageLayout>
  );
}
