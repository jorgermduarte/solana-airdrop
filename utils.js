const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
} = require('@solana/web3.js');

// display wallet balance
const getWalletBalance = async (publicKey) => {
    try {
        // devnet is a replica of the Solana blockchain that is used for development purposes
        // testnet is a replica of the Solana blockchain that is used for testing purposes
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const balance = await connection.getBalance(publicKey);
        console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
        return balance / LAMPORTS_PER_SOL;
    } catch (error) {
        console.error('Error:', error);
    }
    return -1;
}

// airdrop SOL to wallet
const airDropSol = async (amountSol, publicKey) => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const airDropSignature = await connection.requestAirdrop(publicKey, amountSol * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(airDropSignature);
        console.log(`Airdrop successful!`);
    } catch (error) {
        console.error('Error:', error);
    }
}

const createSolWallet = () => {
    const wallet = new Keypair()
    const publicKey = new PublicKey(wallet.publicKey);
    const secretKey = wallet.secretKey;

    console.log(`======== Solana Wallet ========`);
    console.log(`Public Key: ${publicKey}`);
    console.log(`Secret Key: ${secretKey}`);
    console.log(`===============================`);

    return {
        publicKey: publicKey,
        secretKey: secretKey
    }
}

module.exports = { getWalletBalance, airDropSol, createSolWallet };

