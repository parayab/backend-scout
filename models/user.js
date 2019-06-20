const bcrypt = require("bcrypt");

const PASSWORD_SALT = 8;

async function buildPasswordHash(instance) {
  if (instance.changed("password")) {
    const hash = await bcrypt.hash(instance.password, PASSWORD_SALT);
    instance.set("password", hash);
  }
}

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      surname1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Surname can't be empty"
          }
        }
      },
      surname2: DataTypes.STRING,
      name1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name can't be empty"
          }
        }
      },
      name2: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name can't be empty"
          }
        },
        unique: "uniqueEmail"
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Date of birth can't be empty"
          }
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address can't be empty"
          }
        }
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Role can't be empty"
          }
        }
      },
      sectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Section can't be empty"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password can't be empty"
          }
        }
      }
    },
    {}
  );

  user.beforeUpdate(buildPasswordHash);
  user.beforeCreate(buildPasswordHash);

  user.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  // eslint-disable-next-line func-names
  user.associate = function(models) {
    // associations can be defined here
    user.belongsTo(models.section, {
      foreignKey: "sectionId"
    });
    user.belongsTo(models.role, {
      foreignKey: "roleId"
    });
    user.hasMany(models.userJoinGroupEvent, {
      // Will add userId to userJoinGroupEvent model
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "participant"
      // enables user.getParticipants()
    });
  };
  return user;
};
