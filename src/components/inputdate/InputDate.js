import moment from 'moment';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Calendar } from '~/assets/image';
import DatePicker from 'react-datepicker';

const InputDate = ({ label, placeholder, modifier, checkBoxState, setFieldValue, setFieldTouched, ...props }) => {
  const [field, meta] = useField(props);
  const [startDate, setDate] = useState();
  const [datePickerIsOpen, setDatePicker] = useState(false);

  const handleChange = date => {
    setFieldTouched(field.name, true);
    setFieldValue(field.name, date, true);
    setDate(date);
    setDatePicker(!datePickerIsOpen);
  };

  const openDatePicker = () => {
    setDatePicker(!datePickerIsOpen);
  };

  return (
    <div className={modifier ? 'input--short' : 'input'}>
      <label className="input__label">{label}</label>
      <div className="input__date">
        <DatePicker
          name={field.name}
          selected={startDate}
          value={field.value ? moment(field.value).format('MMMM DD YYYY') : ''}
          placeholderText={placeholder}
          shouldCloseOnSelect={true}
          open={datePickerIsOpen}
          className="input__date-picker"
          dateFormat="MM/dd/yyyy"
          onChange={handleChange}
          disabled={checkBoxState}
          onClickOutside={e => {
            e.preventDefault();
            setDatePicker(false);
          }}
        ></DatePicker>
        <div className="input__date-calendar">
          {!checkBoxState ? (
            <img src={Calendar} alt="Calendar" onClick={openDatePicker} />
          ) : (
            <img src={Calendar} alt="Calendar" />
          )}
        </div>
      </div>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

InputDate.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  modifier: PropTypes.bool,
  checkBoxState: PropTypes.bool,
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func,
};

export default InputDate;
