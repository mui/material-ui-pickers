function createIconMap() {
  try {
    return {
      event: require('@material-ui/icons/Event').default,
      date_range: require('@material-ui/icons/DateRange').default,
      access_time: require('@material-ui/icons/AccessTime').default,
      keyboard_arrow_left: require('@material-ui/icons/KeyboardArrowLeft').default,
      keyboard_arrow_right: require('@material-ui/icons/KeyboardArrowRight').default,
    };
  } catch (e) {
    return null;
  }
}

export default createIconMap();
