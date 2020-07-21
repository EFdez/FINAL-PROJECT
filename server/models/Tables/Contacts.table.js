const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "User", //user type student o parent
    },
    teacher: {
      type: mongoose.ObjectId,
      ref: "User", //user type teacher o director
    },
  },
  {
    timestamps: true,
  }
);

/*Id
Nombre
Dirección
Teléfono
Foto
Email
Contraseña
 */

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
