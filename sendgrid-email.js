/*
 * https://github.com/sendgrid/sendgrid-nodejs
 * https://github.com/sendgrid/sendgrid-nodejs-example
 * Create templates here: https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html
 */

var dotenv = require('dotenv');
dotenv.load();

var params = {
  smtpapi:  '', // new sendgrid.smtpapi()
  to:       '', // user's email
  toname:   [],
  from:     '', // submitter's email
  fromname: '',
  subject:  "You've got a message from your contact form",
  text:     '%submitterEmail% has sent you this message via the contact form:<br><br>%message%<br>%advertisement%',
  html:     '%submitterEmail% has sent you this message via the contact form:<br><br>%message%<br>%advertisement%',
  bcc:      [],
  cc:       [],
  replyto:  '',
  date:     '',
  files:    [],
  file_data:{},
  headers:  ''
};


function send(data) {
  var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);

  params['to'] = data['userEmail'];
  params['from'] = data['submitterEmail'];
  params['replyto'] = data['submitterEmail'];

  var advertisement = '<br>---<br>This email is supported by<br><a href="http://mauwi.me">mauwi.me</a>';

  // Build the smtpapi header
  var header = new sendgrid.smtpapi();
  header.addSubstitution('%submitterEmail%', [data['submitterEmail']]);
  header.addSubstitution('%message%', [data['message']]);
  header.addSubstitution('%advertisement%', [advertisement]);
  var headers = {'X-Sent-Using': 'SendGrid-API',
                 'X-Transport': 'web',
                 'x-smtpapi': header.jsonString()
               };

  params['headers'] = headers;

  var email = new sendgrid.Email(params);

  sendgrid.send(email, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });

};

exports.send = send;
