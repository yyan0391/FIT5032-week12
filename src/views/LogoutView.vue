<template>
    <div>
      <h1>Log Out</h1>
    </div>
  </template>
  
  <script setup>
  import { getAuth, signOut } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const auth = getAuth();
  
  signOut(auth)
    .then(() => {
      console.log("Log out successfully.");
      router.push("/Firelogin");
    })
    .catch((error) => {
      console.error("Error logging out:", error);
    });
  </script>
  