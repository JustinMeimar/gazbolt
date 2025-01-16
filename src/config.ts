/// file: config.ts
/// desc: configuration for the compilers to expose on Gazbolt.
///

export interface CompilerOption {
  value: string;
  label: string;
  configPath: string;
  default_programs: string[];
}

export const GazBoltConfig: { compilers: CompilerOption[] } = {
  compilers: [
    {
      value: "generator",
      label: "Generator",
      configPath: "/configs/GeneratorConfig.json",
      default_programs: [
	"./programs/default.gen",
	"./programs/range.gen",
	"./programs/generator.gen",
      ]
    },
    {
      value: "scalc",
      label: "SCalc",
      configPath: "/configs/SCalcConfig.json",
      default_programs: [
	"./programs/default.scalc"
      ],
    },
    {
      value: "vcalc",
      label: "VCalc",
      configPath: "/configs/VCalcConfig.json",
      default_programs: [
	"./programs/default.vcalc"
      ],
    },
    {
      value: "gazprea",
      label: "Gazprea",
      configPath: "/configs/GazpreaConfig.json",
      default_programs: [
	"./programs/default.gaz",
	"./programs/print.gaz",
      ],
    }
  ]
}

export const RunnerPath = "dragon-runner";

