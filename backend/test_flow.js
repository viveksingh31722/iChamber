const http = require('http');

const loginData = JSON.stringify({
  email: 'viveksingh31722@gmail.com',
  password: 'securepassword123'
});

const loginOptions = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': loginData.length
  }
};

const loginReq = http.request(loginOptions, (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => {
    console.log('Login Status:', res.statusCode);
    console.log('Login Body:', body);

    // Get cookies
    const cookies = res.headers['set-cookie'];
    if (cookies) {
      console.log('Cookies received:', cookies);
      // Now try to submit investor form
      submitInvestorForm(cookies);
    }
  });
});

loginReq.on('error', (e) => console.error(e));
loginReq.write(loginData);
loginReq.end();

function submitInvestorForm(cookies) {
  const investorData = JSON.stringify({
    name: 'Vivek Singh',
    email: 'viveksingh31722@gmail.com',
    phone: '1234567890',
    businessName: 'Singh Tech',
    businessTitle: 'CEO',
    occupation: 'Investor',
    state: 'UP',
    country: 'India',
    newsletterOptIn: true
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/investors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': investorData.length,
      'Cookie': cookies.join('; ')
    }
  };

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (d) => body += d);
    res.on('end', () => {
      console.log('Investor Submit Status:', res.statusCode);
      console.log('Investor Submit Body:', body);

      // Finally, check if user can see their applications
      getInvestorApplications(cookies);
    });
  });

  req.on('error', (e) => console.error(e));
  req.write(investorData);
  req.end();
}

function getInvestorApplications(cookies) {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/investors',
    method: 'GET',
    headers: {
      'Cookie': cookies.join('; ')
    }
  };

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (d) => body += d);
    res.on('end', () => {
      console.log('Investor List Status:', res.statusCode);
      console.log('Investor List Body:', body);
    });
  });

  req.on('error', (e) => console.error(e));
  req.end();
}
