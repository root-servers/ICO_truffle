var Wallet = artifacts.require('./Wallet.sol');
var CrowdsaleToken = artifacts.require('./CrowdsaleToken.sol');
var Crowdsale = artifacts.require('./Crowdsale.sol');
var FlatPricing = artifacts.require('./FlatPricing.sol');
var SafeMathLib = artifacts.require('./SafeMathLib.sol');
var StandardToken = artifacts.require('./StandardToken.sol');


var MintedTokenCappedCrowdsale = artifacts.require('./MintedTokenCappedCrowdsale.sol');

module.exports = function(deployer, network, accounts) {
  deployer.deploy(SafeMathLib);
  deployer.link(SafeMathLib, CrowdsaleToken);
  deployer.link(SafeMathLib, FlatPricing);
  deployer.deploy(Wallet, [accounts[0], accounts[1]], 2, 0);
  deployer.deploy(CrowdsaleToken, 'Example', 'EXA', 100000, 18, true );
  deployer.deploy(FlatPricing, 1).then(()=> {
    FlatPricing.deployed().then((i) => {
      deployer.deploy(Crowdsale, CrowdsaleToken.address, i.address, Wallet.address, Date.now(), Date.now() + 300000, 0);
    })
  })
};


    // crowdsale:
    //         contract_name: MintedTokenCappedCrowdsale
    //         contract_file: MintedTokenCappedCrowdsale.sol
    //         arguments:
    //             _token: "{{contracts.token.address}}"
    //             _pricingStrategy: "{{contracts.pricing_strategy.address}}"
    //             _multisigWallet: "{{contracts.team_multisig.address}}"
    //             _start: "{{ timestamp(datetime(2017, 4, 15, 16, 0)) }}"
    //             _end: "{{ timestamp(datetime(2017, 4, 15, 16, 0)) + 30*24*3600 }}"
    //             _minimumFundingGoal: 7500
    //             _maximumSellableTokens: 4000000