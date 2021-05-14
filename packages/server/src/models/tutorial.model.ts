export default (sequelize: any, Sequelize: any): any => {
  return sequelize.define('tutorial', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });
};
