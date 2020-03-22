import * as React from 'react';
import clsx from 'clsx';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { IconButton, IconButtonProps, makeStyles, useTheme } from '@material-ui/core';

export interface ExportedArrowSwitcherProps {
  /** Left arrow icon */
  leftArrowIcon?: React.ReactNode;
  /** Right arrow icon */
  rightArrowIcon?: React.ReactNode;
  /** Left arrow icon aria-label text */
  leftArrowButtonText?: string;
  /** Right arrow icon aria-label text */
  rightArrowButtonText?: string;
  /**
   * Props to pass to left arrow button
   * @type {Partial<IconButtonProps>}
   */
  leftArrowButtonProps?: Partial<IconButtonProps>;
  /**
   * Props to pass to right arrow button
   * @type {Partial<IconButtonProps>}
   */
  rightArrowButtonProps?: Partial<IconButtonProps>;
}

interface ArrowSwitcherProps extends ExportedArrowSwitcherProps, React.HTMLProps<HTMLDivElement> {
  isLeftHidden?: boolean;
  isRightHidden?: boolean;
  isLeftDisabled: boolean;
  isRightDisabled: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
}

const useStyles = makeStyles(theme => ({
  iconButton: {
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
  },
  previousMonthButton: {
    marginRight: 24,
  },
  hidden: {
    visibility: 'hidden',
  },
}));

export const ArrowSwitcher: React.FC<ArrowSwitcherProps> = ({
  className,
  leftArrowButtonProps,
  leftArrowButtonText,
  rightArrowButtonProps,
  rightArrowButtonText,
  isLeftHidden,
  isRightHidden,
  isLeftDisabled,
  isRightDisabled,
  onLeftClick,
  onRightClick,
  leftArrowIcon = <ArrowLeftIcon />,
  rightArrowIcon = <ArrowRightIcon />,
  children,
  ...other
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  return (
    <div className={className} {...other}>
      <IconButton
        data-mui-test="previous-arrow-button"
        size="small"
        aria-label={leftArrowButtonText}
        {...leftArrowButtonProps}
        disabled={isLeftDisabled}
        onClick={onLeftClick}
        className={clsx(classes.iconButton, leftArrowButtonProps?.className, {
          [classes.hidden]: Boolean(isLeftHidden),
          [classes.previousMonthButton]: !Boolean(className),
        })}
      >
        {isRtl ? rightArrowIcon : leftArrowIcon}
      </IconButton>

      {children}

      <IconButton
        data-mui-test="next-arrow-button"
        size="small"
        aria-label={rightArrowButtonText}
        {...rightArrowButtonProps}
        disabled={isRightDisabled}
        onClick={onRightClick}
        className={clsx(classes.iconButton, rightArrowButtonProps?.className, {
          [classes.hidden]: Boolean(isRightHidden),
        })}
      >
        {isRtl ? leftArrowIcon : rightArrowIcon}
      </IconButton>
    </div>
  );
};
