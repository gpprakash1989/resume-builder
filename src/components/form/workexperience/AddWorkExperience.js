import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import React, { useContext } from 'react';

import { Trash } from '~/assets/image';
import Button from '~/components/button/Button';
import { FormContext } from '../../FormContext';
import InputText from '~/components/inputtext/InputText';
import InputDate from '~/components/inputdate/InputDate';
import FormHeader from '~/components/formheader/FormHeader';
import CheckboxInput from '~/components/checkbox/CheckboxInput';
import { validateWorkExperience } from '~/validations/WorkExperience';
import * as workExperienceUtils from '../../../utilities/objects/WorkExperience';

const AddWorkExperience = ({ onClose, isEdit, values }) => {
  const { preview, data } = useContext(FormContext);

  let workIndex = -1;
  let initialValues = {};

  const handleSubmit = formValues => {
    if (isEdit) {
      handleSubmitOnEdit(formValues);
    } else {
      handleSubmitOnAdd(formValues);
    }

    data.set(prevState => ({ ...prevState, ...data }));
  };

  const handleSubmitOnAdd = formValues => {
    const workExperienceObj = workExperienceUtils.getWorkExperienceObject({ ...formValues });

    if (data.get.workExperience) {
      data.get['workExperience'].push(workExperienceObj);
    } else {
      data.get['workExperience'] = [];
      data.get['workExperience'].push(workExperienceObj);
    }
  };

  const handleSubmitOnEdit = formValues => {
    const isEqual = _.isEqual(formValues, initialValues);

    if (isEqual) {
      return;
    } else {
      const workObj = workExperienceUtils.getWorkExperienceObject({ ...formValues });

      data.get['workExperience'][workIndex] = workObj;
    }
  };

  const getInitialValues = () => {
    if (isEdit) {
      const works = data.get['workExperience'];

      workIndex = works.findIndex(work => {
        return work.name === values.name && work.position === values.position;
      });

      initialValues = {
        nameOrganization: works[workIndex].name,
        position: works[workIndex].position,
        startDate: works[workIndex].startDate,
        endDate: works[workIndex].endDate,
        currentWork: works[workIndex].currentlyWorking,
        roles: works[workIndex].responsibilities,
        achievements: works[workIndex].achievements,
        nameReferee: works[workIndex].refereeName,
        contactReferee: works[workIndex].refereeContact,
      };
    } else {
      initialValues = {
        nameOrganization: '',
        position: '',
        startDate: '',
        endDate: '',
        currentWork: false,
        roles: '',
        achievements: '',
        nameReferee: '',
        contactReferee: '',
      };
    }
    return initialValues;
  };

  return (
    <>
      <FormHeader title={!isEdit ? 'Add Work Experience' : 'Edit Work Experience'} />
      <Formik
        initialValues={getInitialValues()}
        onSubmit={values => {
          handleSubmit(values);
        }}
        validationSchema={validateWorkExperience}
      >
        {({ values }) => (
          <Form>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <div className="form__content">
              <InputText name="nameOrganization" label="Name of the organization" placeholder="eg. Apple" />
              <InputText name="position" label="Your Title or Position" placeholder="eg. Software Engineer" />
              <div className="form__date-field">
                <InputDate name="startDate" label="Start Date" placeholder="Select date" modifier={true} />
                <InputDate name="endDate" label="End Date" placeholder="Select date" modifier={true} />
              </div>
              <CheckboxInput name="currentWork" value="I currently work here" />
              <InputText
                name="roles"
                label="Describe Your Roles and Responsibilities"
                placeholder="eg. I am responsible for..."
                type="text-area"
              />
              <InputText
                name="achievements"
                label="List out your Achievements and Tasks (optional)"
                placeholder="eg. I was awarded with..."
                type="text-area"
              />
              <InputText
                name="nameReferee"
                label="Name of your Referee (optional)"
                placeholder="eg. someone we can reach out for more info if needed"
              />
              <InputText
                name="contactReferee"
                label="Contact number or phone (optional)"
                placeholder="eg. how we can contact your referee"
              />
              <div className="form-button">
                <div className="form-button__left">
                  <Button content="Add Experience" type="submit" />
                </div>
                <div className="form-button__right">
                  <img src={Trash} alt="Delete" />
                  <Button content="Cancel" isCancel={true} type="button" onclick={onClose} />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

AddWorkExperience.propTypes = {
  onClose: PropTypes.func,
  isEdit: PropTypes.bool,
  values: PropTypes.object || PropTypes.string,
};

export default AddWorkExperience;
