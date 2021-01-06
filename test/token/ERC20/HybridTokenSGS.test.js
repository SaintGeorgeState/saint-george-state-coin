const { ether } = require('@openzeppelin/test-helpers');

const { shouldBehaveLikeSaintGeorgeStateERC20 } = require('./behaviours/SaintGeorgeStateERC20.behaviour');

const TokenArtifact = artifacts.require('HybridTokenSGS');

contract('Hybrid Token SGS', function ([owner, other, thirdParty]) {
  const _name = 'Hybrid Token Saint George State';
  const _symbol = 'HTSGS';
  const _initialSupply = ether('100000'); // use ether because of 18 decimals

  context('Hybrid Token Saint George State behaviours', function () {
    beforeEach(async function () {
      this.token = await TokenArtifact.new({ from: owner });
    });

    context('like a SaintGeorgeStateERC20', function () {
      shouldBehaveLikeSaintGeorgeStateERC20(_name, _symbol, _initialSupply, [owner, other, thirdParty]);
    });
  });
});
