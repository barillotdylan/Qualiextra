const tempDomains = ['mailinator.com', 'temp-mail.org'];

function isTemporaryEmail(email) {
  const domain = email.split('@')[1];
  return tempDomains.includes(domain);
}

export default isTemporaryEmail;