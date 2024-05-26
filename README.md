# Backend WEB3 Test task

Task: Build a web application that allows users to interact with an ERC20 contract on
the Ethereum blockchain using web3.js and Nest.js.

## Description

The test task was completed using NestJS and ethers.js. Two routes were created to retrieve the balance of a specified token and to transfer the specified token. To authenticate, you need to add a private key as a Bearer token. RPC of the desired blockchain is specified in **.env**, by default the public RPC of **bsc testnet** is used.

Routs

- GET /balance/<*contract address*>/<*user address*> - Returns the balance of the specified token for the specified address. Before the request, the contract address is checked for compatibility with the ERC20 interface.
- POST / - Rout performs a transfer of the specified token between the specified addresses. Before the request, compatibility of the contract with the ERC20 interface and sufficient token balance are checked. If the specified sender differs from the authorized wallet, an allowance check is performed for the authorized wallet. Request returns the transaction hash of the transfer. Parameters are passed in the request body, the amount is specified in user friendly units, can be a floating-point number:

```text
{
  "contractAddress": string,
  "userAddress": string,
  "recipientAddress": string,
  "amount": number
}
```

## Start

- Copy the `.env.example` file into `.env` and add yours provider.
- Install the dependencies ```npm install```
- Run app ```npm start```

Swagger has been added to nest, so you can use http://localhost:3000/api to work with the app. You can use a specially added test token [USD Mock](https://testnet.bscscan.com/address/0x697edd7c1a16b439151157237332af7d8caf2e9c) in bsc testnet where it is possible to change any number of tokens. You can also use the following addresses with private keys:

- 0x79Ee822Bd648D280bf778CeB2DE59df0e6e0704D - 0be1f909285aaa1aefa77509627954bbd66011f33fceadd84c9dc1cfd6f64650
- 0x2Bd251A29940b9Ba60dd72d2878EDf60dd6f77Ed - 38790ee7d95a68ba9a9b4d0507f78ed606febf52f7d51a6fd552bce530a26374

## Tests

Tests added only for the Auth guard.
Run tests ```npm test```

