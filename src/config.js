"use strict";
/// file: config.ts
/// desc: configuration for the compilers to expose on Gazbolt.
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunnerPath = exports.GazBoltConfig = void 0;
exports.GazBoltConfig = {
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
};
exports.RunnerPath = "dragon-runner";
