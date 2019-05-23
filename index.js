const axios = require('axios');

const sesame_token = process.env.SESAME_TOKEN;
const sesame_device_id = process.env.SESAME_DEVICE_ID;
const sesame_endpoint = 'https://api.candyhouse.co/public';

const mackerel_api_key = process.env.MACKEREL_API_KEY;
const mackerel_service_name = process.env.MACKEREL_SERVICE_NAME;
const mackerel_endpoint = `https://api.mackerelio.com/api/v0/services/${mackerel_service_name}/tsdb`;

exports.handler = (event) => {
  const date = new Date() ;
  const sec = Math.floor( date.getTime() / 1000 );

  axios.get(`${sesame_endpoint}/sesame/${sesame_device_id}`, {
      headers:{ 'Authorization': sesame_token }
    })
    .then(function (response) {
      console.log(response.data);
      axios.post(mackerel_endpoint,
        [
          {
            name: 'sesame.battery',
            time: sec,
            value: response.data.battery / 100
          },
          {
            name: 'sesame.locked',
            time: sec,
            value: (response.data.locked == true) ? 1 : 0
          }
        ], {
          headers: {'X-Api-Key': mackerel_api_key}
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
};
