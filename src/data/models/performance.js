export default (dbService, sequelize) => {
  const Performance = dbService.define('Performance', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: sequelize.INTEGER,
    },
    date: {
      type: sequelize.DATEONLY,
    },
    totalComm: {
      type: sequelize.DECIMAL(10, 2),
    },
    netSaleCount: {
      type: sequelize.INTEGER,
    },
    netLeadCount: {
      type: sequelize.INTEGER,
    },
    clickCount: {
      type: sequelize.INTEGER,
    },
    EPC: {
      type: sequelize.DECIMAL(10, 2),
    },
    impCount: {
      type: sequelize.INTEGER,
    },
    CR: {
      type: sequelize.DECIMAL(10, 2),
    },
    bonusCount: {
      type: sequelize.INTEGER,
    },
    commClickCount: {
      type: sequelize.INTEGER,
    },
    apprComm: {
      type: sequelize.DECIMAL(10, 2),
    },
    bonusComm: {
      type: sequelize.DECIMAL(10, 2),
    },
    dispComm: {
      type: sequelize.DECIMAL(10, 2),
    },
    grossComm: {
      type: sequelize.DECIMAL(10, 2),
    },
    netComm: {
      type: sequelize.DECIMAL(10, 2),
    },
    pendComm: {
      type: sequelize.DECIMAL(10, 2),
    },
    apprLeadCount: {
      type: sequelize.INTEGER,
    },
    dispLeadCount: {
      type: sequelize.INTEGER,
    },
    grossLeadCount: {
      type: sequelize.INTEGER,
    },
    pendLeadCount: {
      type: sequelize.INTEGER,
    },
    apprSaleAmount: {
      type: sequelize.DECIMAL(10, 2),
    },
    dispSaleAmount: {
      type: sequelize.DECIMAL(10, 2),
    },
    grossSaleAmount: {
      type: sequelize.DECIMAL(10, 2),
    },
    netSaleAmount: {
      type: sequelize.DECIMAL(10, 2),
    },
    pendSaleAmount: {
      type: sequelize.DECIMAL(10, 2),
    },
    apprSaleCount: {
      type: sequelize.INTEGER,
    },
    dispSaleCount: {
      type: sequelize.INTEGER,
    },
    grossSaleCount: {
      type: sequelize.INTEGER,
    },
    pendSaleCount: {
      type: sequelize.INTEGER,
    },
  });

  return Performance;
};
