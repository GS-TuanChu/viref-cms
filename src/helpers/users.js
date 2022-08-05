export const constructUserObject = function(data) {
  if (data && data.length)
    return data.map((dataUser) => ({
      uid: dataUser.user.id,
      username: dataUser.user.get('username'),
      fullname: dataUser.user.get('fullname'),
      email: dataUser.user.get('email'),
      phone: dataUser.user.get('phone'),
      roles: dataUser.roles.sort(),
      bankAccount: dataUser.user.get('bankAccount'),
      balanceToken: dataUser.user.get('balanceToken'),
      balance: dataUser.user.get('balance'),
    }))
  else if (data !== null && typeof data === 'object' && !Array.isArray(data))
    return {
      uid: data.user.id,
      username: data.user.get('username'),
      email: data.user.get('email'),
      phone: data.user.get('phone'),
      roles: data.roles,
      bankAccount: data.user.get('bankAccount') || '0',
      balanceToken: data.user.get('balanceToken') || 0,
    }
  else {
    throw 'INVALID_USERS_DATA'
  }
}
