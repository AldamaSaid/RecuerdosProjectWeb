const DirectorioImagen = db.define("directorios", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  directorio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Asociación con Usuario
DirectorioImagen.belongsTo(Usuario, { foreignKey: "id_usr" });

export default DirectorioImagen;
