const Sequelize = require('sequelize');
const sequelize = new Sequelize('spp_dev2', 'root', 'P@ssw0rdcaonima438sb250', {
  dialect: 'mysql',
  host: 'rm-m5ec16sm22j7393s3ro.mysql.rds.aliyuncs.com',
});

const Captcha = module.exports =  sequelize.define('training', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: Sequelize.STRING(4),
    allowNull: false
  },
  captcha: {
    type: Sequelize.BLOB,
    allowNull: false,
    get() {
      if (this.getDataValue('captcha') !== undefined) {
        return this.getDataValue('captcha').toString('base64');
      }
    }
  }
}, {
  timestamps: false,
  freezeTableName: true,
});