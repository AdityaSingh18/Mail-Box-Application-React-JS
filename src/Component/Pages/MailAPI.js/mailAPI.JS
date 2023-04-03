export const composeMail = async (mailObj, formattedEmail) => {
    const url =
    `${REACT_APP_FireBaseDataBase}/` +
      formattedEmail +
      "/sentMail.json";
  
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(mailObj),
    });
  
    const data = await response.json();
  
    return { response, data };
  };
  
  export const inboxMail = async (mailObj, formattedEmail) => {
    const url =
      `${REACT_APP_FireBaseDataBase}/` +
      formattedEmail +
      "/inboxMail.json";
  
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(mailObj),
    });
  
    const data = await response.json();
  
    return { response, data };
  };
  
  export const getInboxMail = async (formattedEmail) => {
    const url =
    `${REACT_APP_FireBaseDataBase}/` +
      formattedEmail +
      "/inboxMail.json";
  
    const response = await fetch(url);
    const data = await response.json();
  
    return { data, response };
  };