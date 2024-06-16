
//configureable with !config
export let config = {
  setStartTime: 15,
  minRequiredPlayers: 2,
};

export const helpList = {
  "!help": {
    use: "provides a list of commands and their syntax",
    syntax: "!help <command: string>",
  },
  "!function": {
    use: "can run certain functions located in functionParser, use !function list for a list of functions",
    syntax: "!function <function: string>",
  },
  "!config": {
    use: "configure certain variables, use !config list for a list of variables",
    syntax: "!config <variable: string>",
  },
};