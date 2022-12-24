<template>
  <div class="login">
    <el-card>
      <h2>Self-Assessment Manikin (SAM)</h2>
      <h5>A web app for performing SAM on speech samples.</h5>
      <el-divider />
      <p>Login with credentials given to you to continue.</p>
      <el-form class="login-form" label-position="right" label-width="auto" :model="model" :rules="rules" ref="form">
        <el-form-item label="Username" prop="username">
          <el-input v-model="model.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="model.password" placeholder="Password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="primary" :loading="loading" @click="login">Login</el-button>
        </el-form-item>
      </el-form>
      <el-button @click="demo">Demo mode</el-button>
    </el-card>
  </div>
</template>

<script>
import router from '../router';
import SAMDataService from '@/services/SAMDataService';
import { FirestoreDB, MockDB } from '@/services/DBService';
import store from '@/store';
import { auth } from "@/firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";

const emailSurfix = "@mockdomain.com";

export default {
  name: "login-page",
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    simulateLogin() {
      return new Promise(resolve => {
        setTimeout(resolve, 800);
      });
    },
    async login() {
      let valid = await this.$refs['form'].validate();
      if (!valid) {
        return;
      }

      this.loading = true;

      // update store
      this.$store.commit("updateUser", {
        username: this.model.username,
        password: this.model.password
      });

      // authenticate on firebase
      signInWithEmailAndPassword(auth, this.model.username + emailSurfix, this.model.password)
        .then((userCredential) => {
          this.loading = false;
          this.$store.commit("authUser", true);
          this.$store.commit("setUID", userCredential.user.uid);
          // also set demo mode for quick testing for the test user
          if (this.$store.state.testUser == this.$store.state.user.username) {
            store.commit("setDemoMode", true);
          }
          SAMDataService.registerDB(new FirestoreDB());
          router.push("/intro");
        })
        .catch(error => {
          this.loading = false;
          console.log(error.code);
          console.log(error.message);
          this.$message.error("Username or password is invalid");
        });
    },
    async demo() {
      store.commit("setDemoMode", true);
      store.commit("updateUser", {
        username: 'demo',
        password: 'demo'
      })
      SAMDataService.registerDB(new MockDB());
      router.push("/intro");
    }
  }
};
</script>

<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-button {
  width: 100%;
  margin-top: 12px;
}

.login-form {
  width: 400px;
}
</style>
