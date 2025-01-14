import bodyParser from 'body-parser';
import { get } from 'lodash';
import organizationsService from '../services/organizations';
import { stripePublishableAPIKey, stripePlanId } from '../utils/stripe';

const getResponse = async (orgId) => {
  const employeeQuantity = await organizationsService.getMembersQuantity(
    orgId
  );
  const subscriptionPlanId = stripePlanId;
  const existingSubscriptionId = await organizationsService.getSubscriptionId(
    orgId
  );
  const response = `
  <html>
  <head>
  <script src="https://js.stripe.com/v3"></script>
  </head>
  <body style="background-color:rgb(0, 77, 64); align-content:center; padding:30vh;">

  ${(!existingSubscriptionId &&
      `<h2 style="margin-bottom:24px; color:#ffffff; font-family:Lato, Arial Black, Sans Serif; text-align: center">Huzzah! 🎉 You're almost there.</h2>
    <div style="text-align: center;color:#ffffff; font-family:Lato, Arial Black, Sans Serif; display:flex; flex-direction:column; line-height:1.45;">
    Standard Plan is $XX.XX (USD)/active employee/month.<br/> Active employee count is the total number of active employees in the organization.
    <button
    style="background-color:rgb(253, 216, 53); color:#000000; margin: 48px auto; padding:12px 18px; border:0; border-radius:3px; font-size:1em; font-family:Lato, Arial Black, Sans Serif;"
    id="checkout-button-${subscriptionPlanId}"
    role="link"
  >
    Complete Checkout
  </button>
  </div>
  <script>
  var stripe = Stripe('${stripePublishableAPIKey}');

  var checkoutButton = document.getElementById('checkout-button-${subscriptionPlanId}');
  checkoutButton.addEventListener('click', function () {
    stripe.redirectToCheckout({
      items: [{ plan: '${subscriptionPlanId}', quantity: ${employeeQuantity} }],

      successUrl: window.location.protocol + '//' + window.location.host + '/checkout/success',
      cancelUrl: window.location.protocol + '//' + window.location.host + '/checkout/cancel',
      clientReferenceId: '${orgId}'
    })
    .then(function (result) {
      if (result.error) {
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });
  });
</script>`) ||
    `<h2 style="margin-bottom:24px; color:#ffffff; font-family:Lato, Arial Black, Sans Serif; text-align: center">Your organization is already subscribed to the Standard Plan.</h2>`}
</body>
</html>`;
  return response;
};

export default (app) => {
  app.get('/checkout', async (req, res) => {
    try {
      const { orgId } = req.query;
      const response = await getResponse(orgId);
      res.send(response);
    } catch (error) {
      console.log(error.stack);
    }
  });

  app.get('/checkout/success', (req, res) => {
    try {
      res.send('success');
    } catch (error) {
      console.log(error.stack);
    }
  });

  app.get('/checkout/cancel', (req, res) => {
    try {
      res.send('cancel');
    } catch (error) {
      console.log(error.stack);
    }
  });

  app.post(
    '/checkout/webhook',
    bodyParser.raw({ type: 'application/json' }),
    async (req, res) => {
      try {
        const payload = JSON.parse(req.body);
        const orgId = get(
          payload,
          'data.object.client_reference_id',
          undefined
        );
        const subscriptionId = get(
          payload,
          'data.object.subscription',
          undefined
        );
        await organizationsService.updateStripeSubscription(
          orgId,
          subscriptionId
        );
        res.send('processed');
      } catch (error) {
        console.log(error.stack);
      }
    }
  );
};