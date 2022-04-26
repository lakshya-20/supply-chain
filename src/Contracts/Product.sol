// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Product {

  struct Transaction{
    uint256 txId;
    address from;
    address to;
    uint date;
  }

  struct Review{
    uint256 id;
    uint date;
    uint256 rating;
    string comment;
    address reviewer;
  }

  struct RawProduct{
    string name;
    bool isVerified;
  }

  struct Item{
    uint256 id;
    string title;
    address manufacturer;
    address currentOwner;
    address lastOwner;
    uint256 rating;
  }

  mapping(uint256 => Item) public _items;
  mapping(uint256 => Review) _reviews;
  mapping(uint256 => Transaction) _transactions;
  mapping(uint256 => mapping(string => bool)) _rawMaterials;

  mapping(uint256 => uint256[]) _itemTransactions;
  mapping(uint256 => uint256[]) _itemReviews;

  uint256 _nextTransactionId;
  uint256 _nextReviewId;

  constructor() {
    _nextTransactionId = 0;
    _nextReviewId = 0;
  }

  function add(uint256 _id, string memory _title) public returns (bool){
    address _manufacturer = msg.sender;
    require (_manufacturer != address(0), "Product::add: Manufacturer cannot be null");
    _items[_id] = Item({
      id: _id,
      title: _title,
      manufacturer: _manufacturer,
      currentOwner: _manufacturer,
      lastOwner: address(0),
      rating: 0
    });
    return true;
  }

  function get(uint256 _id) public view returns (
    Item memory item, 
    Transaction[] memory transactions, 
    Review[] memory reviews
  ){
    item = _items[_id];
    transactions = new Transaction[](_itemTransactions[_id].length);
    for (uint256 i = 0; i < _itemTransactions[_id].length; i++){
      transactions[i] = _transactions[_itemTransactions[_id][i]];
    }
    reviews = new Review[](_itemReviews[_id].length);
    for (uint256 i = 0; i < _itemReviews[_id].length; i++){
      reviews[i] = _reviews[_itemReviews[_id][i]];
    }
  }

  function transfer(address _to, uint256 _id) public returns (bool){
    require (_items[_id].currentOwner != address(0), "Product::transfer: Product does not exist");
    require (_items[_id].currentOwner != _to, "Product::transfer: Cannot transfer to self");
    require (_to != address(0), "Product::transfer: Cannot transfer to null address");
    
    _items[_id].lastOwner = _items[_id].currentOwner;
    _items[_id].currentOwner = _to;
    
    _transactions[_nextTransactionId] = Transaction({ 
      txId: _nextTransactionId,
      from: _items[_id].currentOwner,
      to: _items[_id].lastOwner,
      date: block.timestamp
    });
    _itemTransactions[_id].push(_nextTransactionId);
    _nextTransactionId++;
    return true;
  }

  function addReview(uint256 _id, uint256 _rating, string memory _comment) public returns (bool){
    require (_items[_id].currentOwner == msg.sender, "Product::addReview: Only current owner can add review");
    _reviews[_nextReviewId] = Review({
      id: _nextReviewId,
      date: block.timestamp,
      rating: _rating,
      comment: _comment,
      reviewer: msg.sender
    });
    _items[_id].rating = (_items[_id].rating * _itemReviews[_id].length + _rating) / (_itemReviews[_id].length + 1);
    _itemReviews[_id].push(_nextReviewId);
    _nextReviewId++;
    return true;
  }

}