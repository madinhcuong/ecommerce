import { sequelize } from "../config";

import Contactschema from "../modules/storefront/contacts/contact.model";

interface DB {
  Contact: any;
}

const Contact = Contactschema(sequelize);

const models: DB = {
  Contact,
};

// sequelize.sync();
// sequelize.sync({ force: true })
// sequelize.sync({ alter: true })

console.log("models", models);

export default models;
