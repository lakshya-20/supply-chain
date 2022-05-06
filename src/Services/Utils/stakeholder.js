export const fetchFarmer = async (curr_address, farmerContract, id) => {
  const response = await farmerContract.methods.getFarmer(id).call({from: curr_address});
  return {
    ...response.farmer,
    formattedAddress: id.substring(0, 6) + "..." + id.substring(id.length - 4, id.length),
    rawProducts: response.rawProducts
  }
}

export const fetchManufacturer = async (curr_address, manufacturerContract, id) => {
  const response = await manufacturerContract.methods.getManufacturer(id).call({from: curr_address});
  return {
    ...response.manufacturer,
    isRenewableUsed: response.isRenewableUsed,
    formattedAddress: id.substring(0, 6) + "..." + id.substring(id.length - 4, id.length),
    rawProducts: response.rawProducts,
    launchedProductIds: response.launchedProductIds
  }
}

export const fetchStakeholder = async (curr_address, stakeholderContract, id) => {
  const response = await stakeholderContract.methods.get(id).call({from: curr_address});
  return {
    ...response,
    formattedAddress: id.substring(0, 6) + "..." + id.substring(id.length - 4, id.length),
  }
}

export const formattedAddress = (address) => {
  return address.substring(0,6) + "..." + address.substring(address.length - 4);
}