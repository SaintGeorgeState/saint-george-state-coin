const { ether } = require('@openzeppelin/test-helpers');

const { shouldBehaveLikeSaintGeorgeStateERC20 } = require('./behaviours/SaintGeorgeStateERC20.behaviour');

const TokenArtifact = artifacts.require('SGSCoin');

contract('SGS Coin', function ([owner, other, thirdParty]) {
  const _name = 'Saint George State Coin';
  const _symbol = 'Rupper';
  const _initialSupply = ether('139016'); // use ether because of 18 decimals

  context('Saint George State Coin behaviours', function () {
    beforeEach(async function () {
      this.token = await TokenArtifact.new({ from: owner });
    });

    context('like a SaintGeorgeStateERC20', function () {
      shouldBehaveLikeSaintGeorgeStateERC20(_name, _symbol, _initialSupply, [owner, other, thirdParty]);
    });
  });
});
