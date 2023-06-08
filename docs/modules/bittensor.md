---
sidebar_position: 2
---

# Bittensor

Bittensor is a decentralized intellegence marketplace that focuses on a competitive landscape of miners competing for validator voting. In working with the community, we have derived a way to use commune to run miners across many machines. The module path is bittensor, located in commune/bittensor.

```python
import commune as c
cbt = c.module('bittensor')
```


 ## `transfer`

- **Parameters:**
    - `dest`: str
    - `amount`: Union[float, bittensor.utils.balance.Balance]
    - `wait_for_inclusion`: bool
    - `wait_for_finalization`: bool
    - `subtensor`: bittensor.Subtensor
    - `prompt`: bool
    - `gas_fee`: bool

- **Description:**
    Transfer funds to the specified destination address.

    - `dest`: The destination address to transfer the funds to.
    - `amount`: The amount of funds to transfer. It can be a float or a `bittensor.utils.balance.Balance` object.
    - `wait_for_inclusion`: Set to `True` to wait for the transaction to be included in a block.
    - `wait_for_finalization`: Set to `True` to wait for the transaction to be finalized.
    - `subtensor`: The `bittensor.Subtensor` object used for the transfer.
    - `prompt`: Set to `True` to prompt for confirmation before executing the transfer.
    - `gas_fee`: Set to `True` to deduct the transaction fee from the transferred amount as a gas fee.

    This function transfers funds to the specified destination address using the provided amount. It provides options to wait for inclusion and finalization of the transaction, prompt for confirmation, and deduct the transaction fee as a gas fee from the transferred amount.



## `fleet`

- **Parameters:**
    - `name`: str = default_coldkey
    - `hotkeys`: Optional[List[str]] = None
    - `remote`: bool = True
    - `netuid`: int = default_netuid
    - `network`: str = default_network
    - `model_name`: str = default_model_name
    - `refresh`: bool = True
    - `burned_register`: bool = False
    - `ensure_registration`: bool = False
    - `device`: str = 'cpu'
    - `n`: Optional[int] = None
    - `unreged`: bool = False
    - `ensure_gpus`: bool = False
    - `max_fee`: float = 1.1

- **Description:**
    Deploy a fleet of Bittensor miners.

    - `name`: The name of the cold key to use. (default: `default_coldkey`)
    - `hotkeys`: Optional. A list of hot key names to use. If not provided, hot keys associated with the cold key will be used.
    - `remote`: Set to `True` to run the miners remotely. (default: `True`)
    - `netuid`: The net UID to use for the miners. (default: `default_netuid`)
    - `network`: The network to connect the miners to. (default: `default_network`)
    - `model_name`: The name of the model to use. (default: `default_model_name`)
    - `refresh`: Set to `True` to refresh existing miners. (default: `True`)
    - `burned_register`: Set to `True` to register the first wallet with burned registration. (default: `False`)
    - `ensure_registration`: Set to `True` to ensure registration for the first wallet. (default: `False`)
    - `device`: The device to use for mining. (default: `'cpu'`)
    - `n`: Optional. The number of miners to deploy. If not provided, it will deploy all available wallets. (default: `None`)
    - `unreged`: Set to `True` to deploy miners only for unregistered wallets. (default: `False`)
    - `ensure_gpus`: Set to `True` to ensure GPU availability and memory for mining. (default: `False`)
    - `max_fee`: The maximum fee to use for registration. (default: `1.1`)

    This function deploys a fleet of Bittensor miners using the specified parameters. It creates and runs multiple miners based on the provided cold key and hot keys. The function provides options for remote or local deployment, network configuration, registration options, GPU availability, and more.

    Note: The detailed code implementation is omitted for brevity.


