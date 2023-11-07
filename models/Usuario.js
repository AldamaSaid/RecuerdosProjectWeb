const Usuario = db.define('usuarios', {
    id_usr: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmar: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
    nombre_real: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: false,
    hooks: {
        beforeCreate: async function(usuario) {
            const rep = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, rep);
        },
        beforeUpdate: async function(usuario) {
            if (usuario.changed("password")) {
                const rep = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, rep);
            }
        }
    },
    scopes: {
        eliminarClave: {
            attributes: {
                exclude: ['token', 'password', 'confirmar']
            }
        }
    }
});

Usuario.prototype.verificandoClave = function(password) {
    return bcrypt.compareSync(password, this.password);
}

export default Usuario;
