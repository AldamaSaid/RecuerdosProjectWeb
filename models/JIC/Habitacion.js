import Sequelize from "sequelize";
import db from "../../config/db.js";
import Hotel from "./Hotel.js";

export const Habitacion = db.define(
  "habitaciones",
  {
    id_hbt: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    piso: {
      type: Sequelize.STRING,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    refrigerador: {
      type: Sequelize.BOOLEAN,
    },
    id_htl: {
        type: Sequelize.INTEGER
    }
  },
  { timestamps: false }
);
Hotel.hasOne(Habitacion, {
  foreignKey: {
    name: "id_htl",
  },
});
Habitacion.belongsTo(Hotel, {
  foreignKey: {
    name: "id_htl",
  },
});

export default Habitacion;