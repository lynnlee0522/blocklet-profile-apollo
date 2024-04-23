const db = require('../database');

const resolvers = {
  Query: {
    async findUser(parent, args) {
      const result = await db.findOne({ did: args.did });
      return result;
    },
  },

  Mutation: {
    async saveUser(parent, args) {
      try {
        const { user } = args;
        const targetUser = await db.findOne({ did: user.did });
        if (!targetUser) {
          await db.insert(user);
        } else {
          await db.update({ did: user.did }, user);
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

module.exports = resolvers;
