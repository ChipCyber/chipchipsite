import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
// import { getOrCreateAssociatedTokenAccount, createTransferInstruction } from "@solana/spl-token";
import { getWalletProvider } from "./walletProvider";

const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

/**
 * @returns balance
 */
export async function solana_getBalance(publicKey) {
    try {
        const balance = await connection.getBalance(new PublicKey(publicKey));
        const balanceInSol = balance / 1e9;
        return balanceInSol;
    } catch (error) {
        console.log('sol >> ', error);
        return Promise.reject(error.message);
    }
}

async function sendSOL(fromAddress, toAddress, amount) {
    try {
        const provider = getWalletProvider();
        // 转账金额（以 lamports 为单位，1 SOL = 1e9 lamports）
        const lamports = amount * 1e9;
        // 创建转账交易
        const transaction = new Transaction().add(
            SystemProgram.transfer({
            fromPubkey: new PublicKey(fromAddress),
            toPubkey: new PublicKey(toAddress),
            lamports,
            })
        );
        // 获取最近区块的哈希值
        const { blockhash } = await connection.getRecentBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = new PublicKey(fromAddress);
        const signedTransaction = await provider.request({
            method: "signTransaction",
            params: {
            message: transaction.serializeMessage().toString("base64"),
            },
        });
        const signature = await connection.sendRawTransaction(
            Buffer.from(signedTransaction, "base64")
        );
        await connection.confirmTransaction(signature);
        console.log("交易成功，交易签名:", signature);
        return signature;
    } catch (error) {
        console.error("交易失败:", error);
        return Promise.reject(error.message);
    }
}
// async function sendSPLToken(fromAddress, toAddress, amount, mintAddress) {
//     try {
//         const provider = getWalletProvider();
//         const mintPublicKey = new PublicKey(mintAddress); // 代币的 Mint 地址
//         const fromPublicKey = new PublicKey(fromAddress); // 发送方地址
//         const toPublicKey = new PublicKey(toAddress); // 接收方地址
//         // 创建或获取接收方的关联代币账户（ATA）
//         const toTokenAccount = await getOrCreateAssociatedTokenAccount(
//             connection,
//             fromPublicKey, // 费用支付方
//             mintPublicKey,
//             toPublicKey
//         );
//         // 构建 SPL 代币转账指令
//         const transaction = new Transaction().add(
//             createTransferInstruction(
//                 await getOrCreateAssociatedTokenAccount(
//                     connection,
//                     fromPublicKey,
//                     mintPublicKey,
//                     fromPublicKey
//                 ), // 来源账户
//                 toTokenAccount.address, // 接收账户
//                 fromPublicKey, // 代币持有者
//                 amount // 转账数量，需根据代币精度调整
//             )
//         );
//         // 获取最近区块的哈希
//         const { blockhash } = await connection.getRecentBlockhash();
//         transaction.recentBlockhash = blockhash;
//         transaction.feePayer = fromPublicKey;
//         // 请求用户签名交易
//         const signedTransaction = await provider.request({
//             method: "signTransaction",
//             params: {
//             message: transaction.serializeMessage().toString("base64"),
//             },
//         });
//         // 将签名的交易发送到 Solana 网络
//         const signature = await connection.sendRawTransaction(
//             Buffer.from(signedTransaction, "base64")
//         );
//         // 等待交易确认
//         await connection.confirmTransaction(signature);
//         console.log("交易成功，交易签名:", signature);
//         return signature;
//     } catch (error) {
//         console.error("SPL 代币转账失败:", error);
//         return Promise.reject(error.message);
//     }
// }

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
