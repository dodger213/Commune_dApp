const modulesList = [
  {
    name: "bittensor",
    description: "Enables building a Cabal by mining, configuring, and interacting with the Bittensor network.",
  },
  {
    name: "data_hf",
    description: " Performs tests on truthful_qa using the huggingface library",
  },
  {
    name: "data_text_realfake",
    description: "Generates real or fake text samples from a folder of text for model training.",
  },
  {
    name: "data_text_truthqa",
    description: "Provides real or fake text samples from a text folder, useful for real or fake text detection",
  },
  {
    name: "model_hf",
    description: "Wraps the huggingface transformers library, allowing deployment of any model in huggingface.",
  },
  {
    name: "model_openai",
    description: "A wrapper module over the OPENAI API.",
  },
  {
    name: "vali",
    description: "Learn to deploy a validator, perform tasks related to staking, registration, and validation.",
  },
  {
    name: "vali_text_realfake",
    description: "Draws real or fake text samples from a folder for training models in text authenticity detection.",
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
