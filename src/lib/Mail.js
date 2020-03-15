import nodemailer from "nodemailer";
import mailconfig from "../config/mail";

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailconfig;

    this.trasposrter = nodemailer.createTransport({
      host, port, secure, auth: auth.user ? auth : null
    });
  }

  sendMail(message) {
    return this.trasposrter.sendMail({
      ...mailconfig.default,
      ...message
    });
  }
}

export default new Mail();
