// Registry of all unit categories. Add a new category by creating a file
// in this folder and adding it to UNIT_CATEGORIES below.
//
// Each category: { id, name, group, baseUnit, intro, units, ... }
//   defaultFrom / defaultTo  units preselected in the converters
//   allowNegative            true if negative values are valid (temperature)
//   hasMarlaStandard         true if units depend on the marla size (land)
//   buildUnits(options)      optional: units for given options (marlaSize)

import land from "./land.js";
import length from "./length.js";
import weight from "./weight.js";
import temperature from "./temperature.js";
import area from "./area.js";
import volume from "./volume.js";
import volumeDry from "./volume-dry.js";
import pressure from "./pressure.js";
import energy from "./energy.js";
import power from "./power.js";
import force from "./force.js";
import time from "./time.js";
import speed from "./speed.js";
import angle from "./angle.js";
import fuelConsumption from "./fuel-consumption.js";
import dataStorage from "./data-storage.js";
import angularVelocity from "./angular-velocity.js";
import acceleration from "./acceleration.js";
import angularAcceleration from "./angular-acceleration.js";
import density from "./density.js";
import specificVolume from "./specific-volume.js";
import momentOfInertia from "./moment-of-inertia.js";
import torque from "./torque.js";
import fuelEfficiencyMass from "./fuel-efficiency-mass.js";
import fuelEfficiencyVolume from "./fuel-efficiency-volume.js";
import temperatureInterval from "./temperature-interval.js";
import thermalExpansion from "./thermal-expansion.js";
import thermalResistance from "./thermal-resistance.js";
import thermalConductivity from "./thermal-conductivity.js";
import specificHeatCapacity from "./specific-heat-capacity.js";
import heatDensity from "./heat-density.js";
import heatFluxDensity from "./heat-flux-density.js";
import heatTransferCoefficient from "./heat-transfer-coefficient.js";

export const GROUPS = [
  "common",
  "engineering",
  "heat",
  "electricity",
  "magnetism",
  "fluids",
  "light",
  "radiology",
  "other",
  "land",
];

// Order here is the order used across the site (footer, homepage).
export const UNIT_CATEGORIES = [
  land,
  length,
  weight,
  temperature,
  area,
  volume,
  volumeDry,
  pressure,
  energy,
  power,
  force,
  time,
  speed,
  angle,
  fuelConsumption,
  dataStorage,
  angularVelocity,
  acceleration,
  angularAcceleration,
  density,
  specificVolume,
  momentOfInertia,
  torque,
  fuelEfficiencyMass,
  fuelEfficiencyVolume,
  temperatureInterval,
  thermalExpansion,
  thermalResistance,
  thermalConductivity,
  specificHeatCapacity,
  heatDensity,
  heatFluxDensity,
  heatTransferCoefficient,
];

export function getUnitCategory(id) {
  return UNIT_CATEGORIES.find((c) => c.id === id) ?? null;
}

// Units of a category. options.marlaSize is used by the land category.
export function getCategoryUnits(id, options = {}) {
  const c = getUnitCategory(id);
  if (!c) return [];
  return c.buildUnits ? c.buildUnits(options) : c.units;
}
