import { forwardRef, InputHTMLAttributes } from 'react';
import { Col, Form, FormControlProps, Row } from 'react-bootstrap';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { DotNestedKeys } from '../types/TGlobal';
import { ILanguage } from '../_metronic/i18n';

export const Input1 = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
  & FormControlProps
  & {
    // label: keyof ILanguage, // IJson.FORM create new type
    label: DotNestedKeys<ILanguage>, // IJson.FORM create new type
    errors?: { [name: string]: string },
    type?: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week"
    inline?: boolean
  }
>(({ label, errors, inline, className, ...props }, ref) => {
  const { t } = useTranslation()

  const isInvalid = errors && !!props.name && !!errors[props.name]

  return (
    <Form.Group as={Row} className={clsx(className, { 'mb-5': !isInvalid })}>
      <Form.Label
        column={inline} lg='3' md='2' sm='2'
        htmlFor={props.id || props.name}
        className={clsx('form-label text-nowrap', { 'required': errors })}
      >
        {t(label)}
      </Form.Label>
      <Col>
        <Form.Control
          ref={ref}
          id={props.id || props.name}
          className={clsx({ 'form-control-solid': !isInvalid })}
          isInvalid={isInvalid}
          {...props}
        />
        {errors && !!props.name ?
          <Form.Control.Feedback type='invalid'>{errors[props.name]}</Form.Control.Feedback>
          : null}
      </Col>
    </Form.Group>
  )
})