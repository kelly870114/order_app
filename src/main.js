import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPlugin } from 'vuestic-ui' 
import 'vuestic-ui/dist/vuestic-ui.css' 
import Toaster from '@meforma/vue-toaster';

// Global event bus
import mitt from 'mitt';
const emitter = mitt();

// Phone number handling
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'

// Amplify imports
import Amplify from 'aws-amplify'
//import aws_exports from './aws-exports';

//import {
  //applyPolyfills,
//  defineCustomElements,
//} from '@aws-amplify/ui-components/loader';


Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
    // identityPoolId: 'us-west-2:5b74593f-3626-47aa-a04e-6761adb4c772',
    region: 'us-east-1',
    identityPoolRegion: 'us-east-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_mcyPeT1XC',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: 'iqt63tmrgju250k28vio0h4hu',
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'CUSTOM_AUTH',
  }
})

// // You can get the current config object
// Auth.configure()
// //Amplify.configure(aws_exports);
// applyPolyfills().then(() => {
//   defineCustomElements(window)
// })

const app = createApp(App)
app.use(VuesticPlugin,{
  components: {
    VaChip: {
      outline: true,
      rounded: false,
      size: 'large',
      color: '#000'
    },
    VaCard:{
      stripe: false,
      stripeColor:"black",
      square: false
    },
    VaButton:{
      color:"#08c18a"
    },
    VaButtoGroup:{
      color:"#08c18a"
    },
    VaProgressCircle:{
      color:'#08c18a'
    },
    VaButtonDropdown:{
      color:'#08c18a'
    }
    
  },
}).use(VueTelInput).use(Toaster)

/* ===================================================
                      CONFIGURATION
    You must add your own values here! See the tutorial
    in the GitHub repo for more information. @jbesw
   =================================================== */


// ** Websocket connection **
//  PoolId: Retrieve this with the CLI command: aws cognito-identity list-identity-pools --max-results 10 --region <<REGION>>
app.config.globalProperties.$poolId = 'us-east-1:ebefccd5-8d96-42a7-a6a8-42d1813f6645' // 'YourCognitoIdentityPoolId'
//  IoTendpoint: Retrieve this with the CLI command: aws iot describe-endpoint --endpoint-type iot:Data-ATS --region us-east-1
app.config.globalProperties.$host = 'aaq341m90kftn-ats.iot.us-east-1.amazonaws.com' // 'YourAwsIoTEndpoint', e.g. 'prefix.iot.us-east-1.amazonaws.com'
app.config.globalProperties.$region = 'us-east-1'      

//APIGW OrderManager Service**
app.config.globalProperties.$orderManagerEndpoint='https://7ot6ibmci9.execute-api.us-east-1.amazonaws.com/Prod/'

// **APIGW  Validator Service **
app.config.globalProperties.$APIGWEndpointValidatorService = 'https://v5n46djb6l.execute-api.us-east-1.amazonaws.com/Prod/'

// **APIGW config Service **
app.config.globalProperties.$APIGWEndpointConfigService = 'https://i5ve8974kh.execute-api.us-east-1.amazonaws.com/Prod/'

// ** readonly config store endpoint **
app.config.globalProperties.$ConfigEndpoint = 'https://d2q1lahfnah8ba.cloudfront.net'

// ** readonly config store endpoint **
// app.config.globalProperties.$journeyServiceURL = 'https://d2q1lahfnah8ba.cloudfront.net' 


app.config.globalProperties.emitter = emitter
app.config.globalProperties.$adminApp = false
app.mount('#app')

