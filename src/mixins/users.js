export default {
  methods: {
    constructUserObject(data) {
      return data.map((dataUser) => {
        return {
          id: dataUser.user.id,
          username: dataUser.user.get('username'),
          fullname: dataUser.user.get('fullname'),
          email: dataUser.user.get('email'),
          phone: dataUser.user.get('phone'),
          roles: dataUser.roles.sort(),
          bankAccount: dataUser.user.get('bankAccount'),
          balanceToken: dataUser.user.get('balanceToken'),
          balance: dataUser.user.get('balance'),
        }
      })
    },
  },
}
