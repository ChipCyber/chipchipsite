const config = {
  erc20ABI: [{
    "constant": false,
    "inputs": [{
      "name": "_spender",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_to",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "showMeTheMoney",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_to",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_from",
      "type": "address"
    }, {
      "name": "_to",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "_from",
      "type": "address"
    }, {
      "indexed": true,
      "name": "_to",
      "type": "address"
    }, {
      "indexed": false,
      "name": "_value",
      "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "_owner",
      "type": "address"
    }, {
      "indexed": true,
      "name": "_spender",
      "type": "address"
    }, {
      "indexed": false,
      "name": "_value",
      "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
  }, {
    "constant": true,
    "inputs": [{
      "name": "_owner",
      "type": "address"
    }, {
      "name": "_spender",
      "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
      "name": "remaining",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "_owner",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "name": "balance",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }],
  AirdropPoolABI: [{
    "inputs": [{
      "internalType": "address",
      "name": "_bonusToken",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_cycle",
      "type": "uint256"
    }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "pid",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "pid",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
    ],
    "name": "EmergencyWithdraw",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "pid",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_allocPoint",
      "type": "uint256"
    },
    {
      "internalType": "contract IERC20",
      "name": "_lpToken",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "_withUpdate",
      "type": "bool"
    }
    ],
    "name": "add",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bonusPerBlock",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bonusToken",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cycle",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_pid",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_pid",
      "type": "uint256"
    }],
    "name": "emergencyWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endBlock",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "massUpdatePools",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_tokenAmount",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_newPerBlock",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_startBlock",
      "type": "uint256"
    }
    ],
    "name": "newAirdrop",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_pid",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "_user",
      "type": "address"
    }
    ],
    "name": "pending",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "name": "poolInfo",
    "outputs": [{
      "internalType": "contract IERC20",
      "name": "lpToken",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "allocPoint",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "lastRewardBlock",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "accBonusPerShare",
      "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "poolLength",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_pid",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_allocPoint",
      "type": "uint256"
    },
    {
      "internalType": "bool",
      "name": "_withUpdate",
      "type": "bool"
    }
    ],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_newCycle",
      "type": "uint256"
    }],
    "name": "setCycle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startBlock",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalAllocPoint",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_pid",
      "type": "uint256"
    }],
    "name": "updatePool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
    ],
    "name": "userInfo",
    "outputs": [{
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "rewardDebt",
      "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_pid",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }],
  BGMPoolABI: [
    {
      "inputs": [{
        "internalType": "address",
        "name": "_BGM",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_refs",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_blockRewards",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_startBlock",
        "type": "uint256"
      }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "touser",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
      ],
      "name": "EmergencyWithdraw",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lockAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "transferAmount",
        "type": "uint256"
      }
      ],
      "name": "LockPool",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "unlockAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "transferAmount",
        "type": "uint256"
      }
      ],
      "name": "UnLockPool",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "BGM",
      "outputs": [{
        "internalType": "contract IMintableToken",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "name": "LpOfPid",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_allocPoint",
        "type": "uint256"
      },
      {
        "internalType": "contract IERC20",
        "name": "_lpToken",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_withUpdate",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "_investPool",
        "type": "address"
      }
      ],
      "name": "add",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "_addLP",
        "type": "address"
      }],
      "name": "addMultLP",
      "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }],
      "name": "allPending",
      "outputs": [{
        "internalType": "uint256",
        "name": "totalRewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalTokenAmount",
        "type": "uint256"
      }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "bgmRouter",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "blockRewards",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }],
      "name": "emergencyNative",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
      ],
      "name": "emergencyWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_lastRewardBlock",
        "type": "uint256"
      }],
      "name": "getBlockRewards",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      }],
      "name": "getMultLPAddress",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMultLPLength",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "_LP",
        "type": "address"
      }],
      "name": "isMultLP",
      "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "_lpToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_unlockAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_feeAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_unlockuser",
        "type": "address"
      }
      ],
      "name": "lenderUnlock",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
      ],
      "name": "lockAmounts",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "massUpdatePools",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "multLpChef",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "multLpToken",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
      ],
      "name": "pending",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "_token",
        "type": "address"
      }],
      "name": "pidFromLPAddr",
      "outputs": [{
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "name": "poolCorrespond",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "name": "poolInfo",
      "outputs": [{
        "internalType": "contract IERC20",
        "name": "lpToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "allocPoint",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastRewardBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "accRewardPerShare",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "accMultLpPerShare",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "investPool",
        "type": "address"
      }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "poolLength",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "refs",
      "outputs": [{
        "internalType": "contract IReferences",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "_multLpToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_multLpChef",
        "type": "address"
      }
      ],
      "name": "replaceMultLP",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      }],
      "name": "reward",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_allocPoint",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_withUpdate",
        "type": "bool"
      }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "_bgmRouter",
        "type": "address"
      }],
      "name": "setBGMRouter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_blockRewards",
        "type": "uint256"
      }],
      "name": "setBlockRewards",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "_multLpToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_multLpChef",
        "type": "address"
      }
      ],
      "name": "setMultLP",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "setPause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_sid",
        "type": "uint256"
      }
      ],
      "name": "setPoolCorr",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "_refs",
        "type": "address"
      }],
      "name": "setRefs",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_startBlock",
        "type": "uint256"
      }],
      "name": "setStartBlock",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startBlock",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalAllocPoint",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      }],
      "name": "updatePool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
      ],
      "name": "userInfo",
      "outputs": [{
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "rewardDebt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lockedAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "multLpRewardDebt",
        "type": "uint256"
      }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_lockAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_lender",
        "type": "address"
      }
      ],
      "name": "userLock",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_lockAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_lender",
        "type": "address"
      }
      ],
      "name": "userLockFromRouter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }],
  BgmReferenceABI: [{
    "inputs": [{
      "internalType": "address",
      "name": "_refStore",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_rewardToken",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_MaxRewardAmount",
      "type": "uint256"
    }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
    ],
    "name": "EmergencyWithdraw",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
    ],
    "name": "RequestWithdraw",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "ref",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "layer",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "rewardAmount",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "transferAmount",
      "type": "uint256"
    }
    ],
    "name": "RewardLayers",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MaxRewardAmount",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MaxRewardLayer",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_addCaller",
      "type": "address"
    }],
    "name": "addCaller",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_delCaller",
      "type": "address"
    }],
    "name": "delCaller",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_index",
      "type": "uint256"
    }],
    "name": "getCaller",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCallerLength",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256[]",
      "name": "rewards",
      "type": "uint256[]"
    }],
    "name": "initRewardTable",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "isCaller",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_user",
      "type": "address"
    }],
    "name": "pendingWithdraw",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "refStore",
    "outputs": [{
      "internalType": "contract IReferenceStore",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rewardBase",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "name": "rewardFeeRatio",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rewardToken",
    "outputs": [{
      "internalType": "contract IMintableToken",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "ref",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
    ],
    "name": "rewardUpper",
    "outputs": [{
      "internalType": "uint256",
      "name": "mintAmount",
      "type": "uint256"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_MaxRewardAmount",
      "type": "uint256"
    }],
    "name": "setMaxRewardAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_rewardBase",
      "type": "uint256"
    }],
    "name": "setRewardBase",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_rewardToken",
      "type": "address"
    }],
    "name": "setRewardToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_refStore",
      "type": "address"
    }],
    "name": "setStore",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "upper",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "distributor",
      "type": "address"
    }
    ],
    "name": "setUpper",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalRewardAmount",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalRewardDebt",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "userInfo",
    "outputs": [{
      "internalType": "uint256",
      "name": "rewardDebt",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "rewardAmount",
      "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }],
  BGMRouterABI: [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_token",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amountToken",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "topool",
      "type": "bool"
    }
    ],
    "name": "addBonusPool",
    "outputs": [{
      "internalType": "uint256",
      "name": "amountU",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "liqudity",
      "type": "uint256"
    }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_game",
      "type": "address"
    }],
    "name": "addGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bgmBackup",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bgmPool",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bgmProfitShare",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bgmRefs",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeTo",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "amountUIn",
      "type": "uint256"
    }],
    "name": "fillGamePool",
    "outputs": [{
      "internalType": "uint256",
      "name": "amountOut",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "amountIn",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "amountU",
      "type": "uint256"
    }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "games",
    "outputs": [{
      "internalType": "contract IGame",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_user",
      "type": "address"
    }],
    "name": "getUserExtData",
    "outputs": [{
      "internalType": "bytes",
      "name": "",
      "type": "bytes"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lptoken",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "amountU",
      "type": "uint256"
    }],
    "name": "profitShare",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "refStore",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "upper",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "distributor",
      "type": "address"
    },
    {
      "internalType": "bytes",
      "name": "extdata",
      "type": "bytes"
    }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_token",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "liquidity",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }
    ],
    "name": "removeBonusPool",
    "outputs": [{
      "internalType": "uint256",
      "name": "amountToken",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "amountU",
      "type": "uint256"
    }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_bgmBackup",
      "type": "address"
    }],
    "name": "setBGMBackup",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_bgmPool",
      "type": "address"
    }],
    "name": "setBGMPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_bgmProfitShare",
      "type": "address"
    }],
    "name": "setBGMProfitShare",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_bgmRefs",
      "type": "address"
    }],
    "name": "setBGMRefs",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_feeTo",
      "type": "address"
    }],
    "name": "setFeeTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_lptoken",
      "type": "address"
    }],
    "name": "setLPToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_refStore",
      "type": "address"
    }],
    "name": "setRefStore",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_sweeper",
      "type": "address"
    }],
    "name": "setSweeper",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_tokenU",
      "type": "address"
    }],
    "name": "setTokenU",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "bytes",
      "name": "extdata",
      "type": "bytes"
    }],
    "name": "setUserExtData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_token",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amountToken",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }
    ],
    "name": "swapTokenForUT",
    "outputs": [{
      "internalType": "uint256",
      "name": "amountU",
      "type": "uint256"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_token",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amountU",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }
    ],
    "name": "swapUTForToken",
    "outputs": [{
      "internalType": "uint256",
      "name": "amountToken",
      "type": "uint256"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sweeper",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenU",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_pid",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_lockAmount",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "_lender",
      "type": "address"
    }
    ],
    "name": "userLend",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_lender",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_lpToken",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_utAmount",
      "type": "uint256"
    }
    ],
    "name": "userPayFromRouter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_token",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_game",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amountToken",
      "type": "uint256"
    },
    {
      "internalType": "bytes",
      "name": "_data",
      "type": "bytes"
    }
    ],
    "name": "wager",
    "outputs": [{
      "internalType": "uint256",
      "name": "amountU",
      "type": "uint256"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_token",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_game",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amountToken",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "_to",
      "type": "address"
    },
    {
      "internalType": "bytes",
      "name": "_data",
      "type": "bytes"
    }
    ],
    "name": "withdraw",
    "outputs": [{
      "internalType": "uint256",
      "name": "amountU",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "realAmountU",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "realAmountToken",
      "type": "uint256"
    }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }],
  BGMTwABI: [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "singleToken_",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "_decimals",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "_vaultAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "previousAdminRole",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "newAdminRole",
          "type": "bytes32"
        }
      ],
      "name": "RoleAdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Staked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdrawn",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MINTER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PAUSER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "TRANSFER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "WITHDRAW_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burnFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "bxhv2FundAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "exit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "frozenStakingTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getRoleMember",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleMemberCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "lastStakeTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "frozenStakingTime_",
          "type": "uint256"
        }
      ],
      "name": "setFrozenStakingTime",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "bxhv2FundAddress_",
          "type": "address"
        }
      ],
      "name": "setbxhV2FundAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "stake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "unfrozenStakeTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "vaultAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenaddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "withdrawEmergency",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "rewardTokenAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawRewardToFundAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }],
  GUTLender: [
    {
      "_format": "hh-sol-artifact-1",
      "contractName": "GUTLender",
      "sourceName": "contracts/GUTLender.sol",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_ut",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_gut",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_bgmPool",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_lendUTRatio",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_lendUTFee",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_feeAddr",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "utAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "unlockAmount",
              "type": "uint256"
            }
          ],
          "name": "Repayment",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "lpToken",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "lockAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "utAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "pool",
              "type": "address"
            }
          ],
          "name": "UserLend",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "UT",
          "outputs": [
            {
              "internalType": "contract IMintableToken",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "bgmPool",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "bgmRouter",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "blockTimeOut",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "feeAddr",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "gUT",
          "outputs": [
            {
              "internalType": "contract IMintableToken",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "lendUTFee",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "lendUTRatio",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_bgmPool",
              "type": "address"
            }
          ],
          "name": "setBGMPool",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_bgmRouter",
              "type": "address"
            }
          ],
          "name": "setBGMRouter",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_feeAddr",
              "type": "address"
            }
          ],
          "name": "setFeeAddr",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_gut",
              "type": "address"
            }
          ],
          "name": "setGUTToken",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockTimeOut",
              "type": "uint256"
            }
          ],
          "name": "setLendBlockTimeOut",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_lendUTFee",
              "type": "uint256"
            }
          ],
          "name": "setLendUTFee",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_lendUTRatio",
              "type": "uint256"
            }
          ],
          "name": "setLendUTRatio",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_ut",
              "type": "address"
            }
          ],
          "name": "setUTToken",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_user",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_lpToken",
              "type": "address"
            }
          ],
          "name": "timeOutUserLender",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "unlockAmount",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "userInfos",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "lockAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "utAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lendStartBlocks",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_user",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_lpToken",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_lockAmount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_investpool",
              "type": "address"
            }
          ],
          "name": "userLockForLend",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "utAmount",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_user",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_lpToken",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_utAmount",
              "type": "uint256"
            }
          ],
          "name": "userPayFromRouter",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_lpToken",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_utAmount",
              "type": "uint256"
            }
          ],
          "name": "userRepay",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "unlockAmount",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      "bytecode": "0x608060405262a0668060075534801561001757600080fd5b506040516115b13803806115b1833981810160405260c081101561003a57600080fd5b508051602082015160408301516060840151608085015160a0909501519394929391929091600061006961010f565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350600280546001600160a01b039788166001600160a01b0319918216179091556001805496881696821696909617909555600380549487169486169490941790935560059190915560065560088054919093169116179055610113565b3390565b61148f806101226000396000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c806382498ad0116100c3578063bcc286fd1161007c578063bcc286fd14610362578063c9b5279c14610388578063da000968146103d4578063e75175a0146103dc578063f0f4db8e14610402578063f2fde38b1461040a57610158565b806382498ad0146102bb5780638da5cb5b146102e9578063a4e118a6146102f1578063b2855b4f146102f9578063b53c0e261461031f578063ba970ae61461033c57610158565b806339e7fddc1161011557806339e7fddc14610221578063439b4dda146102295780634626ddb31461026757806366e3821a146102a3578063715018a6146102ab57806373993902146102b357610158565b8063055d536e1461015d5780630df07b701461019557806324080bbb146101bb5780632d2757e0146101df578063356ae2c0146101fc57806338dcd4fd14610219575b600080fd5b6101936004803603606081101561017357600080fd5b506001600160a01b03813581169160208101359091169060400135610430565b005b610193600480360360208110156101ab57600080fd5b50356001600160a01b0316610498565b6101c361051c565b604080516001600160a01b039092168252519081900360200190f35b610193600480360360208110156101f557600080fd5b503561052b565b6101936004803603602081101561021257600080fd5b5035610592565b6101c36105f9565b6101c3610608565b6102556004803603604081101561023f57600080fd5b506001600160a01b038135169060200135610617565b60408051918252519081900360200190f35b6102556004803603608081101561027d57600080fd5b506001600160a01b0381358116916020810135821691604082013591606001351661062d565b610255610814565b61019361081a565b6101c36108c6565b610255600480360360408110156102d157600080fd5b506001600160a01b03813581169160200135166108d5565b6101c3610be5565b610255610bf4565b6101936004803603602081101561030f57600080fd5b50356001600160a01b0316610bfa565b6101936004803603602081101561033557600080fd5b5035610c7e565b6101936004803603602081101561035257600080fd5b50356001600160a01b0316610ce5565b6101936004803603602081101561037857600080fd5b50356001600160a01b0316610d69565b6103b66004803603604081101561039e57600080fd5b506001600160a01b0381358116916020013516610ded565b60408051938452602084019290925282820152519081900360600190f35b610255610e19565b610193600480360360208110156103f257600080fd5b50356001600160a01b0316610e1f565b6101c3610ea3565b6101936004803603602081101561042057600080fd5b50356001600160a01b0316610eb2565b6009546001600160a01b03163314610487576040805162461bcd60e51b815260206004820152601560248201527437b7363c9031b0b63610333937b6903937baba32b960591b604482015290519081900360640190fd5b610492838383610fb4565b50505050565b6104a0611277565b6001600160a01b03166104b1610be5565b6001600160a01b0316146104fa576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600380546001600160a01b0319166001600160a01b0392909216919091179055565b6001546001600160a01b031681565b610533611277565b6001600160a01b0316610544610be5565b6001600160a01b03161461058d576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600755565b61059a611277565b6001600160a01b03166105ab610be5565b6001600160a01b0316146105f4576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600555565b6009546001600160a01b031681565b6008546001600160a01b031681565b6000610624338484610fb4565b90505b92915050565b6003546000906001600160a01b03163314610685576040805162461bcd60e51b81526020600482015260136024820152721bdb9b1e4818d85b1b08199c9bdb481c1bdbdb606a1b604482015290519081900360640190fd5b6001600160a01b0380861660009081526004602090815260408083209388168352929052206005546106c690612710906106c090879061127b565b906112d4565b91506000821161070e576040805162461bcd60e51b815260206004820152600e60248201526d757420616d6f756e74207a65726f60901b604482015290519081900360640190fd5b805461071a908561133b565b8155600181015461072b908361133b565b60018083019190915543600283015554604080516340c10f1960e01b81526001600160a01b03898116600483015260248201869052915191909216916340c10f199160448083019260209291908290030181600087803b15801561078e57600080fd5b505af11580156107a2573d6000803e3d6000fd5b505050506040513d60208110156107b857600080fd5b505060408051858152602081018490526001600160a01b03858116828401529151828816928916917fd888a969925b3295882ecaa298403468b676702280a2d1f5c1e08387b80b6c39919081900360600190a350949350505050565b60075481565b610822611277565b6001600160a01b0316610833610be5565b6001600160a01b03161461087c576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6002546001600160a01b031681565b60006108df611277565b6001600160a01b03166108f0610be5565b6001600160a01b031614610939576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b6001600160a01b0380841660009081526004602090815260408083209386168352929052206001810154806109a8576040805162461bcd60e51b815260206004820152601060248201526f1d5cd95c881a185cc81b9bc81b195b9960821b604482015290519081900360640190fd5b436109c2600754846002015461133b90919063ffffffff16565b11610a08576040805162461bcd60e51b81526020600482015260116024820152701d5cd95c881b9bdd08081d1a5b595bdd5d607a1b604482015290519081900360640190fd5b600554610a1b906106c08361271061127b565b8254909350831115610a2c57815492505b60015460408051632770a7eb60e21b81526001600160a01b03888116600483015260248201859052915186939290921691639dc29fac916044808201926020929091908290030181600087803b158015610a8557600080fd5b505af1158015610a99573d6000803e3d6000fd5b505050506040513d6020811015610aaf57600080fd5b50508254610abd9085611395565b83556001830154610ace9083611395565b60018401556003546040805163095ea7b360e01b81526001600160a01b0392831660048201526024810187905290519187169163095ea7b3916044808201926020929091908290030181600087803b158015610b2957600080fd5b505af1158015610b3d573d6000803e3d6000fd5b505050506040513d6020811015610b5357600080fd5b50506003546008546040805163f7cacda760e01b81526001600160a01b0389811660048301526024820189905260448201869052928316606482015289831660848201529051919092169163f7cacda79160a480830192600092919082900301818387803b158015610bc457600080fd5b505af1158015610bd8573d6000803e3d6000fd5b5050505050505092915050565b6000546001600160a01b031690565b60065481565b610c02611277565b6001600160a01b0316610c13610be5565b6001600160a01b031614610c5c576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600880546001600160a01b0319166001600160a01b0392909216919091179055565b610c86611277565b6001600160a01b0316610c97610be5565b6001600160a01b031614610ce0576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600655565b610ced611277565b6001600160a01b0316610cfe610be5565b6001600160a01b031614610d47576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600280546001600160a01b0319166001600160a01b0392909216919091179055565b610d71611277565b6001600160a01b0316610d82610be5565b6001600160a01b031614610dcb576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600980546001600160a01b0319166001600160a01b0392909216919091179055565b600460209081526000928352604080842090915290825290208054600182015460029092015490919083565b60055481565b610e27611277565b6001600160a01b0316610e38610be5565b6001600160a01b031614610e81576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6003546001600160a01b031681565b610eba611277565b6001600160a01b0316610ecb610be5565b6001600160a01b031614610f14576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b6001600160a01b038116610f595760405162461bcd60e51b81526004018080602001828103825260268152602001806113f36026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000808211611000576040805162461bcd60e51b81526020600482015260136024820152723ab9b2b9103aba20b6b7bab73a1032b93937b960691b604482015290519081900360640190fd5b6001600160a01b0380851660009081526004602090815260408083209387168352929052206001810154831115611074576040805162461bcd60e51b81526020600482015260136024820152727573657220726570617920746f206c6172676560681b604482015290519081900360640190fd5b600554611087906106c08561271061127b565b815490925082111561109857805491505b60006110bf836110b96006546106c06127108861127b90919063ffffffff16565b90611395565b60015460408051632770a7eb60e21b81526001600160a01b038a81166004830152602482018990529151939450911691639dc29fac916044808201926020929091908290030181600087803b15801561111757600080fd5b505af115801561112b573d6000803e3d6000fd5b505050506040513d602081101561114157600080fd5b5050815461114f9084611395565b825560018201546111609085611395565b60018301556003546040805163095ea7b360e01b81526001600160a01b0392831660048201526024810186905290519187169163095ea7b3916044808201926020929091908290030181600087803b1580156111bb57600080fd5b505af11580156111cf573d6000803e3d6000fd5b505050506040513d60208110156111e557600080fd5b50506003546008546040805163f7cacda760e01b81526001600160a01b0389811660048301526024820188905260448201869052928316606482015289831660848201529051919092169163f7cacda79160a480830192600092919082900301818387803b15801561125657600080fd5b505af115801561126a573d6000803e3d6000fd5b5050505050509392505050565b3390565b60008261128a57506000610627565b8282028284828161129757fe5b04146106245760405162461bcd60e51b81526004018080602001828103825260218152602001806114196021913960400191505060405180910390fd5b600080821161132a576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b81838161133357fe5b049392505050565b600082820183811015610624576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6000828211156113ec576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b5090039056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a2646970667358221220235d7fd301b7c862fd0221df90bce27c1513539c0d50dbd42eaad1a139ce643064736f6c634300060c0033",
      "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106101585760003560e01c806382498ad0116100c3578063bcc286fd1161007c578063bcc286fd14610362578063c9b5279c14610388578063da000968146103d4578063e75175a0146103dc578063f0f4db8e14610402578063f2fde38b1461040a57610158565b806382498ad0146102bb5780638da5cb5b146102e9578063a4e118a6146102f1578063b2855b4f146102f9578063b53c0e261461031f578063ba970ae61461033c57610158565b806339e7fddc1161011557806339e7fddc14610221578063439b4dda146102295780634626ddb31461026757806366e3821a146102a3578063715018a6146102ab57806373993902146102b357610158565b8063055d536e1461015d5780630df07b701461019557806324080bbb146101bb5780632d2757e0146101df578063356ae2c0146101fc57806338dcd4fd14610219575b600080fd5b6101936004803603606081101561017357600080fd5b506001600160a01b03813581169160208101359091169060400135610430565b005b610193600480360360208110156101ab57600080fd5b50356001600160a01b0316610498565b6101c361051c565b604080516001600160a01b039092168252519081900360200190f35b610193600480360360208110156101f557600080fd5b503561052b565b6101936004803603602081101561021257600080fd5b5035610592565b6101c36105f9565b6101c3610608565b6102556004803603604081101561023f57600080fd5b506001600160a01b038135169060200135610617565b60408051918252519081900360200190f35b6102556004803603608081101561027d57600080fd5b506001600160a01b0381358116916020810135821691604082013591606001351661062d565b610255610814565b61019361081a565b6101c36108c6565b610255600480360360408110156102d157600080fd5b506001600160a01b03813581169160200135166108d5565b6101c3610be5565b610255610bf4565b6101936004803603602081101561030f57600080fd5b50356001600160a01b0316610bfa565b6101936004803603602081101561033557600080fd5b5035610c7e565b6101936004803603602081101561035257600080fd5b50356001600160a01b0316610ce5565b6101936004803603602081101561037857600080fd5b50356001600160a01b0316610d69565b6103b66004803603604081101561039e57600080fd5b506001600160a01b0381358116916020013516610ded565b60408051938452602084019290925282820152519081900360600190f35b610255610e19565b610193600480360360208110156103f257600080fd5b50356001600160a01b0316610e1f565b6101c3610ea3565b6101936004803603602081101561042057600080fd5b50356001600160a01b0316610eb2565b6009546001600160a01b03163314610487576040805162461bcd60e51b815260206004820152601560248201527437b7363c9031b0b63610333937b6903937baba32b960591b604482015290519081900360640190fd5b610492838383610fb4565b50505050565b6104a0611277565b6001600160a01b03166104b1610be5565b6001600160a01b0316146104fa576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600380546001600160a01b0319166001600160a01b0392909216919091179055565b6001546001600160a01b031681565b610533611277565b6001600160a01b0316610544610be5565b6001600160a01b03161461058d576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600755565b61059a611277565b6001600160a01b03166105ab610be5565b6001600160a01b0316146105f4576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600555565b6009546001600160a01b031681565b6008546001600160a01b031681565b6000610624338484610fb4565b90505b92915050565b6003546000906001600160a01b03163314610685576040805162461bcd60e51b81526020600482015260136024820152721bdb9b1e4818d85b1b08199c9bdb481c1bdbdb606a1b604482015290519081900360640190fd5b6001600160a01b0380861660009081526004602090815260408083209388168352929052206005546106c690612710906106c090879061127b565b906112d4565b91506000821161070e576040805162461bcd60e51b815260206004820152600e60248201526d757420616d6f756e74207a65726f60901b604482015290519081900360640190fd5b805461071a908561133b565b8155600181015461072b908361133b565b60018083019190915543600283015554604080516340c10f1960e01b81526001600160a01b03898116600483015260248201869052915191909216916340c10f199160448083019260209291908290030181600087803b15801561078e57600080fd5b505af11580156107a2573d6000803e3d6000fd5b505050506040513d60208110156107b857600080fd5b505060408051858152602081018490526001600160a01b03858116828401529151828816928916917fd888a969925b3295882ecaa298403468b676702280a2d1f5c1e08387b80b6c39919081900360600190a350949350505050565b60075481565b610822611277565b6001600160a01b0316610833610be5565b6001600160a01b03161461087c576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6002546001600160a01b031681565b60006108df611277565b6001600160a01b03166108f0610be5565b6001600160a01b031614610939576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b6001600160a01b0380841660009081526004602090815260408083209386168352929052206001810154806109a8576040805162461bcd60e51b815260206004820152601060248201526f1d5cd95c881a185cc81b9bc81b195b9960821b604482015290519081900360640190fd5b436109c2600754846002015461133b90919063ffffffff16565b11610a08576040805162461bcd60e51b81526020600482015260116024820152701d5cd95c881b9bdd08081d1a5b595bdd5d607a1b604482015290519081900360640190fd5b600554610a1b906106c08361271061127b565b8254909350831115610a2c57815492505b60015460408051632770a7eb60e21b81526001600160a01b03888116600483015260248201859052915186939290921691639dc29fac916044808201926020929091908290030181600087803b158015610a8557600080fd5b505af1158015610a99573d6000803e3d6000fd5b505050506040513d6020811015610aaf57600080fd5b50508254610abd9085611395565b83556001830154610ace9083611395565b60018401556003546040805163095ea7b360e01b81526001600160a01b0392831660048201526024810187905290519187169163095ea7b3916044808201926020929091908290030181600087803b158015610b2957600080fd5b505af1158015610b3d573d6000803e3d6000fd5b505050506040513d6020811015610b5357600080fd5b50506003546008546040805163f7cacda760e01b81526001600160a01b0389811660048301526024820189905260448201869052928316606482015289831660848201529051919092169163f7cacda79160a480830192600092919082900301818387803b158015610bc457600080fd5b505af1158015610bd8573d6000803e3d6000fd5b5050505050505092915050565b6000546001600160a01b031690565b60065481565b610c02611277565b6001600160a01b0316610c13610be5565b6001600160a01b031614610c5c576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600880546001600160a01b0319166001600160a01b0392909216919091179055565b610c86611277565b6001600160a01b0316610c97610be5565b6001600160a01b031614610ce0576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600655565b610ced611277565b6001600160a01b0316610cfe610be5565b6001600160a01b031614610d47576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600280546001600160a01b0319166001600160a01b0392909216919091179055565b610d71611277565b6001600160a01b0316610d82610be5565b6001600160a01b031614610dcb576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600980546001600160a01b0319166001600160a01b0392909216919091179055565b600460209081526000928352604080842090915290825290208054600182015460029092015490919083565b60055481565b610e27611277565b6001600160a01b0316610e38610be5565b6001600160a01b031614610e81576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6003546001600160a01b031681565b610eba611277565b6001600160a01b0316610ecb610be5565b6001600160a01b031614610f14576040805162461bcd60e51b8152602060048201819052602482015260008051602061143a833981519152604482015290519081900360640190fd5b6001600160a01b038116610f595760405162461bcd60e51b81526004018080602001828103825260268152602001806113f36026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000808211611000576040805162461bcd60e51b81526020600482015260136024820152723ab9b2b9103aba20b6b7bab73a1032b93937b960691b604482015290519081900360640190fd5b6001600160a01b0380851660009081526004602090815260408083209387168352929052206001810154831115611074576040805162461bcd60e51b81526020600482015260136024820152727573657220726570617920746f206c6172676560681b604482015290519081900360640190fd5b600554611087906106c08561271061127b565b815490925082111561109857805491505b60006110bf836110b96006546106c06127108861127b90919063ffffffff16565b90611395565b60015460408051632770a7eb60e21b81526001600160a01b038a81166004830152602482018990529151939450911691639dc29fac916044808201926020929091908290030181600087803b15801561111757600080fd5b505af115801561112b573d6000803e3d6000fd5b505050506040513d602081101561114157600080fd5b5050815461114f9084611395565b825560018201546111609085611395565b60018301556003546040805163095ea7b360e01b81526001600160a01b0392831660048201526024810186905290519187169163095ea7b3916044808201926020929091908290030181600087803b1580156111bb57600080fd5b505af11580156111cf573d6000803e3d6000fd5b505050506040513d60208110156111e557600080fd5b50506003546008546040805163f7cacda760e01b81526001600160a01b0389811660048301526024820188905260448201869052928316606482015289831660848201529051919092169163f7cacda79160a480830192600092919082900301818387803b15801561125657600080fd5b505af115801561126a573d6000803e3d6000fd5b5050505050509392505050565b3390565b60008261128a57506000610627565b8282028284828161129757fe5b04146106245760405162461bcd60e51b81526004018080602001828103825260218152602001806114196021913960400191505060405180910390fd5b600080821161132a576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b81838161133357fe5b049392505050565b600082820183811015610624576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6000828211156113ec576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b5090039056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a2646970667358221220235d7fd301b7c862fd0221df90bce27c1513539c0d50dbd42eaad1a139ce643064736f6c634300060c0033",
      "linkReferences": {},
      "deployedLinkReferences": {}
    }],
  GUTToken: [
    {
      "_format": "hh-sol-artifact-1",
      "contractName": "GUTToken",
      "sourceName": "contracts/GUTToken.sol",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "symbol",
              "type": "string"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "fee",
              "type": "uint256"
            }
          ],
          "name": "Deposit",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "fee",
              "type": "uint256"
            }
          ],
          "name": "Withdraw",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_addMinter",
              "type": "address"
            }
          ],
          "name": "addMinter",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_from",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "burn",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "subtractedValue",
              "type": "uint256"
            }
          ],
          "name": "decreaseAllowance",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_delMinter",
              "type": "address"
            }
          ],
          "name": "delMinter",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_index",
              "type": "uint256"
            }
          ],
          "name": "getMinter",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getMinterLength",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "addedValue",
              "type": "uint256"
            }
          ],
          "name": "increaseAllowance",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "isMinter",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "mint",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      "bytecode": "0x60806040523480156200001157600080fd5b50604051620018d0380380620018d0833981810160405260408110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b50604052505082518391508290620001b89060039060208501906200024c565b508051620001ce9060049060208401906200024c565b50506005805460ff19166012179055506000620001ea62000248565b60058054610100600160a81b0319166101006001600160a01b03841690810291909117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3505050620002e8565b3390565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200028f57805160ff1916838001178555620002bf565b82800160010185558215620002bf579182015b82811115620002bf578251825591602001919060010190620002a2565b50620002cd929150620002d1565b5090565b5b80821115620002cd5760008155600101620002d2565b6115d880620002f86000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c806370a08231116100b85780639dc29fac1161007c5780639dc29fac1461038c578063a457c2d7146103b8578063a9059cbb146103e4578063aa271e1a14610410578063dd62ed3e14610436578063f2fde38b1461046457610137565b806370a0823114610326578063715018a61461034c5780638da5cb5b1461035657806395d89b411461035e578063983b2d561461036657610137565b806323b872dd116100ff57806323b872dd14610241578063313ce56714610277578063395093511461029557806340c10f19146102c15780635b7121f8146102ed57610137565b80630323aac71461013c57806306fdde0314610156578063095ea7b3146101d357806318160ddd1461021357806323338b881461021b575b600080fd5b61014461048a565b60408051918252519081900360200190f35b61015e61049b565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610198578181015183820152602001610180565b50505050905090810190601f1680156101c55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101ff600480360360408110156101e957600080fd5b506001600160a01b038135169060200135610531565b604080519115158252519081900360200190f35b61014461054f565b6101ff6004803603602081101561023157600080fd5b50356001600160a01b0316610555565b6101ff6004803603606081101561025757600080fd5b506001600160a01b03813581169160208101359091169060400135610609565b61027f610690565b6040805160ff9092168252519081900360200190f35b6101ff600480360360408110156102ab57600080fd5b506001600160a01b038135169060200135610699565b6101ff600480360360408110156102d757600080fd5b506001600160a01b0381351690602001356106e7565b61030a6004803603602081101561030357600080fd5b5035610748565b604080516001600160a01b039092168252519081900360200190f35b6101446004803603602081101561033c57600080fd5b50356001600160a01b0316610816565b610354610831565b005b61030a6108e3565b61015e6108f7565b6101ff6004803603602081101561037c57600080fd5b50356001600160a01b0316610958565b6101ff600480360360408110156103a257600080fd5b506001600160a01b038135169060200135610a0c565b6101ff600480360360408110156103ce57600080fd5b506001600160a01b038135169060200135610a6d565b6101ff600480360360408110156103fa57600080fd5b506001600160a01b038135169060200135610ad5565b6101ff6004803603602081101561042657600080fd5b50356001600160a01b0316610ae9565b6101446004803603604081101561044c57600080fd5b506001600160a01b0381358116916020013516610af6565b6103546004803603602081101561047a57600080fd5b50356001600160a01b0316610b21565b60006104966006610c2f565b905090565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105275780601f106104fc57610100808354040283529160200191610527565b820191906000526020600020905b81548152906001019060200180831161050a57829003601f168201915b5050505050905090565b600061054561053e610c3a565b8484610c3e565b5060015b92915050565b60025490565b600061055f610c3a565b6001600160a01b03166105706108e3565b6001600160a01b0316146105b9576040805162461bcd60e51b815260206004820181905260248201526000805160206114f4833981519152604482015290519081900360640190fd5b6001600160a01b0382166105fe5760405162461bcd60e51b81526004018080602001828103825260288152602001806114566028913960400191505060405180910390fd5b610549600683610d2a565b6000610616848484610d46565b61068684610622610c3a565b610681856040518060600160405280602881526020016114cc602891396001600160a01b038a16600090815260016020526040812090610660610c3a565b6001600160a01b031681526020810191909152604001600020549190610ea1565b610c3e565b5060019392505050565b60055460ff1690565b60006105456106a6610c3a565b8461068185600160006106b7610c3a565b6001600160a01b03908116825260208083019390935260409182016000908120918c168152925290205490610f38565b60006106f233610ae9565b61073e576040805162461bcd60e51b815260206004820152601860248201527731b0b63632b91034b9903737ba103a34329036b4b73a32b960411b604482015290519081900360640190fd5b6105458383610f92565b6000610752610c3a565b6001600160a01b03166107636108e3565b6001600160a01b0316146107ac576040805162461bcd60e51b815260206004820181905260248201526000805160206114f4833981519152604482015290519081900360640190fd5b60016107b661048a565b0382111561080b576040805162461bcd60e51b815260206004820152601d60248201527f42474d546f6b656e3a20696e646578206f7574206f6620626f756e6473000000604482015290519081900360640190fd5b610549600683611082565b6001600160a01b031660009081526020819052604090205490565b610839610c3a565b6001600160a01b031661084a6108e3565b6001600160a01b031614610893576040805162461bcd60e51b815260206004820181905260248201526000805160206114f4833981519152604482015290519081900360640190fd5b60055460405160009161010090046001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a360058054610100600160a81b0319169055565b60055461010090046001600160a01b031690565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105275780601f106104fc57610100808354040283529160200191610527565b6000610962610c3a565b6001600160a01b03166109736108e3565b6001600160a01b0316146109bc576040805162461bcd60e51b815260206004820181905260248201526000805160206114f4833981519152604482015290519081900360640190fd5b6001600160a01b038216610a015760405162461bcd60e51b81526004018080602001828103825260288152602001806114a46028913960400191505060405180910390fd5b61054960068361108e565b6000610a1733610ae9565b610a63576040805162461bcd60e51b815260206004820152601860248201527731b0b63632b91034b9903737ba103a34329036b4b73a32b960411b604482015290519081900360640190fd5b61054583836110a3565b6000610545610a7a610c3a565b846106818560405180606001604052806025815260200161157e6025913960016000610aa4610c3a565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190610ea1565b6000610545610ae2610c3a565b8484610d46565b600061054960068361119f565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b610b29610c3a565b6001600160a01b0316610b3a6108e3565b6001600160a01b031614610b83576040805162461bcd60e51b815260206004820181905260248201526000805160206114f4833981519152604482015290519081900360640190fd5b6001600160a01b038116610bc85760405162461bcd60e51b815260040180806020018281038252602681526020018061140e6026913960400191505060405180910390fd5b6005546040516001600160a01b0380841692610100900416907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600580546001600160a01b0390921661010002610100600160a81b0319909216919091179055565b6000610549826111b4565b3390565b6001600160a01b038316610c835760405162461bcd60e51b815260040180806020018281038252602481526020018061155a6024913960400191505060405180910390fd5b6001600160a01b038216610cc85760405162461bcd60e51b81526004018080602001828103825260228152602001806114346022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6000610d3f836001600160a01b0384166111b8565b9392505050565b6001600160a01b038316610d8b5760405162461bcd60e51b81526004018080602001828103825260258152602001806115356025913960400191505060405180910390fd5b6001600160a01b038216610dd05760405162461bcd60e51b81526004018080602001828103825260238152602001806113c96023913960400191505060405180910390fd5b610ddb83838361127e565b610e188160405180606001604052806026815260200161147e602691396001600160a01b0386166000908152602081905260409020549190610ea1565b6001600160a01b038085166000908152602081905260408082209390935590841681522054610e479082610f38565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610f305760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610ef5578181015183820152602001610edd565b50505050905090810190601f168015610f225780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015610d3f576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6001600160a01b038216610fed576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b610ff96000838361127e565b6002546110069082610f38565b6002556001600160a01b03821660009081526020819052604090205461102c9082610f38565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6000610d3f8383611283565b6000610d3f836001600160a01b0384166112e7565b6001600160a01b0382166110e85760405162461bcd60e51b81526004018080602001828103825260218152602001806115146021913960400191505060405180910390fd5b6110f48260008361127e565b611131816040518060600160405280602281526020016113ec602291396001600160a01b0385166000908152602081905260409020549190610ea1565b6001600160a01b0383166000908152602081905260409020556002546111579082611331565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b6000610d3f836001600160a01b03841661138e565b5490565b6000818152600183016020526040812054801561127457835460001980830191908101906000908790839081106111eb57fe5b906000526020600020015490508087600001848154811061120857fe5b60009182526020808320909101929092558281526001898101909252604090209084019055865487908061123857fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610549565b6000915050610549565b505050565b815460009082106112c55760405162461bcd60e51b81526004018080602001828103825260228152602001806113a76022913960400191505060405180910390fd5b8260000182815481106112d457fe5b9060005260206000200154905092915050565b60006112f3838361138e565b61132957508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610549565b506000610549565b600082821115611388576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b6000908152600191909101602052604090205415159056fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e647345524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e63654f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737342474d546f6b656e3a205f64656c4d696e74657220697320746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636542474d546f6b656e3a205f6164644d696e74657220697320746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e63654f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657245524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122049e47f31a1e0128b6cfcd8c29c845ed4fdcf08b36984a71178c66a68578beb3164736f6c634300060c0033",
      "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106101375760003560e01c806370a08231116100b85780639dc29fac1161007c5780639dc29fac1461038c578063a457c2d7146103b8578063a9059cbb146103e4578063aa271e1a14610410578063dd62ed3e14610436578063f2fde38b1461046457610137565b806370a0823114610326578063715018a61461034c5780638da5cb5b1461035657806395d89b411461035e578063983b2d561461036657610137565b806323b872dd116100ff57806323b872dd14610241578063313ce56714610277578063395093511461029557806340c10f19146102c15780635b7121f8146102ed57610137565b80630323aac71461013c57806306fdde0314610156578063095ea7b3146101d357806318160ddd1461021357806323338b881461021b575b600080fd5b61014461048a565b60408051918252519081900360200190f35b61015e61049b565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610198578181015183820152602001610180565b50505050905090810190601f1680156101c55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101ff600480360360408110156101e957600080fd5b506001600160a01b038135169060200135610531565b604080519115158252519081900360200190f35b61014461054f565b6101ff6004803603602081101561023157600080fd5b50356001600160a01b0316610555565b6101ff6004803603606081101561025757600080fd5b506001600160a01b03813581169160208101359091169060400135610609565b61027f610690565b6040805160ff9092168252519081900360200190f35b6101ff600480360360408110156102ab57600080fd5b506001600160a01b038135169060200135610699565b6101ff600480360360408110156102d757600080fd5b506001600160a01b0381351690602001356106e7565b61030a6004803603602081101561030357600080fd5b5035610748565b604080516001600160a01b039092168252519081900360200190f35b6101446004803603602081101561033c57600080fd5b50356001600160a01b0316610816565b610354610831565b005b61030a6108e3565b61015e6108f7565b6101ff6004803603602081101561037c57600080fd5b50356001600160a01b0316610958565b6101ff600480360360408110156103a257600080fd5b506001600160a01b038135169060200135610a0c565b6101ff600480360360408110156103ce57600080fd5b506001600160a01b038135169060200135610a6d565b6101ff600480360360408110156103fa57600080fd5b506001600160a01b038135169060200135610ad5565b6101ff6004803603602081101561042657600080fd5b50356001600160a01b0316610ae9565b6101446004803603604081101561044c57600080fd5b506001600160a01b0381358116916020013516610af6565b6103546004803603602081101561047a57600080fd5b50356001600160a01b0316610b21565b60006104966006610c2f565b905090565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105275780601f106104fc57610100808354040283529160200191610527565b820191906000526020600020905b81548152906001019060200180831161050a57829003601f168201915b5050505050905090565b600061054561053e610c3a565b8484610c3e565b5060015b92915050565b60025490565b600061055f610c3a565b6001600160a01b03166105706108e3565b6001600160a01b0316146105b9576040805162461bcd60e51b815260206004820181905260248201526000805160206114f4833981519152604482015290519081900360640190fd5b6001600160a01b0382166105fe5760405162461bcd60e51b81526004018080602001828103825260288152602001806114566028913960400191505060405180910390fd5b610549600683610d2a565b6000610616848484610d46565b61068684610622610c3a565b610681856040518060600160405280602881526020016114cc602891396001600160a01b038a16600090815260016020526040812090610660610c3a565b6001600160a01b031681526020810191909152604001600020549190610ea1565b610c3e565b5060019392505050565b60055460ff1690565b60006105456106a6610c3a565b8461068185600160006106b7610c3a565b6001600160a01b03908116825260208083019390935260409182016000908120918c168152925290205490610f38565b60006106f233610ae9565b61073e576040805162461bcd60e51b815260206004820152601860248201527731b0b63632b91034b9903737ba103a34329036b4b73a32b960411b604482015290519081900360640190fd5b6105458383610f92565b6000610752610c3a565b6001600160a01b03166107636108e3565b6001600160a01b0316146107ac576040805162461bcd60e51b815260206004820181905260248201526000805160206114f4833981519152604482015290519081900360640190fd5b60016107b661048a565b0382111561080b576040805162461bcd60e51b815260206004820152601d60248201527f42474d546f6b656e3a20696e646578206f7574206f6620626f756e6473000000604482015290519081900360640190fd5b610549600683611082565b6001600160a01b031660009081526020819052604090205490565b610839610c3a565b6001600160a01b031661084a6108e3565b6001600160a01b031614610893576040805162461bcd60e51b815260206004820181905260248201526000805160206114f4833981519152604482015290519081900360640190fd5b60055460405160009161010090046001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a360058054610100600160a81b0319169055565b60055461010090046001600160a01b031690565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105275780601f106104fc57610100808354040283529160200191610527565b6000610962610c3a565b6001600160a01b03166109736108e3565b6001600160a01b0316146109bc576040805162461bcd60e51b815260206004820181905260248201526000805160206114f4833981519152604482015290519081900360640190fd5b6001600160a01b038216610a015760405162461bcd60e51b81526004018080602001828103825260288152602001806114a46028913960400191505060405180910390fd5b61054960068361108e565b6000610a1733610ae9565b610a63576040805162461bcd60e51b815260206004820152601860248201527731b0b63632b91034b9903737ba103a34329036b4b73a32b960411b604482015290519081900360640190fd5b61054583836110a3565b6000610545610a7a610c3a565b846106818560405180606001604052806025815260200161157e6025913960016000610aa4610c3a565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190610ea1565b6000610545610ae2610c3a565b8484610d46565b600061054960068361119f565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b610b29610c3a565b6001600160a01b0316610b3a6108e3565b6001600160a01b031614610b83576040805162461bcd60e51b815260206004820181905260248201526000805160206114f4833981519152604482015290519081900360640190fd5b6001600160a01b038116610bc85760405162461bcd60e51b815260040180806020018281038252602681526020018061140e6026913960400191505060405180910390fd5b6005546040516001600160a01b0380841692610100900416907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600580546001600160a01b0390921661010002610100600160a81b0319909216919091179055565b6000610549826111b4565b3390565b6001600160a01b038316610c835760405162461bcd60e51b815260040180806020018281038252602481526020018061155a6024913960400191505060405180910390fd5b6001600160a01b038216610cc85760405162461bcd60e51b81526004018080602001828103825260228152602001806114346022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6000610d3f836001600160a01b0384166111b8565b9392505050565b6001600160a01b038316610d8b5760405162461bcd60e51b81526004018080602001828103825260258152602001806115356025913960400191505060405180910390fd5b6001600160a01b038216610dd05760405162461bcd60e51b81526004018080602001828103825260238152602001806113c96023913960400191505060405180910390fd5b610ddb83838361127e565b610e188160405180606001604052806026815260200161147e602691396001600160a01b0386166000908152602081905260409020549190610ea1565b6001600160a01b038085166000908152602081905260408082209390935590841681522054610e479082610f38565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610f305760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610ef5578181015183820152602001610edd565b50505050905090810190601f168015610f225780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015610d3f576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6001600160a01b038216610fed576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b610ff96000838361127e565b6002546110069082610f38565b6002556001600160a01b03821660009081526020819052604090205461102c9082610f38565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6000610d3f8383611283565b6000610d3f836001600160a01b0384166112e7565b6001600160a01b0382166110e85760405162461bcd60e51b81526004018080602001828103825260218152602001806115146021913960400191505060405180910390fd5b6110f48260008361127e565b611131816040518060600160405280602281526020016113ec602291396001600160a01b0385166000908152602081905260409020549190610ea1565b6001600160a01b0383166000908152602081905260409020556002546111579082611331565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b6000610d3f836001600160a01b03841661138e565b5490565b6000818152600183016020526040812054801561127457835460001980830191908101906000908790839081106111eb57fe5b906000526020600020015490508087600001848154811061120857fe5b60009182526020808320909101929092558281526001898101909252604090209084019055865487908061123857fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610549565b6000915050610549565b505050565b815460009082106112c55760405162461bcd60e51b81526004018080602001828103825260228152602001806113a76022913960400191505060405180910390fd5b8260000182815481106112d457fe5b9060005260206000200154905092915050565b60006112f3838361138e565b61132957508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610549565b506000610549565b600082821115611388576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b6000908152600191909101602052604090205415159056fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e647345524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e63654f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737342474d546f6b656e3a205f64656c4d696e74657220697320746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636542474d546f6b656e3a205f6164644d696e74657220697320746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e63654f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657245524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122049e47f31a1e0128b6cfcd8c29c845ed4fdcf08b36984a71178c66a68578beb3164736f6c634300060c0033",
      "linkReferences": {},
      "deployedLinkReferences": {}
    }],
  NoneFeeLenderABI: [{
    "inputs": [{
      "internalType": "address",
      "name": "_ut",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_bgmPool",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_lendUTRatio",
      "type": "uint256"
    }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "utAmount",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "unlockAmount",
      "type": "uint256"
    }
    ],
    "name": "Repayment",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "lpToken",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "lockAmount",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "utAmount",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "pool",
      "type": "address"
    }
    ],
    "name": "UserLend",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "UT",
    "outputs": [{
      "internalType": "contract IMintableToken",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bgmPool",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bgmRouter",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lendUTRatio",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_bgmPool",
      "type": "address"
    }],
    "name": "setBGMPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_bgmRouter",
      "type": "address"
    }],
    "name": "setBGMRouter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_lendUTRatio",
      "type": "uint256"
    }],
    "name": "setLendUTRatio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_ut",
      "type": "address"
    }],
    "name": "setUTToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
    ],
    "name": "userInfos",
    "outputs": [{
      "internalType": "uint256",
      "name": "lockAmount",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "utAmount",
      "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_user",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_lpToken",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_lockAmount",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "_investpool",
      "type": "address"
    }
    ],
    "name": "userLockForLend",
    "outputs": [{
      "internalType": "uint256",
      "name": "utAmount",
      "type": "uint256"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_user",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_lpToken",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_utAmount",
      "type": "uint256"
    }
    ],
    "name": "userPayFromRouter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_lpToken",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_utAmount",
      "type": "uint256"
    }
    ],
    "name": "userRepay",
    "outputs": [{
      "internalType": "uint256",
      "name": "unlockAmount",
      "type": "uint256"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
  }],
  RefStoreABI: [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "lastReference",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "changeReference",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "distributor",
      "type": "address"
    }
    ],
    "name": "ReferenceUpdate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "_user",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "_upper",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "_distributor",
      "type": "address"
    }
    ],
    "name": "UserReference",
    "type": "event"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_addCaller",
      "type": "address"
    }],
    "name": "addCaller",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "ref",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "upper",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_distributor",
      "type": "address"
    }
    ],
    "name": "changeUpper",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "ref",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "check",
      "type": "address"
    }
    ],
    "name": "checkLoop",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_delCaller",
      "type": "address"
    }],
    "name": "delCaller",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_index",
      "type": "uint256"
    }],
    "name": "getCaller",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCallerLength",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_user",
      "type": "address"
    }],
    "name": "getUpper",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "isCaller",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "_user",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "upper",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "distributor",
      "type": "address"
    }
    ],
    "name": "setUpper",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "userDistributors",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "userInfo",
    "outputs": [{
      "internalType": "address",
      "name": "upper",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "joinTimeStamp",
      "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
  }]
};

export default config;