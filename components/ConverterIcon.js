import {
  Activity, Antenna, Atom, AudioLines, Banknote, Battery, BatteryCharging, Beaker, Binary, Bolt, Box, Cable,
  Calculator, Car, CaseSensitive, CircuitBoard, Clock, Cog, Compass, Cylinder, Droplet, Droplets, Dumbbell,
  Expand, Eye, Factory, Flame, FlaskConical, Fuel, Gauge, Grid2x2, Grid3x3, HardDrive, House, Image, LandPlot,
  Layers, Lightbulb, Magnet, Microscope, Monitor, Mountain, Navigation, Orbit, Package, Pipette, Plug, Radiation,
  Radio, RefreshCw, Rocket, RotateCw, Ruler, Shield, Sigma, Signal, Spline, Square, SquareDashed, Sun, TestTube,
  Thermometer, ThermometerSun, TreePine, Type, Volume2, Waves, Waypoints, Weight, Wifi, Wind, Wrench, Zap,
} from "lucide-react";

// One line icon per category, tool and group. Server component only, so the
// icons are plain SVG in the HTML and add no JavaScript to the page.
const ICONS = {
  // groups
  "group:common": Ruler, "group:land": LandPlot, "group:engineering": Cog, "group:heat": Flame,
  "group:electricity": Zap, "group:magnetism": Magnet, "group:fluids": Droplets, "group:light": Lightbulb,
  "group:radiology": Radiation, "group:other": Calculator,
  // tools and special pages
  "currency-converter": Banknote, "case-converter": CaseSensitive, "number-converter": Binary,
  "plot-size-calculator": Grid3x3,
  // everyday
  zameen: LandPlot, length: Ruler, weight: Weight, temperature: Thermometer, area: SquareDashed, volume: Beaker,
  "volume-dry": Package, pressure: Gauge, energy: Zap, power: Bolt, force: Dumbbell, time: Clock, speed: Car,
  angle: Compass, "fuel-consumption": Fuel, "data-storage": HardDrive,
  // engineering
  "angular-velocity": RotateCw, acceleration: Rocket, "angular-acceleration": RefreshCw, density: Layers,
  "specific-volume": Box, "moment-of-inertia": Orbit, torque: Wrench,
  // heat
  "fuel-efficiency-mass": Flame, "fuel-efficiency-volume": Factory, "temperature-interval": ThermometerSun,
  "thermal-expansion": Expand, "thermal-resistance": Shield, "thermal-conductivity": Waves,
  "specific-heat-capacity": FlaskConical, "heat-density": Sun, "heat-flux-density": Wind,
  "heat-transfer-coefficient": House,
  // electricity
  charge: BatteryCharging, "linear-charge-density": Cable, "surface-charge-density": Square,
  "volume-charge-density": Cylinder, current: Activity, "linear-current-density": Waypoints,
  "surface-current-density": Grid2x2, "electric-field-strength": Radio, "electric-potential": Plug,
  "electric-resistance": CircuitBoard, "electric-resistivity": Spline, "electric-conductance": Signal,
  "electric-conductivity": Droplet, capacitance: Battery, inductance: Antenna,
  // magnetism
  "magnetomotive-force": Magnet, "magnetic-field-strength": Navigation, "magnetic-flux": Atom,
  "magnetic-flux-density": Magnet,
  // fluids
  flow: Waves, "flow-mass": Factory, "flow-molar": TestTube, "mass-flux-density": Wind,
  "concentration-molar": FlaskConical, "concentration-solution": Pipette, "viscosity-dynamic": Droplets,
  "viscosity-kinematic": Droplet, "surface-tension": Microscope, permeability: Mountain,
  // light
  luminance: Eye, "luminous-intensity": Lightbulb, illuminance: Sun, "image-resolution": Image,
  "frequency-wavelength": AudioLines,
  // radiology
  "radiation-dose": Radiation, "radiation-activity": Atom, "radiation-exposure": Radiation,
  "radiation-absorbed-dose": Radiation,
  // other
  prefixes: Sigma, "data-transfer": Wifi, "sound-level": Volume2, typography: Type, "volume-lumber": TreePine,
  monitor: Monitor,
};

// id: a category or tool id ("length", "case-converter"), or "group:<id>".
export default function ConverterIcon({ id, className = "h-5 w-5" }) {
  const Icon = ICONS[id] ?? Calculator;
  return <Icon aria-hidden="true" focusable="false" strokeWidth={1.75} className={`shrink-0 text-accent ${className}`} />;
}

export function hasIcon(id) {
  return Boolean(ICONS[id]);
}
