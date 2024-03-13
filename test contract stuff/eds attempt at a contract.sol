// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

/*
*

BBBBBB      LLL         OOOOOO           KKK
BBBBBBB     LLL        OOOOOOOO         KKK
BB   BB     LLL        OOO  OOO        KKK
BB   BB     LLL        OOO  OOO       KKK
BBBBBB      LLL        OOO  OOO      KKK
BBBBBBB     LLL        OOO  OOO     KKK
BB   BBB    LLL        OOO  OOO      KKK
BB    BB    LLL        OOO  OOO       KKK
BB   BBB    LLL        OOO  OOO        KKK
BBBBBBB      LLLLLLLL  OOOOOOOO         KKK
BBBBBB        LLLLLLL   OOOOOO           KKK

*
* Its a Blok Chain......get it XD
*/
/// @author EdtheDrunk
/// Material mainly stolen from @CupCo and @Burnt Punx
/// This contract is used to mint BLOK NFTs

import { OnChainMetadata } from "./OnChainMetadata.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {
    LSP8IdentifiableDigitalAsset
    } from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";
interface ICupCoAllowList {
    function isListed(address _address) external returns (bool);
}
contract BLOK is LSP8IdentifiableDigitalAsset, OnChainMetadata, ReentrancyGuard {

     uint256 public constant MAX_SUPPLY = 42000;
    uint256 public constant TEAM_RESERVE = 420;
    uint256 public constant MAX_MINTABLE = 4200;
    uint256 public constant PRICE = 0.1 ether;
    uint256 public constant CHILLPRICE = 1000 ether;

    /// errors
    error BLOKMintingLimitExceeded(uint256 _amount);
    error BLOKMintingPriceNotMet(uint256 _amount);
    error Unauthorized();