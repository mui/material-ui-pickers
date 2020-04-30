import React from 'react';
import ClockIcon from '../_shared/icons/ClockIcon';
import { TimePickerToolbar } from './TimePickerToolbar';
import { ExportedClockViewProps } from '../views/Clock/ClockView';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { useUtils, MuiPickersAdapter } from '../_shared/hooks/useUtils';
import { validateTime, TimeValidationError } from '../_helpers/time-utils';
import { makePickerWithStateAndWrapper } from '../Picker/makePickerWithState';
import { timePickerDefaultProps, ParsableDate } from '../constants/prop-types';
import { ModalWrapper, InlineWrapper, StaticWrapper } from '../wrappers/Wrapper';
import { WithViewsProps, AllSharedPickerProps } from '../Picker/SharedPickerProps';
import { ValidationProps, makeValidationHook } from '../_shared/hooks/useValidation';

export interface TimePickerProps
  extends ExportedClockViewProps,
    ValidationProps<TimeValidationError, ParsableDate>,
    WithViewsProps<'hours' | 'minutes' | 'seconds'> {}

export function getTextFieldAriaText(value: ParsableDate, utils: MuiPickersAdapter) {
  return value && utils.isValid(utils.date(value))
    ? `Choose time, selected time is ${utils.format(utils.date(value), 'fullTime')}`
    : 'Choose time';
}

function useDefaultProps({
  ampm,
  mask,
  inputFormat,
  openTo = 'hours',
  views = ['hours', 'minutes'],
}: TimePickerProps & AllSharedPickerProps) {
  const utils = useUtils();
  const willUseAmPm = ampm ?? utils.is12HourCycleInCurrentLocale();

  return {
    ...timePickerDefaultProps,
    views,
    openTo,
    ampm: willUseAmPm,
    acceptRegex: willUseAmPm ? /[\dapAP]/gi : /\d/gi,
    mask: mask || willUseAmPm ? '__:__ _M' : '__:__',
    getOpenDialogAriaText: getTextFieldAriaText,
    openPickerIcon: <ClockIcon />,
    inputFormat: pick12hOr24hFormat(inputFormat, ampm, {
      localized: utils.formats.fullTime,
      '12h': utils.formats.fullTime12h,
      '24h': utils.formats.fullTime24h,
    }),
  };
}

const timePickerConfig = {
  useDefaultProps,
  useValidation: makeValidationHook<TimeValidationError, ParsableDate, TimePickerProps>(
    validateTime
  ),
  DefaultToolbarComponent: TimePickerToolbar,
};

export const TimePicker = makePickerWithStateAndWrapper<TimePickerProps>(
  ResponsiveWrapper,
  timePickerConfig
);

export const DesktopTimePicker = makePickerWithStateAndWrapper<TimePickerProps>(
  InlineWrapper,
  timePickerConfig
);

export const MobileTimePicker = makePickerWithStateAndWrapper<TimePickerProps>(
  ModalWrapper,
  timePickerConfig
);

export const StaticTimePicker = makePickerWithStateAndWrapper<TimePickerProps>(
  StaticWrapper,
  timePickerConfig
);
