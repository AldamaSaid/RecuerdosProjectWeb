const Imagen = db.define("imagenes", {
  id_imagen: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ruta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Asociación con Usuario y DirectorioImagen
Imagen.belongsTo(Usuario, { foreignKey: "id_usr" });
Imagen.belongsTo(DirectorioImagen, { foreignKey: "id_directorio" });

export default Imagen;
