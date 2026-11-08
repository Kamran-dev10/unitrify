// Builders for unit objects, so every unit has the same shape:
//   { id, name, symbol, kind, factor, offset, aliases, country }
//
// kind "linear":  base = value * factor
// kind "affine":  base = value * factor + offset     (temperature)
// kind "inverse": base = factor / value              (e.g. mpg vs L/100 km)
//
// country: "global" or a country code such as "pk".

export function linear(id, name, symbol, factor, { aliases = [], country = "global" } = {}) {
  return { id, name, symbol, kind: "linear", factor, offset: 0, aliases, country };
}

export function affine(id, name, symbol, factor, offset, { aliases = [], country = "global" } = {}) {
  return { id, name, symbol, kind: "affine", factor, offset, aliases, country };
}

export function inverse(id, name, symbol, factor, { aliases = [], country = "global" } = {}) {
  return { id, name, symbol, kind: "inverse", factor, offset: 0, aliases, country };
}
