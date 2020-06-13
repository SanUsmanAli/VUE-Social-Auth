<script lang="ts">

  import {Component, Vue} from 'vue-property-decorator';
  import ActivateModal from '../ActivateModal/ActivateModal.vue';
  import FileUploadService from '@/services/fileUpload.service';
  import {UploadInfo} from '@/models/server/respones/GetUploadsInfoRespone';
  import {LocalStorageType} from '@/enums/LocalStorageType';
  import Router from 'vue-router';
  import VueAuthenticate from 'vue-authenticate';
  import axios from 'axios';
  import VueAxios from 'vue-axios';

  Vue.use(VueAxios, axios);
  Vue.use(Router);
  Vue.use(VueAuthenticate, {
    tokenName: 'access_token',
    baseUrl: 'http://localhost:8081',
    storageType: 'cookieStorage',
    providers: {
      linkedin: {
        clientId: '77ndlt7z8ewxxr',
        redirectUri: 'http://localhost:8081/auth/callback',
      },
    },
  });


  @Component({
    components: {
      ActivateModal,
      VueAuthenticate,
    },
  })
  export default class ActivateDestinations extends Vue {

    private isAuthenticated = false;
    private accessToken = null;
    private response = '';

    private destinations = [
      '180bytwo',
      'the-trade-desk',
      'linked-in',
      'lotame',
      'oracle',
      'facebook',
    ];

    private auth(provider: string) {
      // console.log(provider);

      if (this.$auth.isAuthenticated()) {
        this.$auth.logout();
      }

      this.response = '';
      const resp = this;

      resp.$auth.authenticate(provider).then(function ath(authResponse: object) {
        resp.isAuthenticated = resp.$auth.isAuthenticated();

        if (provider === 'linkedin') {
          resp.response = authResponse;
        } else if (provider === 'live') {
          resp.response = authResponse;
        }
      }).catch(function error(err: string) {
        resp.isAuthenticated = resp.$auth.isAuthenticated();
        resp.response = err;
      });
    }

  }
</script>
