const modulesList = [
  {
    name: "bittensor",
    description: "The first module",
  },
  {
    name: "data_hf",
    description: "Another of our modulesassssssssssssssssssssssdadasdaddafav fsdgaergehr rffffffffffffffffffffffffff 234324563t25 gfegdf",
  },
  {
    name: "data_text_realfake",
    description: "modulesassssssssssssssssssssssdadasdaddafav ",
  },
  {
    name: "data_text_truthqa",
    description: "Another of our  fsdgaergehr",
  },
  {
    name: "model_hf",
    description: "rffffffffffffffffffffffffff ",
  },
  {
    name: "model_openai",
    description: "234324563t25",
  },
  {
    name: "vali",
    description: "gfegdf",
  },
  {
    name: "vali_text_realfake",
    description: "99999999999",
  },
];

export default class ModulesService {
  static getModulesList = async (searchQuery = "") => {
    if (!searchQuery) {
      return modulesList;
    }

    return modulesList.filter((module) => module.name.includes(searchQuery) || module.description.includes(searchQuery));
  };
}
