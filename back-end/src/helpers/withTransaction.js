//this function is used when we have multiple operations that make changes on database . so we want to have them all .
//if one of the operations had error , the database will be rolled back to the first stage .

const mongoose = require("mongoose");

const withTransaction = async (operation) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await operation(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

module.exports = withTransaction;
