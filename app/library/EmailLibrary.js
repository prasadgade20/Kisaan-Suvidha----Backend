var nodemailer = require("nodemailer");
var fs = require("fs");
var base_path = require("path");
const moment = require("moment");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  send_email: function async(criteria) {
    if (criteria.to_email_address != "") {
      // to email_address
      fs.readFile('./app/template/email.html', {
        encoding: 'utf-8'
      }, async(err, html)=> {
        if (err) {
          var response = {
            status: "error",
            code: "404",
            message: err,
          };
          return response;

        } else {
          var email_subject = criteria.email_subject.replace("#SYSTEM.COMPANY_NAME#", criteria.company_name)
        
          var email_message = criteria.email_template[0].tEmailMessage.replace("#FullName#", criteria.email_user_vName)
            // .replace("#LastName#", criteria.email_user_lastName)
            .replace("#COMPANY_LOGO#", criteria.company_logo)
            .replace("#SITE_NAME#", criteria.company_name)

            .replace("#SENDER_NAME#", criteria.sender_name)
            .replace("#SENDER_NAME#", criteria.sender_name)

            .replace("#SENDER_LINK#", criteria.sender_companyUrl)
            .replace("#SENDER_LINK#", criteria.sender_companyUrl)


            .replace("#RECEIVER_NAME#", criteria.receiver_name)
            .replace("#RECEIVER_NAME#", criteria.receiver_name)

            .replace("#RECEIVER_LINK#", criteria.receiver_companyUrl)
            .replace("#RECEIVER_LINK#", criteria.receiver_companyUrl)

            .replace("#COMPANY_EMAIL#", criteria.company_email)
            .replace("#COMPANY_EMAIL#", criteria.company_email)
            .replace("#activation_link#", criteria.email_redirect_url)

            .replace("#SITE_NAME#", criteria.company_name)
            .replace("#EMAIL#", criteria.to_email_address)
            .replace("#TOKEN#", criteria.user_token)

            //contact us mail replace
            .replace("#vName#", criteria.email_user_name)

            .replace("#vFromName#", criteria.email_user_name)
            .replace("#vEmail#", criteria.email_user_email)
            // .replace("#EMAIL_SUBJECT#", criteria.email_user_subject)
            .replace("#vPhone#", criteria.email_user_phone)
            .replace("#vMessage#", criteria.email_user_message)
            
            const message = html.replace('#CONTENT#', email_message);   
            try {
              const msg = {
                to: criteria.to_email_address,
                from: {
                  email: criteria.email_from,
                  name: criteria.company_name
                },
                subject: email_subject,
                content: [{
                  type: 'text/html',
                  value: message
                }],
              };
              // const mailOptions = {
              //   from: `${criteria.company_name} ${criteria.email_from}`,
              //   title: criteria.email_title,
              //   cc: criteria.email_cc,
              //   bcc: criteria.email_Bcc,
              //   to: criteria.to_email_address,
              //   replyTo: criteria.email_reply,
              //   subject: email_subject,
              //   link: criteria.email_token,
              //   html: message,
              //   attachments: criteria.attachments
              // };
              const res = await sgMail.send(msg);
  
              console.log('--------------------------------------------------------------------')
              console.log(`<<<<< send Normal Email >>>>>`, JSON.stringify(res));
              console.log('--------------------------------------------------------------------')
              return;
            } catch (err) {
              console.log('--------------------------------------------------------------------')
              console.log(`<<<<< send Normal Email Error >>>>>`, JSON.stringify(err));
              console.log('--------------------------------------------------------------------')
              throw err;
            }
        }
      });
    } else {
      var response = {
        status: "error",
        code: "404",
        message: "User Email Not Found",
      };
      return response;
    }
  },
  sendEmailWithAttachment: function async(criteria) {
    if (criteria.to_email_address != "") {

      fs.readFile('./app/template/email.html', {encoding: 'utf-8'}, async function (err, html) {
        if (err) {
          var response = {
            status: "error",
            code: "404",
            message: err,
          };
          return response;
        } 
        else {
          const email_subject = criteria.email_subject.replace("#SYSTEM.COMPANY_NAME#", criteria.company_name).replace("#ORDER_NUMBER#", criteria.vInvoiceNumber)

          const email_message = criteria.email_template[0].tEmailMessage.replace("#USER_NAME#", criteria.email_user_name)
                                                                        .replace("#SENDER_NAME#", criteria.sender_name)
                                                                        .replace("#SENDER_NAME#", criteria.sender_name)
                                                                        .replace("#SENDER_LINK#", criteria.sender_companyUrl)
                                                                        .replace("#RECEIVER_NAME#", criteria.receiver_name)
                                                                        .replace("#RECEIVER_NAME#", criteria.receiver_name)
                                                                        .replace("#RECEIVER_LINK#", criteria.receiver_companyUrl)
                                                                        .replace("#SITE_NAME#", criteria.company_name)
                                                                        .replace("#EMAIL#", criteria.to_email_address)
                                                                        .replace("#TOKEN#", criteria.user_token)
                                                                        .replace("#COMPANY_LOGO#", criteria.company_logo)
                                                                        .replace("#COMPANY_LOGO#", criteria.company_logo)
                                                                        .replace("#COMPANY_EMAIL#", criteria.company_email)
                                                                        .replace("#COMPANY_EMAIL#", criteria.company_email)
                                                                        .replace("#activation_link#", criteria.email_redirect_url)
                                                                        .replace("#ORDER_NUMBER#", criteria.vInvoiceNumber) //order related fields
                                                                        .replace("#dtPaymentDate#", moment().format("MM/DD/YYYY"))
                                                                        .replace("#SUBTOTAL#", criteria.SubTotal)
                                                                        .replace("#SHIPING#", criteria.ShippingCharge)
                                                                        .replace("#TAX#", criteria.Tax)
                                                                        .replace("#TOTAL#", criteria.Total)
                                                                        .replace("#DISCOUNT#", criteria["vDiscountAmount"])
                                                                        .replace("#CSSSTYLE#", criteria.cssStyle)


          const message = html.replace('#CONTENT#', email_message);
          try {
            if (!fs.existsSync(criteria.folderPath)) {
              await fs.mkdirSync(criteria.folderPath, {
                recursive: true,
              });
            }

            const msg = {
              to: criteria.to_email_address,
              from: criteria.email_from,
              subject: email_subject,
              // text: message,
              attachments: [{
                content: await fs.readFileSync(criteria.attachmentsPath).toString("base64"),
                filename: criteria.attachments,
                type: "application/pdf",
                disposition: "attachment"
              }]
            };
            msg.content = [{
              type: 'text/html',
              value: message
            }]
            const res = await sgMail.send(msg)
            console.log(`<<<<< send Email with Attachment >>>>>`, JSON.stringify(res));
          } catch (err) {
            console.log(`<<<<< send Email with Attachment ERR >>>>>`, JSON.stringify(err));
            throw err;
          }
        }
      });
    } else {
      var response = {
        status: "error",
        code: "404",
        message: "Sender Email Not Found",
      };
      return response;
    }
  },
}