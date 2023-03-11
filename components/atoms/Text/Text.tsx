import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { LocaleString } from '../locales/en';

export interface TextProps {
  /**
   * Determines if the text should be lozalized.
   */
  locale?: boolean;
  /**
   *
   */
  values?: Record<string, any>;
  /**
   * The dom element type of the text
   */
  className?: any;
  /**
   * id for the localized string
   */
  id?: LocaleString;
  /**
   *
   */
  children?: any;
  /**
   * override default cursor style
   */
  cursor?: string;
  /**
   * For testing
   */
  'data-testid'?: string;
  ref?: any;
  onClick?: (e: any) => void;
}

export const Text = ({ className, id, children, values, ...rest }: TextProps) => {
  if (id) {
    return (
      <FormattedMessage id={id} values={{
        b: (chunks: ReactNode[]) => <b>&nbsp;{chunks}&nbsp;</b>,
      }}>
        {(text) => (
          <div className={className} {...rest}>
            {text}
          </div>
        )}
      </FormattedMessage>
    );
  }
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};