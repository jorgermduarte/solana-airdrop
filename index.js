const { getWalletBalance, createSolWallet} = require('./utils');


const main = async () => {
    const newWallet = createSolWallet();
    const walletBalance = await getWalletBalance(newWallet.publicKey);
    console.log(walletBalance);
}

main();