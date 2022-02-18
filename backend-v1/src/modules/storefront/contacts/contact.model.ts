import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

const Contactschema = (sequelize: Sequelize) => {
  const Contacts = sequelize.define("contact", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Contacts;
};
export default Contactschema;
