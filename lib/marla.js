// The three marla sizes in sq ft. Kept in a file without units, so the
// browser can use them without loading any unit data.
export const MARLA_STANDARDS = {
  revenue: 272.25, // sq ft, official revenue / Punjab standard
  scheme: 250, // sq ft, used by many housing schemes
  urban: 225, // sq ft, common in cities like Lahore
};

// The marla size setting, in the same shape as a category "option".
export const MARLA_OPTION = {
  key: "marlaSize",
  label: "Marla size",
  choices: [MARLA_STANDARDS.revenue, MARLA_STANDARDS.scheme, MARLA_STANDARDS.urban],
  defaultValue: MARLA_STANDARDS.revenue,
  suffix: "sq ft",
};
