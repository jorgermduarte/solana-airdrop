const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
} = require('@solana/web3.js');


const wallet = new Keypair()
const publicKey = new PublicKey(wallet.publicKey);
const secretKey = wallet.secretKey;

console.log(`======== Solana Wallet ========`);
console.log(`Public Key: ${publicKey}`);
console.log(`Secret Key: ${secretKey}`);
console.log(`===============================`);

// display wallet balance
const getWalletBalance = async () => {
    try {
        // devnet is a replica of the Solana blockchain that is used for development purposes
        // testnet is a replica of the Solana blockchain that is used for testing purposes
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const balance = await connection.getBalance(publicKey);
        console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// airdrop SOL to wallet
const airDropSol = async (amountSol) => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const airDropSignature = await connection.requestAirdrop(publicKey, amountSol * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(airDropSignature);
        console.log(`Airdrop successful!`);
    } catch (error) {
        console.error('Error:', error);
    }
}

const main = async () => {
    await getWalletBalance();
    await airDropSol(1);
    await getWalletBalance();
}

main();