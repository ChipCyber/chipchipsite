import { Connection, clusterApiUrl, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
// import { getOrCreateAssociatedTokenAccount, createTransferInstruction, getMint } from "@solana/spl-token";
import { createTransferInstruction, TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
import { getWalletProvider } from "./walletProvider";

// const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
const connection = new Connection('https://solitary-autumn-paper.solana-mainnet.quiknode.pro/5ee4b125b700077bd646a0afb5e8dd0a09b752d2', 'confirmed');

/**
 * @returns balance
 */
export async function solana_getBalance(publicKey) {
    try {
        // const accountInfo = await getAccount(connection, new PublicKey(publicKey));
        // console.log("Account Information:", accountInfo);
        const balanceInfo = await connection.getBalance(new PublicKey(publicKey));
        const balanceInSol = balanceInfo / 1e9;
        return balanceInSol;
    } catch (error) {
        console.log('sol >> ', error);
        return Promise.reject(error.message);
    }
}

export async function solana_sendSOL(fromAddress, toAddress, amount) {
    try {
        const provider = getWalletProvider();
        const lamports = amount * 1e9;
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: new PublicKey(fromAddress),
                toPubkey: new PublicKey(toAddress),
                lamports,
            })
        );
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = new PublicKey(fromAddress);
        const signedTransaction = await provider.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        const confirmationStrategy = {
            commitment: 'confirmed',  // 确认级别
            preflightCommitment: 'processed', // 预处理确认级别
            maxRetries: 5,  // 最大重试次数
            minContextSlot: 100,  // 最小插槽号
            signature,
        };
        await connection.confirmTransaction(confirmationStrategy, 'confirmed');
        return signature;
    } catch (error) {
        console.error("sol >> ", error);
        return Promise.reject(error.message);
    }
}
export async function solana_getSPLTokenBalance(address, mintAddress) {
    try {
        // const tokenAccount = await getAssociatedTokenAddress(
        //     mintAddress,
        //     publicKey
        // );
        // const accountInfo = await getAccount(connection, tokenAccount);
        // return accountInfo.amount.toString();
        const publicKey = new PublicKey(address);
        const mintPublicKey = new PublicKey(mintAddress);
        const token = new Token(connection, mintPublicKey, TOKEN_PROGRAM_ID, publicKey);
        const account = await token.getOrCreateAssociatedAccountInfo(publicKey);
        const balance = await token.getAccountBalance(account.address);
        console.log(`Token balance: ${balance.amount}`);
    } catch (error) {
        console.log('sol >> ', error);
        return Promise.reject(error.message);
    }
}
export async function solana_sendSPLToken(fromAddress, toAddress, amount, mintAddress) {
    try {
        const provider = getWalletProvider();
        const mintPublicKey = new PublicKey(mintAddress); // 代币的 Mint 地址
        const fromPublicKey = new PublicKey(fromAddress); // 发送方地址
        const toPublicKey = new PublicKey(toAddress); // 接收方地址
        // const mintInfo = await getMint(connection, mintPublicKey);
        const token = new Token(connection, mintPublicKey, TOKEN_PROGRAM_ID, null);
        const mintInfo = await token.getMintInfo();
        const decimals = mintInfo.decimals;
        const lamports = amount * 10**decimals;
        // const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        //     connection,
        //     fromPublicKey, // 费用支付方
        //     mintPublicKey,
        //     toPublicKey
        // );
        // const fromTokenAccount =await getOrCreateAssociatedTokenAccount(
        //     connection,
        //     fromPublicKey,
        //     mintPublicKey,
        //     fromPublicKey
        // );
        // const transaction = new Transaction().add(
        //     createTransferInstruction(
        //         fromTokenAccount,
        //         toTokenAccount.address, // 接收账户
        //         fromPublicKey, // 代币持有者
        //         lamports // 转账数量，需根据代币精度调整
        //     )
        // );
        const fromTokenAccount = new Token(connection, mintPublicKey, TOKEN_PROGRAM_ID, fromPublicKey);
        const toTokenAccount = new Token(connection, mintPublicKey, TOKEN_PROGRAM_ID, toPublicKey);
        const transaction = new Transaction().add(
            Token.createTransferInstruction(
                TOKEN_PROGRAM_ID,
                fromTokenAccount.address,    // 发送者代币账户
                toTokenAccount.address,  // 接收者代币账户
                fromPublicKey,          // 发送者
                [],                       // 签名者
                lamports                    // 转账数量
            )
        );
        // 获取最近区块的哈希
        const { blockhash } = await connection.getRecentBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = fromPublicKey;
        // 请求用户签名交易
        const signedTransaction = await provider.signTransaction(transaction);
        // 将签名的交易发送到 Solana 网络
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        const confirmationStrategy = {
            commitment: 'confirmed',  // 确认级别
            preflightCommitment: 'processed', // 预处理确认级别
            maxRetries: 5,  // 最大重试次数
            minContextSlot: 100,  // 最小插槽号
            signature,
        };
        // 等待交易确认
        await connection.confirmTransaction(confirmationStrategy);
        console.log("交易成功，交易签名:", signature);
        return signature;
    } catch (error) {
        console.log('sol >> ', error);
        return Promise.reject(error.message);
    }
}

async function solana_callContract(provider, publicKey, contract_address) {
    try {
        // 创建与 Solana 集群的连接
        const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
        // const targetPublicKey = new PublicKey(targetAddress);
        // const amountBuffer = Buffer.alloc(8); // u64 类型
        // amountBuffer.writeBigUInt64LE(BigInt(amount)); // 写入数量
        // const instructionData = Buffer.concat([
        //     Buffer.from([1]), // 1 表示调用 `transfer` 方法
        //     targetPublicKey.toBuffer(), // 目标地址
        //     amountBuffer, // 数量
        // ]);
        const instructionData = Buffer.alloc(0);
        const instruction = {
            programId: new PublicKey(contract_address),
            keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
            data: instructionData, // 替换为合约调用需要的数据
        };
        const transaction = new Transaction().add(instruction);
        // const signature = await provider.signAndSendTransaction(transaction);
        // await connection.confirmTransaction(signature);
        // console.log('Transaction confirmed:', signature);
        const { signature } = await provider.signAndSendTransaction(transaction);
        console.log('Transaction signature:', signature);
        const status = await connection.getSignatureStatus(signature);
        console.log('status :>> ', status);
    } catch (error) {
        console.error('Error calling contract method:', error);
        return Promise.reject(error.message);
    }
}
