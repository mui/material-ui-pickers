import { useTheme } from '@material-ui/core';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../../typings/date';

const checkUtils = (utils: IUtils<MaterialUiPickersDate> | null | undefined) => {
  if (!utils) {
    throw new Error('Can not find dateIOAdapter in material-ui theme.');
  }
};

export function useUtils(): IUtils<MaterialUiPickersDate> {
  const theme = useTheme();
  checkUtils(theme.dateIOAdapter);

  return theme.dateIOAdapter!;
}
