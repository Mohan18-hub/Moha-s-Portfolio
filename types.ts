/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Key, ShieldCheck, Database, Layers, Send, RefreshCw, Cpu, Code2, PlusCircle, CheckCircle2 } from 'lucide-react';

interface Transaction {
  from: string;
  to: string;
  amount: number;
  type: 'DEPLOY' | 'MINT' | 'TRANSFER';
  timestamp: string;
}

interface Block {
  index: number;
  timestamp: string;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
  merkleRoot: string;
}

export default function BlockchainExplorer() {
  const [contractName, setContractName] = useState('MohanToken');
  const [symbol, setSymbol] = useState('MTK');
  const [initialSupply, setInitialSupply] = useState(1000000);
  const [isDeployed, setIsDeployed] = useState(false);
  
  const [blocks, setBlocks] = useState<Block[]>([
    {
      index: 0,
      timestamp: new Date(Date.now() - 3600000 * 2).toLocaleTimeString(),
      transactions: [],
      previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
      hash: '0000e3f8b021d960714c330f898a1c9fffa8b5020958ffad8e8a60f9e1606df8',
      nonce: 4821,
      merkleRoot: '0000000000000000000000000000000000000000000000000000000000000000'
    }
  ]);
  
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([]);
  const [recipient, setRecipient] = useState('0xTitanCompany894F...');
  const [amount, setAmount] = useState(500);
  const [isMining, setIsMining] = useState(false);
  const [viewCode, setViewCode] = useState(false);
  const [balances, setBalances] = useState<{ [address: string]: number }>({
    '0xMohanKumarB...': 1000000,
    '0xTitanCompany894F...': 0,
    '0xSamkhyaAI902C...': 0
  });

  const [logs, setLogs] = useState<string[]>([
    'EVM: Ethereum Virtual Machine environment initialized.',
    'Solidity compiler loaded successfully. Version: v0.8.24+commit.e11b40a3'
  ]);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 19)]);
  };

  const generateHash = (index: number, prevHash: string, txs: Transaction[], nonce: number) => {
    // Basic deterministic hash simulation
    const content = `${index}${prevHash}${JSON.stringify(txs)}${nonce}`;
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      hash = (hash << 5) - hash + content.charCodeAt(i);
      hash |= 0;
    }
    return '0000' + Math.abs(hash).toString(16).padStart(60, 'f').slice(0, 60);
  };

  const handleDeploy = (e: FormEvent) => {
    e.preventDefault();
    setIsDeployed(true);
    addLog(`Deploying smart contract ${contractName} (${symbol})...`);
    addLog(`EVM gas estimate: 1,245,392 gas`);
    
    setTimeout(() => {
      const deployTx: Transaction = {
        from: '0x0000000000000000000000000000000000000000',
        to: '0xMohanKumarB...',
        amount: initialSupply,
        type: 'DEPLOY',
        timestamp: new Date().toLocaleTimeString()
      };
      
      const lastBlock = blocks[blocks.length - 1];
      const newBlockIndex = blocks.length;
      const nonce = Math.floor(Math.random() * 10000);
      const hash = generateHash(newBlockIndex, lastBlock.hash, [deployTx], nonce);
      
      const newBlock: Block = {
        index: newBlockIndex,
        timestamp: new Date().toLocaleTimeString(),
        transactions: [deployTx],
        previousHash: lastBlock.hash,
        hash: hash,
        nonce: nonce,
        merkleRoot: '0x' + Math.floor(Math.random() * 10000000).toString(16).padStart(16, '0')
      };

      setBlocks(prev => [...prev, newBlock]);
      setBalances({
        '0xMohanKumarB...': initialSupply,
        '0xTitanCompany894F...': 0,
        '0xSamkhyaAI902C...': 0
      });
      addLog(`Contract deployed at 0x${Math.floor(Math.random() * 100000000).toString(16)}61a8f9`);
      addLog(`MINTED ${initialSupply} ${symbol} to deployer (0xMohanKumarB...)`);
    }, 800);
  };

  const handleTransfer = (e: FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    if (balances['0xMohanKumarB...'] < amount) {
      addLog(`❌ EVM Revert: Insufficient balance. Request: ${amount}, Available: ${balances['0xMohanKumarB...']}`);
      return;
    }

    const tx: Transaction = {
      from: '0xMohanKumarB...',
      to: recipient,
      amount: amount,
      type: 'TRANSFER',
      timestamp: new Date().toLocaleTimeString()
    };

    setPendingTransactions(prev => [...prev, tx]);
    addLog(`Transaction queued: Send ${amount} ${symbol} to ${recipient}`);
  };

  const handleMine = () => {
    if (pendingTransactions.length === 0) return;
    setIsMining(true);
    addLog('Mining new block... Solving cryptographic PoW difficulty (4 leading zeros)...');
    
    setTimeout(() => {
      const lastBlock = blocks[blocks.length - 1];
      const newBlockIndex = blocks.length;
      let nonce = 0;
      let hash = '';
      
      // Simulating simple PoW
      while (true) {
        nonce = Math.floor(Math.random() * 100000);
        hash = generateHash(newBlockIndex, lastBlock.hash, pendingTransactions, nonce);
        if (hash.startsWith('0000')) {
          break;
        }
      }

      const newBlock: Block = {
        index: newBlockIndex,
        timestamp: new Date().toLocaleTimeString(),
        transactions: [...pendingTransactions],
        previousHash: lastBlock.hash,
        hash: hash,
        nonce: nonce,
        merkleRoot: '0x' + Math.floor(Math.random() * 10000000).toString(16).padStart(16, '0')
      };

      // Update balances
      const updatedBalances = { ...balances };
      pendingTransactions.forEach(tx => {
        updatedBalances[tx.from] = (updatedBalances[tx.from] || 0) - tx.amount;
        updatedBalances[tx.to] = (updatedBalances[tx.to] || 0) + tx.amount;
      });

      setBalances(updatedBalances);
      setBlocks(prev => [...prev, newBlock]);
      setPendingTransactions([]);
      setIsMining(false);
      
      addLog(`🎉 Block #${newBlockIndex} mined successfully! Hash: ${hash.slice(0, 16)}...`);
      addLog(`EVM block state root synchronized.`);
    }, 1500);
  };

  const solidityContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ${contractName} is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("${contractName}", "${symbol}") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Interactive transfer logic
    function transfer(address to, uint256 amount) public override returns (bool) {
        return super.transfer(to, amount);
    }
}`;

  return (
    <div className="bg-[#0A0A0B] border border-white/10 rounded-sm overflow-hidden shadow-xl" id="blockchain-explorer-container">
      {/* Header bar */}
      <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-white/60" />
          <span className="font-serif italic text-white/80 tracking-tight">Solidity & Smart Contract Sandbox</span>
        </div>
        <button
          onClick={() => setViewCode(!viewCode)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#0A0A0B] hover:bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all text-[10px] font-mono uppercase tracking-[0.2em]"
          id="toggle-code-view"
        >
          <Code2 className="w-3.5 h-3.5" />
          {viewCode ? 'View Playground' : 'View Solidity Code'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Control Panel */}
        <div className="lg:col-span-5 p-6 border-r border-white/10 flex flex-col gap-6 bg-transparent">
          {viewCode ? (
            /* Solidity Code Viewer */
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-white uppercase tracking-widest">{contractName}.sol</span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Pragma ^0.8.24</span>
              </div>
              <pre className="bg-[#0A0A0B] p-4 rounded-sm font-mono text-[10px] leading-relaxed text-white/60 overflow-x-auto border border-white/5 max-h-[380px]">
                <code>{solidityContract}</code>
              </pre>
              <p className="text-xs text-white/40 font-serif italic leading-relaxed">
                "This Ethereum ERC-20 contract is compiled by EVM virtual core. Changing the contract parameters below will rebuild and redeploy the genesis block."
              </p>
            </div>
          ) : (
            /* Interactive Sandbox Controls */
            <>
              {/* Deploy Contract Form */}
              {!isDeployed ? (
                <form onSubmit={handleDeploy} className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono font-medium uppercase tracking-[0.2em]">
                    <Layers className="w-4 h-4" />
                    <span>Deploy Custom Token</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Token Name</label>
                      <input
                        type="text"
                        value={contractName}
                        onChange={(e) => setContractName(e.target.value)}
                        className="bg-[#0A0A0B] border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                        placeholder="MohanToken"
                        required
                        id="token-name-input"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Symbol</label>
                      <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        className="bg-[#0A0A0B] border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                        placeholder="MTK"
                        required
                        id="token-symbol-input"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Initial Supply</label>
                    <input
                      type="number"
                      value={initialSupply}
                      onChange={(e) => setInitialSupply(Number(e.target.value))}
                      className="bg-[#0A0A0B] border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                      min="100"
                      required
                      id="token-supply-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-white/90 text-[#0A0A0B] font-medium py-2.5 px-4 rounded-sm transition-all text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                    id="deploy-contract-btn"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Deploy to EVM Sandbox
                  </button>
                </form>
              ) : (
                /* Interactive Transaction Panel */
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <div className="text-[10px] text-white/40 font-mono uppercase tracking-[0.2em]">ACTIVE CONTRACT</div>
                      <h4 className="text-sm font-medium text-white">{contractName} ({symbol})</h4>
                    </div>
                    <button
                      onClick={() => {
                        setIsDeployed(false);
                        setBlocks(blocks.slice(0, 1));
                        setPendingTransactions([]);
                        addLog('Contract sandbox state reset to Genesis.');
                      }}
                      className="text-[10px] text-white/40 hover:text-white font-mono uppercase tracking-widest flex items-center gap-1 transition-colors"
                      id="reset-sandbox-btn"
                    >
                      <RefreshCw className="w-3 h-3" />
                      RESET
                    </button>
                  </div>

                  {/* Account Balance Widget */}
                  <div className="bg-[#0A0A0B] p-3.5 rounded-sm border border-white/5 flex flex-col gap-2 font-mono">
                    <div className="text-[10px] uppercase tracking-widest text-white/40 flex items-center justify-between">
                      <span>WALLET balances</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-white/60" />
                    </div>
                    <div className="flex flex-col gap-1.5 text-xs text-white/60">
                      <div className="flex justify-between items-center bg-white/5 p-1.5 rounded-sm border border-white/10">
                        <span className="text-white font-medium text-[10px] uppercase tracking-widest">0xMohan... (You)</span>
                        <span>{balances['0xMohanKumarB...'].toLocaleString()} {symbol}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 text-[10px] uppercase tracking-widest">
                        <span className="text-white/40">0xTitan...</span>
                        <span>{balances['0xTitanCompany894F...'].toLocaleString()} {symbol}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 text-[10px] uppercase tracking-widest">
                        <span className="text-white/40">0xSamkhya...</span>
                        <span>{balances['0xSamkhyaAI902C...'].toLocaleString()} {symbol}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Smart Contract Transaction */}
                  <form onSubmit={handleTransfer} className="flex flex-col gap-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                      <Send className="w-3.5 h-3.5 text-white/60" />
                      <span>Execute transfer()</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Recipient Address</label>
                      <select
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="bg-[#0A0A0B] border border-white/10 rounded-sm px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white/30"
                        id="tx-recipient-select"
                      >
                        <option value="0xTitanCompany894F...">0xTitan... (Titan Intern)</option>
                        <option value="0xSamkhyaAI902C...">0xSamkhya... (Quantum Intern)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Amount</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="bg-[#0A0A0B] border border-white/10 rounded-sm px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white/30"
                        min="1"
                        required
                        id="tx-amount-input"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-white hover:bg-white/90 text-[#0A0A0B] font-medium py-1.5 px-3 rounded-sm text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1"
                      id="tx-submit-btn"
                    >
                      <Key className="w-3 h-3" />
                      Sign & Submit Tx
                    </button>
                  </form>

                  {/* Pending transactions & Miner trigger */}
                  <div className="border-t border-white/10 pt-3 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-mono">
                      <span className="text-white/40">Mempool Pool ({pendingTransactions.length} Txs)</span>
                      {pendingTransactions.length > 0 && (
                        <span className="text-white/60 animate-pulse">Waiting for miner...</span>
                      )}
                    </div>

                    {pendingTransactions.length > 0 ? (
                      <div className="bg-[#0A0A0B] p-2.5 rounded-sm border border-white/10 text-xs font-mono flex flex-col gap-1.5 max-h-[100px] overflow-y-auto">
                        {pendingTransactions.map((tx, idx) => (
                          <div key={idx} className="flex justify-between text-white/60 text-[11px] border-b border-white/5 pb-1 last:border-0 last:pb-0">
                            <span className="truncate max-w-[120px] text-white/80">↳ Transfer to {tx.to.slice(0, 8)}...</span>
                            <span>{tx.amount} {symbol}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[10px] font-mono text-white/30 italic text-center py-2 bg-white/5 rounded-sm border border-dashed border-white/10">
                        No pending transactions in pool.
                      </div>
                    )}

                    <button
                      onClick={handleMine}
                      disabled={pendingTransactions.length === 0 || isMining}
                      className={`w-full font-medium py-2 px-4 rounded-sm text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                        pendingTransactions.length > 0 && !isMining
                          ? 'bg-white hover:bg-white/90 text-[#0A0A0B] cursor-pointer'
                          : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
                      }`}
                      id="mine-block-btn"
                    >
                      <Cpu className={`w-3.5 h-3.5 ${isMining ? 'animate-spin' : ''}`} />
                      {isMining ? 'SOLVING CRYPTO POW...' : 'MINE PENDING BLOCK'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Blockchain visualization & Logs */}
        <div className="lg:col-span-7 flex flex-col h-[520px]">
          {/* Blocks container */}
          <div className="flex-1 p-6 overflow-y-auto bg-[#070708] flex flex-col gap-4 border-b border-white/10 relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-medium relative z-10">
              Chain Ledger State
            </h4>

            <div className="flex flex-col gap-4 relative z-10">
              <AnimatePresence initial={false}>
                {blocks.map((block) => (
                  <motion.div
                    key={block.index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white/5 border border-white/10 p-4 rounded-sm relative transition-all font-mono text-xs flex flex-col gap-2"
                    id={`block-card-${block.index}`}
                  >
                    {/* Index tag */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 bg-white/10 text-white px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-widest border border-white/5">
                        <Layers className="w-3 h-3" />
                        <span>BLOCK #{block.index}</span>
                      </div>
                      <span className="text-[10px] text-white/40 uppercase tracking-widest">{block.timestamp}</span>
                    </div>

                    {/* Hash codes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] bg-[#0A0A0B] p-2 rounded-sm border border-white/5">
                      <div>
                        <span className="text-white/40 block uppercase tracking-widest mb-1">CURRENT HASH</span>
                        <span className="text-white/80 font-medium select-all break-all">{block.hash.slice(0, 32)}...</span>
                      </div>
                      <div>
                        <span className="text-white/40 block uppercase tracking-widest mb-1">PREVIOUS HASH</span>
                        <span className="text-white/60 select-all break-all">{block.previousHash.slice(0, 32)}...</span>
                      </div>
                    </div>

                    {/* Merkle root and Nonce */}
                    <div className="flex gap-4 text-[10px] text-white/60 uppercase tracking-widest">
                      <div>Nonce: <span className="text-white font-medium">{block.nonce}</span></div>
                      <div>Merkle Root: <span className="text-white/80 font-mono">{block.merkleRoot}</span></div>
                    </div>

                    {/* Block transactions list */}
                    <div className="border-t border-white/10 pt-2 flex flex-col gap-1.5">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest">Included Transactions:</span>
                      {block.transactions.length > 0 ? (
                        block.transactions.map((tx, idx) => (
                          <div key={idx} className="flex flex-col bg-[#0A0A0B] px-2.5 py-1.5 rounded-sm border border-white/5 text-[10px] text-white/60">
                            <div className="flex justify-between items-center">
                              <span className={`font-medium ${tx.type === 'DEPLOY' ? 'text-white' : tx.type === 'MINT' ? 'text-white' : 'text-white/80'}`}>
                                [{tx.type}]
                              </span>
                              <span>{tx.amount.toLocaleString()} {symbol}</span>
                            </div>
                            <div className="flex justify-between text-[9px] text-white/40 mt-1 uppercase tracking-widest">
                              <span className="truncate max-w-[120px]">From: {tx.from}</span>
                              <span className="truncate max-w-[120px]">To: {tx.to}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-[10px] text-white/30 italic">Genesis Block: No transfers registered.</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* EVM Console Log */}
          <div className="h-[140px] bg-[#0A0A0B] p-4 font-mono text-[10px] leading-relaxed overflow-y-auto border-t border-white/10 text-white/40 custom-scrollbar">
            <div className="text-[10px] uppercase tracking-widest text-white/60 mb-2 border-b border-white/10 pb-1 flex justify-between items-center">
              <span>EVM CORE EXECUTION LOGS</span>
              <span className="flex items-center gap-1 text-[9px] uppercase tracking-[0.2em] text-white/40">
                <CheckCircle2 className="w-2.5 h-2.5" /> ONLINE
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {logs.map((log, idx) => (
                <div key={idx} className={log.includes('❌') ? 'text-white/60' : log.includes('🎉') || log.includes('MINTED') ? 'text-white/80' : log.includes('Executing') || log.includes('Deploying') ? 'text-white' : 'text-white/40'}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
