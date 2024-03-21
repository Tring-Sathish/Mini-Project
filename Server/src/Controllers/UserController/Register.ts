import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mailer from "nodemailer";
import { QueryHasura } from '../../Config/hasuraClient';
import { GET_USER_BY_EMAIL, INSERT_USER } from '../../Config/hasura-query';

dotenv.config();

export const sendVerifyEmail = async (name: string, email: string, id: string) => {
  const htmlCode =
    `
    Dear <b> ` +
    name +
    `</b> you applied for Smart Cruiter.
    For account verification this link has been sent kindly click on verify  button to verify your account. 
                   </p>
                </td>
              </tr>
              <!-- end copy -->
    
              <!-- start button -->
              <tr>
                <td align="left" bgcolor="#ffffff">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                              <a href="http://localhost:8082/verify?id=` + id + `" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify Now</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
             
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                  <p style="margin: 0;"><b>Smart Cruiter</b><br> ATS System</p>
                </td>
              </tr>
              <!-- end copy -->
    
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end copy block -->
    
        <!-- start footer -->
        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <!-- start permission -->
              <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                  <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
                </td>
              </tr>
              <!-- end permission -->
    
              <!-- start unsubscribe -->
              <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                  <p style="margin: 0;">To stop receiving these emails, you can <a href="https://www.blogdesire.com" target="_blank">unsubscribe</a> at any time.</p>
                  <p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
                </td>
              </tr>
              <!-- end unsubscribe -->
    
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end footer -->
    
      </table>
      <!-- end body -->
    
    </body>
    </html>
    `;

  try {
    const transporter = mailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS,
      },
    });

    const mailOptions = {
      from: process.env.MAILUSER,
      to: email,
      subject: "Account Activation [Smart Cruiter]",
      html: htmlCode,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  } catch (error) {
    console.log("Error -> " + error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {

    try {
    const { f_name, username, email, password } =
      req.body.input.arg1;

    if (!f_name || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const emailRegex =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Enter email @ in proper format abc@domain.com" });
    }

    if (password.length < 8 || password.length > 40) {
      return res
        .status(400)
        .json({
          message: "Password length should be between 8 and 40 characters.",
        });
    }

    const existingUser = await QueryHasura(GET_USER_BY_EMAIL, { email });

    if (existingUser.users.length > 0) {
      return res
        .status(409)
        .json({ message: "Username or email already taken." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const data = {
        f_name, username, email, password: hashedPassword
    }
    const resp = await QueryHasura(INSERT_USER,{ data })    
    const userId = resp.insert_users_one.id;
    // await sendVerifyEmail(f_name, email, userId);

    return res.status(200).json({ message: "Registered Successfully!" });
  } catch (error) {
    console.error("An error occurred:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while registering the user." });
  }
};

export default register;
