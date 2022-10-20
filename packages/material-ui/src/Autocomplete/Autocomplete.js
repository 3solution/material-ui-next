import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '../styles';
import Popper from '../Popper';
import ListSubheader from '../ListSubheader';
import Paper from '../Paper';
import IconButton from '../IconButton';
import Chip from '../Chip';
import CloseIcon from '../internal/svg-icons/Close';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import useAutocomplete, { createFilterOptions } from '../useAutocomplete';

export { createFilterOptions };

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    '&$focused $clearIndicator': {
      visibility: 'visible',
    },
    /* Avoid double tap issue on iOS */
    '@media (pointer: fine)': {
      '&:hover $clearIndicator': {
        visibility: 'visible',
      },
    },
  },
  /* Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: {
    width: '100%',
  },
  /* Pseudo-class applied to the root element if focused. */
  focused: {},
  /* Styles applied to the tag elements, e.g. the chips. */
  tag: {
    margin: 3,
    maxWidth: 'calc(100% - 6px)',
  },
  /* Styles applied to the tag elements, e.g. the chips if `size="small"`. */
  tagSizeSmall: {
    margin: 2,
    maxWidth: 'calc(100% - 4px)',
  },
  /* Styles applied when the popup icon is rendered. */
  hasPopupIcon: {},
  /* Styles applied when the clear icon is rendered. */
  hasClearIcon: {},
  /* Styles applied to the Input element. */
  inputRoot: {
    flexWrap: 'wrap',
    '$hasPopupIcon &, $hasClearIcon &': {
      paddingRight: 26 + 4,
    },
    '$hasPopupIcon$hasClearIcon &': {
      paddingRight: 52 + 4,
    },
    '& $input': {
      width: 0,
      minWidth: 30,
    },
    '&[class*="MuiInput-root"]': {
      paddingBottom: 1,
      '& $input': {
        padding: 4,
      },
      '& $input:first-child': {
        padding: '6px 0',
      },
    },
    '&[class*="MuiInput-root"][class*="MuiInput-marginDense"]': {
      '& $input': {
        padding: '2px 4px 3px',
      },
      '& $input:first-child': {
        padding: '1px 0 4px',
      },
    },
    '&[class*="MuiOutlinedInput-root"]': {
      padding: 9,
      '$hasPopupIcon &, $hasClearIcon &': {
        paddingRight: 26 + 4 + 9,
      },
      '$hasPopupIcon$hasClearIcon &': {
        paddingRight: 52 + 4 + 9,
      },
      '& $input': {
        padding: '7.5px 4px',
      },
      '& $input:first-child': {
        paddingLeft: 6,
      },
      '& $endAdornment': {
        right: 9,
      },
    },
    '&[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]': {
      padding: 6,
      '& $input': {
        padding: '2.5px 4px',
      },
    },
    '&[class*="MuiFilledInput-root"]': {
      paddingTop: 19,
      paddingLeft: 8,
      '$hasPopupIcon &, $hasClearIcon &': {
        paddingRight: 26 + 4 + 9,
      },
      '$hasPopupIcon$hasClearIcon &': {
        paddingRight: 52 + 4 + 9,
      },
      '& $input': {
        padding: '7px 4px',
      },
      '& $endAdornment': {
        right: 9,
      },
    },
    '&[class*="MuiFilledInput-root"][class*="MuiFilledInput-marginDense"]': {
      paddingBottom: 1,
      '& $input': {
        padding: '2.5px 4px',
      },
    },
  },
  /* Styles applied to the input element. */
  input: {
    flexGrow: 1,
    textOverflow: 'ellipsis',
    opacity: 0,
  },
  /* Styles applied to the input element if tag focused. */
  inputFocused: {
    opacity: 1,
  },
  /* Styles applied to the endAdornment element. */
  endAdornment: {
    // We use a position absolute to support wrapping tags.
    position: 'absolute',
    right: 0,
    top: 'calc(50% - 14px)', // Center vertically
  },
  /* Styles applied to the clear indicator. */
  clearIndicator: {
    marginRight: -2,
    padding: 4,
    visibility: 'hidden',
  },
  /* Styles applied to the popup indicator. */
  popupIndicator: {
    padding: 2,
    marginRight: -2,
  },
  /* Styles applied to the popup indicator if the popup is open. */
  popupIndicatorOpen: {
    transform: 'rotate(180deg)',
  },
  /* Styles applied to the popper element. */
  popper: {
    zIndex: theme.zIndex.modal,
  },
  /* Styles applied to the popper element if `disablePortal={true}`. */
  popperDisablePortal: {
    position: 'absolute',
  },
  /* Styles applied to the `Paper` component. */
  paper: {
    ...theme.typography.body1,
    overflow: 'auto',
    margin: '4px 0',
  },
  /* Styles applied to the `listbox` component. */
  listbox: {
    listStyle: 'none',
    margin: 0,
    padding: '8px 0',
    maxHeight: '40vh',
    overflow: 'auto',
  },
  /* Styles applied to the loading wrapper. */
  loading: {
    color: theme.palette.text.secondary,
    padding: '14px 16px',
  },
  /* Styles applied to the no option wrapper. */
  noOptions: {
    color: theme.palette.text.secondary,
    padding: '14px 16px',
  },
  /* Styles applied to the option elements. */
  option: {
    minHeight: 48,
    display: 'flex',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    paddingTop: 6,
    boxSizing: 'border-box',
    outline: '0',
    WebkitTapHighlightColor: 'transparent',
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.up('sm')]: {
      minHeight: 'auto',
    },
    '&[aria-selected="true"]': {
      backgroundColor: theme.palette.action.selected,
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.action.selected,
    },
    '&[aria-disabled="true"]': {
      opacity: theme.palette.action.disabledOpacity,
      pointerEvents: 'none',
    },
  },
  /* Styles applied to the group's label elements. */
  groupLabel: {
    backgroundColor: theme.palette.background.paper,
    top: -8,
  },
  /* Styles applied to the group's ul elements. */
  groupUl: {
    padding: 0,
    '& $option': {
      paddingLeft: 24,
    },
  },
});

function DisablePortal(props) {
  // eslint-disable-next-line react/prop-types
  const { anchorEl, open, ...other } = props;
  return <div {...other} />;
}

const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    ChipProps,
    classes,
    className,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    clearText = 'Clear',
    closeIcon = <CloseIcon fontSize="small" />,
    closeText = 'Close',
    debug = false,
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled = false,
    disabledItemsFocusable = false,
    disableListWrap = false,
    disablePortal = false,
    filterOptions,
    filterSelectedOptions = false,
    forcePopupIcon = 'auto',
    freeSolo = false,
    fullWidth = false,
    getLimitTagsText = (more) => `+${more}`,
    getOptionDisabled,
    getOptionLabel = (option) => option.label ?? option,
    getOptionSelected,
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    limitTags = -1,
    ListboxComponent = 'ul',
    ListboxProps,
    loading = false,
    loadingText = 'Loading…',
    multiple = false,
    noOptionsText = 'No options',
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open,
    openOnFocus = false,
    openText = 'Open',
    options,
    PaperComponent = Paper,
    PopperComponent: PopperComponentProp = Popper,
    popupIcon = <ArrowDropDownIcon />,
    renderGroup: renderGroupProp,
    renderInput,
    renderOption: renderOptionProp,
    renderTags,
    selectOnFocus = !props.freeSolo,
    size = 'medium',
    value: valueProp,
    ...other
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const PopperComponent = disablePortal ? DisablePortal : PopperComponentProp;

  const {
    getRootProps,
    getInputProps,
    getInputLabelProps,
    getPopupIndicatorProps,
    getClearProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    value,
    dirty,
    id,
    popupOpen,
    focused,
    focusedTag,
    anchorEl,
    setAnchorEl,
    inputValue,
    groupedOptions,
  } = useAutocomplete({ ...props, componentName: 'Autocomplete' });

  let startAdornment;

  if (multiple && value.length > 0) {
    const getCustomizedTagProps = (params) => ({
      className: clsx(classes.tag, {
        [classes.tagSizeSmall]: size === 'small',
      }),
      disabled,
      ...getTagProps(params),
    });

    if (renderTags) {
      startAdornment = renderTags(value, getCustomizedTagProps);
    } else {
      startAdornment = value.map((option, index) => (
        <Chip
          label={getOptionLabel(option)}
          size={size}
          {...getCustomizedTagProps({ index })}
          {...ChipProps}
        />
      ));
    }
  }

  if (limitTags > -1 && Array.isArray(startAdornment)) {
    const more = startAdornment.length - limitTags;
    if (!focused && more > 0) {
      startAdornment = startAdornment.splice(0, limitTags);
      startAdornment.push(
        <span className={classes.tag} key={startAdornment.length}>
          {getLimitTagsText(more)}
        </span>,
      );
    }
  }

  const defaultRenderGroup = (params) => (
    <li key={params.key}>
      <ListSubheader className={classes.groupLabel} component="div">
        {params.group}
      </ListSubheader>
      <ul className={classes.groupUl}>{params.children}</ul>
    </li>
  );

  const renderGroup = renderGroupProp || defaultRenderGroup;
  const defaultRenderOption = (props2, option) => <li {...props2}>{getOptionLabel(option)}</li>;
  const renderOption = renderOptionProp || defaultRenderOption;

  const renderListOption = (option, index) => {
    const optionProps = getOptionProps({ option, index });

    return renderOption({ ...optionProps, className: classes.option }, option, {
      selected: optionProps['aria-selected'],
      inputValue,
    });
  };

  const hasClearIcon = !disableClearable && !disabled && dirty;
  const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;

  return (
    <React.Fragment>
      <div
        ref={ref}
        className={clsx(
          classes.root,
          {
            [classes.focused]: focused,
            [classes.fullWidth]: fullWidth,
            [classes.hasClearIcon]: hasClearIcon,
            [classes.hasPopupIcon]: hasPopupIcon,
          },
          className,
        )}
        {...getRootProps(other)}
      >
        {renderInput({
          id,
          disabled,
          fullWidth: true,
          size: size === 'small' ? 'small' : undefined,
          InputLabelProps: getInputLabelProps(),
          InputProps: {
            ref: setAnchorEl,
            className: classes.inputRoot,
            startAdornment,
            endAdornment: (
              <div className={classes.endAdornment}>
                {hasClearIcon ? (
                  <IconButton
                    {...getClearProps()}
                    aria-label={clearText}
                    title={clearText}
                    className={classes.clearIndicator}
                  >
                    {closeIcon}
                  </IconButton>
                ) : null}

                {hasPopupIcon ? (
                  <IconButton
                    {...getPopupIndicatorProps()}
                    disabled={disabled}
                    aria-label={popupOpen ? closeText : openText}
                    title={popupOpen ? closeText : openText}
                    className={clsx(classes.popupIndicator, {
                      [classes.popupIndicatorOpen]: popupOpen,
                    })}
                  >
                    {popupIcon}
                  </IconButton>
                ) : null}
              </div>
            ),
          },
          inputProps: {
            className: clsx(classes.input, {
              [classes.inputFocused]: focusedTag === -1,
            }),
            disabled,
            ...getInputProps(),
          },
        })}
      </div>
      {popupOpen && anchorEl ? (
        <PopperComponent
          className={clsx(classes.popper, {
            [classes.popperDisablePortal]: disablePortal,
          })}
          style={{
            width: anchorEl ? anchorEl.clientWidth : null,
          }}
          role="presentation"
          anchorEl={anchorEl}
          open
        >
          <PaperComponent className={classes.paper}>
            {loading && groupedOptions.length === 0 ? (
              <div className={classes.loading}>{loadingText}</div>
            ) : null}
            {groupedOptions.length === 0 && !freeSolo && !loading ? (
              <div className={classes.noOptions}>{noOptionsText}</div>
            ) : null}
            {groupedOptions.length > 0 ? (
              <ListboxComponent
                className={classes.listbox}
                {...getListboxProps()}
                {...ListboxProps}
              >
                {groupedOptions.map((option, index) => {
                  if (groupBy) {
                    return renderGroup({
                      key: option.key,
                      group: option.group,
                      children: option.options.map((option2, index2) =>
                        renderListOption(option2, option.index + index2),
                      ),
                    });
                  }
                  return renderListOption(option, index);
                })}
              </ListboxComponent>
            ) : null}
          </PaperComponent>
        </PopperComponent>
      ) : null}
    </React.Fragment>
  );
});

Autocomplete.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the portion of the selected suggestion that has not been typed by the user,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   * @default false
   */
  autoComplete: PropTypes.bool,
  /**
   * If `true`, the first option is automatically highlighted.
   * @default false
   */
  autoHighlight: PropTypes.bool,
  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   * @default false
   */
  autoSelect: PropTypes.bool,
  /**
   * Control if the input should be blurred when an option is selected:
   *
   * - `false` the input is not blurred.
   * - `true` the input is always blurred.
   * - `touch` the input is blurred after a touch event.
   * - `mouse` the input is blurred after a mouse event.
   * @default false
   */
  blurOnSelect: PropTypes.oneOfType([PropTypes.oneOf(['mouse', 'touch']), PropTypes.bool]),
  /**
   * Props applied to the [`Chip`](/api/chip/) element.
   */
  ChipProps: PropTypes.object,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the input's text is cleared on blur if no value is selected.
   *
   * Set to `true` if you want to help the user enter a new value.
   * Set to `false` if you want to help the user resume his search.
   * @default !props.freeSolo
   */
  clearOnBlur: PropTypes.bool,
  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   * @default false
   */
  clearOnEscape: PropTypes.bool,
  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Clear'
   */
  clearText: PropTypes.string,
  /**
   * The icon to display in place of the default close icon.
   * @default <CloseIcon fontSize="small" />
   */
  closeIcon: PropTypes.node,
  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Close'
   */
  closeText: PropTypes.string,
  /**
   * If `true`, the popup will ignore the blur event if the input is filled.
   * You can inspect the popup markup with your browser tools.
   * Consider this option when you need to customize the component.
   * @default false
   */
  debug: PropTypes.bool,
  /**
   * The default input value. Use when the component is not controlled.
   * @default props.multiple ? [] : null
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the input can't be cleared.
   * @default false
   */
  disableClearable: PropTypes.bool,
  /**
   * If `true`, the popup won't close when a value is selected.
   * @default false
   */
  disableCloseOnSelect: PropTypes.bool,
  /**
   * If `true`, the input is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: PropTypes.bool,
  /**
   * If `true`, the list box in the popup will not wrap focus.
   * @default false
   */
  disableListWrap: PropTypes.bool,
  /**
   * The `Popper` content will be inside the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * A filter function that determines the options that are eligible.
   *
   * @param {T[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {T[]}
   */
  filterOptions: PropTypes.func,
  /**
   * If `true`, hide the selected options from the list box.
   * @default false
   */
  filterSelectedOptions: PropTypes.bool,
  /**
   * Force the visibility display of the popup icon.
   * @default 'auto'
   */
  forcePopupIcon: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.bool]),
  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   * @default false
   */
  freeSolo: PropTypes.bool,
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The label to display when the tags are truncated (`limitTags`).
   *
   * @param {number} more The number of truncated tags.
   * @returns {ReactNode}
   * @default (more) => `+${more}`
   */
  getLimitTagsText: PropTypes.func,
  /**
   * Used to determine the disabled state for a given option.
   *
   * @param {T} option The option to test.
   * @returns {boolean}
   */
  getOptionDisabled: PropTypes.func,
  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   *
   * @param {T} option
   * @returns {string}
   * @default (option) => option.label ?? option
   */
  getOptionLabel: PropTypes.func,
  /**
   * Used to determine if an option is selected, considering the current value.
   * Uses strict equality by default.
   *
   * @param {T} option The option to test.
   * @param {T} value The value to test against.
   * @returns {boolean}
   */
  getOptionSelected: PropTypes.func,
  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {T} options The options to group.
   * @returns {string}
   */
  groupBy: PropTypes.func,
  /**
   * If `true`, the component handles the "Home" and "End" keys when the popup is open.
   * It should move focus to the first option and last option, respectively.
   * @default !props.freeSolo
   */
  handleHomeEndKeys: PropTypes.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * If `true`, the highlight can move to the input.
   * @default false
   */
  includeInputInList: PropTypes.bool,
  /**
   * The input value.
   */
  inputValue: PropTypes.string,
  /**
   * The maximum number of tags that will be visible when not focused.
   * Set `-1` to disable the limit.
   * @default -1
   */
  limitTags: PropTypes.number,
  /**
   * The component used to render the listbox.
   * @default 'ul'
   */
  ListboxComponent: PropTypes.elementType,
  /**
   * Props applied to the Listbox element.
   */
  ListboxProps: PropTypes.object,
  /**
   * If `true`, the component is in a loading state.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Loading…'
   */
  loadingText: PropTypes.node,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: PropTypes.bool,
  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'No options'
   */
  noOptionsText: PropTypes.node,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {T|T[]} value The new value of the component.
   * @param {string} reason One of "create-option", "select-option", "remove-option", "blur" or "clear".
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggleInput"`, `"escape"`, `"select-option"`, `"remove-option"`, `"blur"`.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the highlight option changes.
   *
   * @param {object} event The event source of the callback.
   * @param {T} option The highlighted option.
   * @param {string} reason Can be: `"keyboard"`, `"auto"`, `"mouse"`.
   */
  onHighlightChange: PropTypes.func,
  /**
   * Callback fired when the input value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`.
   */
  onInputChange: PropTypes.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * Control the popup` open state.
   */
  open: PropTypes.bool,
  /**
   * If `true`, the popup will open on input focus.
   * @default false
   */
  openOnFocus: PropTypes.bool,
  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Open'
   */
  openText: PropTypes.string,
  /**
   * Array of options.
   */
  options: PropTypes.array.isRequired,
  /**
   * The component used to render the body of the popup.
   * @default Paper
   */
  PaperComponent: PropTypes.elementType,
  /**
   * The component used to position the popup.
   * @default Popper
   */
  PopperComponent: PropTypes.elementType,
  /**
   * The icon to display in place of the default popup icon.
   * @default <ArrowDropDownIcon />
   */
  popupIcon: PropTypes.node,
  /**
   * Render the group.
   *
   * @param {any} option The group to render.
   * @returns {ReactNode}
   */
  renderGroup: PropTypes.func,
  /**
   * Render the input.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: PropTypes.func.isRequired,
  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {object} props The props to apply on the li element.
   * @param {T} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption: PropTypes.func,
  /**
   * Render the selected value.
   *
   * @param {T[]} value The `value` provided to the component.
   * @param {function} getTagProps A tag props getter.
   * @returns {ReactNode}
   */
  renderTags: PropTypes.func,
  /**
   * If `true`, the input's text is selected on focus.
   * It helps the user clear the selected value.
   * @default !props.freeSolo
   */
  selectOnFocus: PropTypes.bool,
  /**
   * The size of the autocomplete.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['medium', 'small']),
  /**
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `getOptionSelected` prop.
   */
  value: PropTypes.any,
};

export default withStyles(styles, { name: 'MuiAutocomplete' })(Autocomplete);
