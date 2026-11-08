// Registry of all unit categories. Add a new category by creating a file
// in this folder and adding it to UNIT_CATEGORIES below.
//
// Each category: { id, name, group, baseUnit, intro, units, ... }
//   defaultFrom / defaultTo  units preselected in the converters
//   allowNegative            true if negative values are valid (temperature)
//   hasMarlaStandard         true if units depend on the marla size (land)
//   buildUnits(options)      optional: units for given options (marlaSize, baseFontPx)
//   option                   optional: one setting shown as buttons, e.g. base font size
//   note                     optional: one line shown on its pages (e.g. radiology)

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
import charge from "./charge.js";
import linearChargeDensity from "./linear-charge-density.js";
import surfaceChargeDensity from "./surface-charge-density.js";
import volumeChargeDensity from "./volume-charge-density.js";
import current from "./current.js";
import linearCurrentDensity from "./linear-current-density.js";
import surfaceCurrentDensity from "./surface-current-density.js";
import electricFieldStrength from "./electric-field-strength.js";
import electricPotential from "./electric-potential.js";
import electricResistance from "./electric-resistance.js";
import electricResistivity from "./electric-resistivity.js";
import electricConductance from "./electric-conductance.js";
import electricConductivity from "./electric-conductivity.js";
import capacitance from "./capacitance.js";
import inductance from "./inductance.js";
import magnetomotiveForce from "./magnetomotive-force.js";
import magneticFieldStrength from "./magnetic-field-strength.js";
import magneticFlux from "./magnetic-flux.js";
import magneticFluxDensity from "./magnetic-flux-density.js";
import flow from "./flow.js";
import flowMass from "./flow-mass.js";
import flowMolar from "./flow-molar.js";
import massFluxDensity from "./mass-flux-density.js";
import concentrationMolar from "./concentration-molar.js";
import concentrationSolution from "./concentration-solution.js";
import viscosityDynamic from "./viscosity-dynamic.js";
import viscosityKinematic from "./viscosity-kinematic.js";
import surfaceTension from "./surface-tension.js";
import permeability from "./permeability.js";
import luminance from "./luminance.js";
import luminousIntensity from "./luminous-intensity.js";
import illuminance from "./illuminance.js";
import imageResolution from "./image-resolution.js";
import frequencyWavelength from "./frequency-wavelength.js";
import radiationDose from "./radiation-dose.js";
import radiationActivity from "./radiation-activity.js";
import radiationExposure from "./radiation-exposure.js";
import radiationAbsorbedDose from "./radiation-absorbed-dose.js";
import prefixes from "./prefixes.js";
import dataTransfer from "./data-transfer.js";
import soundLevel from "./sound-level.js";
import typography from "./typography.js";
import volumeLumber from "./volume-lumber.js";

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
  charge,
  linearChargeDensity,
  surfaceChargeDensity,
  volumeChargeDensity,
  current,
  linearCurrentDensity,
  surfaceCurrentDensity,
  electricFieldStrength,
  electricPotential,
  electricResistance,
  electricResistivity,
  electricConductance,
  electricConductivity,
  capacitance,
  inductance,
  magnetomotiveForce,
  magneticFieldStrength,
  magneticFlux,
  magneticFluxDensity,
  flow,
  flowMass,
  flowMolar,
  massFluxDensity,
  concentrationMolar,
  concentrationSolution,
  viscosityDynamic,
  viscosityKinematic,
  surfaceTension,
  permeability,
  luminance,
  luminousIntensity,
  illuminance,
  imageResolution,
  frequencyWavelength,
  radiationDose,
  radiationActivity,
  radiationExposure,
  radiationAbsorbedDose,
  prefixes,
  dataTransfer,
  soundLevel,
  typography,
  volumeLumber,
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
