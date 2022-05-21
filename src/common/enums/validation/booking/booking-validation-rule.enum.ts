const BookingValidationRule = {
  GUESTS_MIN_COUNT: 1,
  DATE_GREATER_THEN: 'now',
} as const;

export { BookingValidationRule };
