module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "docker",
  database: "barbershop",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
