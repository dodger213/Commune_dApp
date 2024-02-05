import BasicImage from '../../public/img/frontpage/blockchain-1.png'
import BasicImage1 from '../../public/img/frontpage/blockchain-2.png'
import Image1 from '../../public/img/frontpage/portfolio-b1.png'
import Image2 from '../../public/img/frontpage/portfolio-b2.png'

export const modulesList = [
  {
    image_url: BasicImage,
    address: "158.247.70.45:8888",
    functions: ["generate"],
    attributes: [],
    name: "model.openai",
    path: "model.openai",
    chash: "f789f265b6aa88ea597c4f7ea608fc508a56ca7bd8cb766cbf03c250dff970d2",
    hash: "e39d8385c6717b89cf3e35600f4643683afea6ad60efca3fc7ccbc2079e58ad2",
    signature: "d047efac1b7320c9428c51f564a35a029ca687b6cc0b9e7301d4115cf6383755547e084d69aa7024cdbeaef24596be6c7d3c8324008bdfe0ea6183e6c403ec8e",
    ss58_address: "5HarzAYD37Sp3vJs385CLvhDPN52Cb1Q352yxZnDZchznPaS",
    dislike: 0,
    like: 55,
    heart: 45,
    schema: {
      generate: {
        input: {
          prompt: "str",
          model: "str",
          presence_penalty: "float",
          frequency_penalty: "float",
          temperature: "float",
          max_tokens: "int",
          top_p: "float",
          choice_idx: "int",
          api_key: "str",
          retry: "bool",
          role: "str",
          history: "list",
        },
        default: {
          prompt: "sup?",
          model: "gpt-3.5-turbo",
          presence_penalty: 0.0,
          frequency_penalty: 0.0,
          temperature: 0.9,
          max_tokens: 100,
          top_p: 1,
          choice_idx: 0,
          api_key: null,
          retry: true,
          role: "user",
          history: null,
          kwargs: null,
        },
        output: {},
        type: "self",
      },
    },
  },
  {
    image_url: BasicImage1,
    address: "158.247.70.45:8888",
    functions: ["put", "get_hash", "get"],
    attributes: [],
    name: "storage",
    path: "storage",
    description: "not available",
    chash: "45235f1066ab82648abf3da9adccbedebf628d7eff9de1da44a1372556468a3c",
    hash: "da6a2f603ab3365b779e98a67dc84ce0afd3d69f6b336e698f68a50cdd920c4e",
    signature: "8c154638f98b3037c720e56281bac5dd0f2141f5ad189588befc3030d6b4b431b164f97365145c2b3c6dde6706b1552115b7759cd06c0a2aecb14cfbf4c6a78a",
    ss58_address: "5H6P4f9VoFLSsuPnq6KtEbG9VTEP2oTddXEHaJ4BDz9GXUgi",
    pub_key: '0x06739d386D215deda42Fc57b595c0e3FA3715687',
    schema: {
      put: {
        input: { v: "dict", encrypt: "bool", replicas: "int", k: "str" },
        default: { k: null, v: null, encrypt: false, replicas: 1 },
        output: {},
        type: "self",
      },
      get_hash: {
        input: { k: "str", seed: "int", seed_sep: "str" },
        default: { k: null, seed: null, seed_sep: "<SEED>" },
        output: "str",
        type: "self",
      },
      get: {
        input: { deserialize: "bool", k: "NA" },
        default: { k: null, deserialize: true },
        output: "any",
        type: "self",
      },
    },
  },
  {
    address: "158.247.70.45:8888",
    image_url: Image1,

    // attributes: ["asd", "11112222222222222222222", "222", "33333333333333333"],
    name: "storage2",
    path: "storage2",
    description: "not available",
  },
  {
    name: "Module 2",
    image_url: Image2,

    description: "Another of our modulesassssssssssssssssssssssdadasdaddafav fsdgaergehr rffffffffffffffffffffffffff 234324563t25 gfegdf",
    // attributes: ["0asd", "11112222222222222222222", "222", "33333333333333333", "4", "55", "666666666666666666666", "777777", "888", "9&$TYTYRR^TY"],
    address: "158.247.70.45:8888",
  },
  {
    name: "Module 3",
    description: "modulesassssssssssssssssssssssdadasdaddafav ",
    address: "158.247.70.45:8888",
  },
  {
    name: "Module 4",
    description: "Another of our  fsdgaergehr",
    address: "158.247.70.45:8888",
  },
  {
    name: "Module 5",
    description: "rffffffffffffffffffffffffff ",
    address: "158.247.70.45:8888",
  },
  {
    name: "Module 6",
    description: "234324563t25",
    address: "158.247.70.45:8888",
  },
  {
    name: "Module 7",
    description: "gfegdf",
    address: "158.247.70.45:8888",
  },
  {
    name: "Module 8",
    description: "99999999999",
    address: "158.247.70.45:8888",
  },
];

export default class ModulesService {
  static getModulesList = async (searchQuery = "") => {
    if (!searchQuery) {
      return modulesList;
    }

    return modulesList.filter((module) => module.name.includes(searchQuery) || (module.description && module.description.includes(searchQuery)));
  };

  static getModuleDetailsByName = async (name: string) => {
    const moduleDetails = modulesList.find((module) => module.name === name);

    if (!moduleDetails) {
      return null;
    }

    return moduleDetails;
  };
}
