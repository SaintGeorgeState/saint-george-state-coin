const { BN, expectRevert } = require('@openzeppelin/test-helpers');

const { shouldBehaveLikeTokenRecover } = require('eth-token-recover/test/TokenRecover.behaviour');
const { shouldBehaveLikeERC1363 } = require('erc-payable-token/test/token/ERC1363/ERC1363.behaviour');

const { shouldBehaveLikeRoles } = require('../../../access/behaviours/Roles.behaviour');
const { shouldBehaveLikeERC20 } = require('./ERC20.behaviour');
const { shouldBehaveLikeERC20Burnable } = require('./ERC20Burnable.behaviour');
const { shouldBehaveLikeERC20Mintable } = require('./ERC20Mintable.behaviour');

function shouldBehaveLikeSaintGeorgeStateERC20 (name, symbol, initialSupply, [owner, other, thirdParty]) {
  const _decimals = new BN(18);

  describe('once deployed', function () {
    it('total supply should be equal to zero', async function () {
      (await this.token.totalSupply()).should.be.bignumber.equal(new BN(0));
    });

    it('owner balance should be equal to zero', async function () {
      (await this.token.balanceOf(owner)).should.be.bignumber.equal(new BN(0));
    });
  });

  context('SaintGeorgeStateERC20 behaviours', function () {
    beforeEach(async function () {
      await this.token.mint(owner, initialSupply, { from: owner });
    });

    context('like a ERC20', function () {
      shouldBehaveLikeERC20(name, symbol, _decimals, initialSupply, [owner, other, thirdParty]);
    });

    context('like a ERC20Mintable', function () {
      shouldBehaveLikeERC20Mintable(initialSupply, [owner, thirdParty]);
    });

    context('like a ERC20Burnable', function () {
      shouldBehaveLikeERC20Burnable(initialSupply, [owner, thirdParty]);
    });

    context('like a ERC1363', function () {
      shouldBehaveLikeERC1363([owner, other, thirdParty], initialSupply);
    });

    context('like a SaintGeorgeStateERC20', function () {
      describe('when the sender doesn\'t have minting permission', function () {
        const from = thirdParty;

        it('cannot mint', async function () {
          const amount = new BN(50);

          await expectRevert(
            this.token.mint(thirdParty, amount, { from }),
            'Roles: caller does not have the MINTER role',
          );
        });

        it('cannot finish minting', async function () {
          await expectRevert(
            this.token.finishMinting({ from }),
            'Ownable: caller is not the owner',
          );
        });
      });
    });

    context('like a Roles', function () {
      beforeEach(async function () {
        this.contract = this.token;
      });

      shouldBehaveLikeRoles([owner, other, thirdParty]);
    });

    context('like a TokenRecover', function () {
      beforeEach(async function () {
        this.instance = this.token;
      });

      shouldBehaveLikeTokenRecover([owner, thirdParty]);
    });
  });
}

module.exports = {
  shouldBehaveLikeSaintGeorgeStateERC20,
};
