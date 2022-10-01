#!/usr/bin/env node
"use strict";
import yargs from "yargs";
import { ethers, Wallet } from "ethers";
import dotenv from "dotenv";
import chalk from 'chalk';
import inquirer from 'inquirer';
import { v4 as uuidv4 } from 'uuid';

// read in settings
dotenv.config();

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
// const provider = new ethers.providers.JsonRpcProvider();
// const signer = provider.getSigner();
// 
// Get the balance of an account (by address or ENS name, if supported by network)
// balance = await provider.getBalance("ethers.eth")
// // { BigNumber: "182826475815887608" }

// // Often you need to format the output to something more user-friendly,
// // such as in ether (instead of wei)
// ethers.utils.formatEther(balance)
// // '0.182826475815887608'

// // If a user enters a string in an input field, you may need
// // to convert it from ether (as a string) to wei (as a BigNumber)
// ethers.utils.parseEther("1.0")
// // { BigNumber: "1000000000000000000" }
// const  tx = signer.sendTransaction({
//     to: "ricmoo.firefly.eth",
//     value: ethers.utils.parseEther("1.0")
// });

const options = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
 .argv;

 

const greeting = `Hello, ${options.name}!`;
// console.log(ethers);
// console.log(web3.eth.accounts.create());
console.log(greeting);

uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
const walletMnemonic = Wallet.fromMnemonic(mnemonic);
console.log(walletMnemonic);
console.log( chalk.bold( "You have successfully authenticated your CLI application!" ) );
console.log( chalk.red( 'err' ) );

const main = async () => {
  try {
    async function welcome() {
      console.log(chalk.bgBlue('ELXOME'));
    
      await sleep();
    
      console.log(`
        ${chalk.bgBlue('HOW TO PLAY')} 
        I am a process on your computer.
        If you get any question wrong I will be ${chalk.bgRed('killed')}
        So get all the questions right...
      `);
    }
    
    await welcome();
    
    let playerName = '';
    
    async function askName() {
      const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
          return 'Player';
        },
      });
    
      playerName = answers.player_name;
    }
    
    await askName();
    
    console.log(`Hello, ${playerName}!`);
  } catch ( err ) {
    console.log( chalk.red( err ) );
  }
 };
 
 main();

 const log = console.log;

// Combine styled and normal strings
log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// Compose multiple styles using the chainable API
log(chalk.blue.bgRed.bold('Hello world!'));

// Pass in multiple arguments
log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// Nest styles
log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

// Nest styles of the same type even (color, underline, background)
log(chalk.green(
	'I am a green line ' +
	chalk.blue.underline.bold('with a blue substring') +
	' that becomes green again!'
));

// ES2015 template literal
log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);

// Use RGB colors in terminal emulators that support it.
log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
log(chalk.hex('#DEADED').bold('Bold gray!'));

const error = chalk.bold.red;
const warning = chalk.hex('#FFA500'); // Orange color

console.log(error('Error!'));
console.log(warning('Warning!'));

const name = 'Sindre';
console.log(chalk.green('Hello %s'), name);

// console.clear();

/*// Create a wallet instance from a mnemonic...
mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromMnemonic(mnemonic)

// ...or from a private key
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// The address as a Promise per the Signer API
await walletMnemonic.getAddress()
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// A Wallet address is also available synchronously
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// The internal cryptographic components
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// The wallet mnemonic
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: "m/44'/60'/0'/0/0",
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Note: A wallet created with a private key does not
//       have a mnemonic (the derivation prevents it)
walletPrivateKey.mnemonic
// null

// Signing a message
await walletMnemonic.signMessage("Hello World")
// '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c'

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0")
}

// Signing a transaction
await walletMnemonic.signTransaction(tx)
// '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc'

// The connect method returns a new instance of the
// Wallet connected to a provider
wallet = walletMnemonic.connect(provider)

// Querying the network
await wallet.getBalance();
// { BigNumber: "42" }
await wallet.getTransactionCount();
// 2

// Sending ether
await wallet.sendTransaction(tx)
// {
//   chainId: 1337,
//   confirmations: 0,
//   data: '0x',
//   from: '0x8577181F3D8A38a532Ef8F3D6Fd9a31baE73b1EA',
//   gasLimit: { BigNumber: "21000" },
//   gasPrice: { BigNumber: "1" },
//   hash: '0xdbf6b710ded42ae0fcfb0ec601235afce5acd0a01b785002cf0581fab4d53b52',
//   nonce: 5,
//   r: '0x7502ebb9c10e1664d9a344b636c1151a9ebc6b9dd1aa2bad9f739d15368a83f9',
//   s: '0x3a71b2b3a2a90527e2cf221606b89af5ac8195b8146f9d2776e4ca342b7e37b2',
//   to: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
//   type: null,
//   v: 2710,
//   value: { BigNumber: "1000000000000000000" },
//   wait: [Function]
// } */

/*// To sign a simple string, which are used for
// logging into a service, such as CryptoKitties,
// pass the string in.
signature = await signer.signMessage("Hello World");
// '0xfd4a2aef568db7193a3c0b3b3cc305fbb397d0264654a848f6c74edb7dba260e75af6aadf980519619475272b85854d25e8bed1ca8c5f72ffd9251244aca002e1b'

//
// A common case is also signing a hash, which is 32
// bytes. It is important to note, that to sign binary
// data it MUST be an Array (or TypedArray)
//

// This string is 66 characters long
message = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"

// This array representation is 32 bytes long
messageBytes = ethers.utils.arrayify(message);
// Uint8Array [ 221, 242, 82, 173, 27, 226, 200, 155, 105, 194, 176, 104, 252, 55, 141, 170, 149, 43, 167, 241, 99, 196, 161, 22, 40, 245, 90, 77, 245, 35, 179, 239 ]

// To sign a hash, you most often want to sign the bytes
signature = await signer.signMessage(messageBytes)
// '0xe7d007d76970a411c8ff54e9f3b8ed03b2c6f129f7bb5a236c5c04a365da419c7dbe4f37760df6424d1514dc53762eed2baae7ab347020265e9c2e5f3d3b521d1c' */