export const fetchProduct = async (curr_address, productContract, id) => {
  const response = await productContract.methods.get(id).call({from: curr_address});
  const product = {
    "item": response.item,productContract,
    "rawProducts": response.rawProducts,
    "reviews": response.reviews,
    "transactions": response.transactions
  }
  return product;
}