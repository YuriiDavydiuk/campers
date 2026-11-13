import { useQuery } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useId } from 'react';

import closeIcon from '../../../../assets/close-outline.svg';
import locationIcon from '../../../../assets/location.svg';
import Button from '../../../../components/Button/Button';
import { getCamperFilters } from '../../../../services/campersService';
import type { FilterFormValues } from '../../../../types/filters';
import css from './Filters.module.css';

interface FiltersProps {
  onSubmit: (values: FilterFormValues) => void;
  onReset: () => void;
  values: FilterFormValues;
}

export default function Filters({ onSubmit, onReset, values }: FiltersProps) {
  const {
    data: availableFilters,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['camperFilters'],
    queryFn: getCamperFilters,
  });

  const fieldId = useId();

  const handleSubmit = (values: FilterFormValues) => {
    onSubmit(values);
  };

  if (isPending) {
    return <p role="status">Loading filters...</p>;
  }
  if (isError) {
    return <p role="alert">Failed to load filters.</p>;
  }

  return (
    <Formik initialValues={values} enableReinitialize onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.info}>
          <div className={css.location}>
            <label htmlFor={`${fieldId}-location`} className={css.label}>
              Location
            </label>

            <div className={css.inputWrapper}>
              <img src={locationIcon} alt="" className={css.locationIcon} />

              <Field
                id={`${fieldId}-location`}
                name="location"
                type="text"
                placeholder="Kyiv"
                className={css.locationInput}
              />
            </div>
          </div>

          <div className={css.filters}>
            <h2 className={css.title}>Filters</h2>

            <fieldset className={css.fieldset}>
              <legend className={css.legend}>Camper form</legend>

              {availableFilters?.forms.map(form => (
                <label key={form} className={css.radioLabel}>
                  <Field type="radio" name="form" value={form} className={css.radio} />
                  {form.replaceAll('_', ' ')}
                </label>
              ))}
            </fieldset>

            <fieldset className={css.fieldset}>
              <legend className={css.legend}>Engine</legend>

              {availableFilters?.engines.map(engine => (
                <label key={engine} className={css.radioLabel}>
                  <Field type="radio" name="engine" value={engine} className={css.radio} />
                  {engine}
                </label>
              ))}
            </fieldset>

            <fieldset className={css.fieldset}>
              <legend className={css.legend}>Transmission</legend>

              {availableFilters?.transmissions.map(transmission => (
                <label key={transmission} className={css.radioLabel}>
                  <Field
                    type="radio"
                    name="transmission"
                    value={transmission}
                    className={css.radio}
                  />
                  {transmission}
                </label>
              ))}
            </fieldset>
          </div>
        </div>
        <div className={css.actions}>
          <Button type="submit" fullWidth>
            Search
          </Button>

          <Button type="reset" variant="secondary" fullWidth onClick={onReset}>
            <img src={closeIcon} alt="" width={24} height={24} />
            Clear filters
          </Button>
        </div>
      </Form>
    </Formik>
  );
}
