export interface CompilerOption {
  value: string;
  label: string;
  configPath: string;
}

export const GazBoltConfig: { compilers: CompilerOption[] } = {
  compilers: [
    {
      value: "generator",
      label: "Generator",
      configPath: "/configs/GeneratorConfig.json"
    },
    {
      value: "scalc",
      label: "SCalc",
      configPath: "/configs/SCalcConfig.json"
    },
    {
      value: "vcalc",
      label: "VCalc",
      configPath: "/configs/VCalcConfig.json"
    }
  ]
}

export const RunnerPath = "dragon-runner";

